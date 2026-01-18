from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
TRAINER_EMAIL = os.environ.get('TRAINER_EMAIL', '')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    service: str
    message: Optional[str] = ""

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

SERVICE_LABELS = {
    "weight-loss": "Weight Loss",
    "strength-training": "Strength Training / Weight Gain",
    "flexibility-rehab": "Flexibility & Rehabilitation",
    "nutrition-coaching": "Nutrition Coaching"
}

# Routes
@api_router.get("/")
async def root():
    return {"message": "Prem Rishi Fitness API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact")
async def submit_contact_form(form: ContactForm):
    """Handle contact form submission and send email notification"""
    try:
        # Create submission record
        submission = ContactSubmission(
            name=form.name,
            email=form.email,
            phone=form.phone or "",
            service=form.service,
            message=form.message or ""
        )
        
        # Save to database
        doc = submission.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.contact_submissions.insert_one(doc)
        
        # Get service label
        service_label = SERVICE_LABELS.get(form.service, form.service)
        
        # Send email notification to trainer
        if TRAINER_EMAIL and resend.api_key:
            email_html = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #09090B; color: #FAFAFA;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #DC2626; margin: 0;">New Consultation Request</h1>
                </div>
                
                <div style="background-color: #18181B; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
                    <h2 style="color: #DC2626; margin-top: 0; font-size: 18px;">Client Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #A1A1AA; width: 120px;">Name:</td>
                            <td style="padding: 8px 0; color: #FAFAFA;">{form.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #A1A1AA;">Email:</td>
                            <td style="padding: 8px 0; color: #FAFAFA;"><a href="mailto:{form.email}" style="color: #DC2626;">{form.email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #A1A1AA;">Phone:</td>
                            <td style="padding: 8px 0; color: #FAFAFA;">{form.phone or 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #A1A1AA;">Service:</td>
                            <td style="padding: 8px 0; color: #DC2626; font-weight: bold;">{service_label}</td>
                        </tr>
                    </table>
                </div>
                
                {f'''<div style="background-color: #18181B; border-radius: 12px; padding: 24px;">
                    <h2 style="color: #DC2626; margin-top: 0; font-size: 18px;">Message</h2>
                    <p style="color: #FAFAFA; line-height: 1.6; margin: 0;">{form.message}</p>
                </div>''' if form.message else ''}
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #27272A;">
                    <p style="color: #A1A1AA; font-size: 12px;">This email was sent from your Prem Rishi Fitness website contact form.</p>
                </div>
            </div>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [TRAINER_EMAIL],
                "subject": f"New Consultation Request: {service_label} - {form.name}",
                "html": email_html
            }
            
            try:
                await asyncio.to_thread(resend.Emails.send, params)
                logger.info(f"Email sent successfully for submission {submission.id}")
            except Exception as email_error:
                logger.error(f"Failed to send email: {str(email_error)}")
                # Don't fail the request if email fails - submission is still saved
        
        return {
            "status": "success",
            "message": "Your consultation request has been submitted successfully!",
            "submission_id": submission.id
        }
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process your request. Please try again.")

@api_router.get("/submissions")
async def get_submissions():
    """Get all contact form submissions (admin endpoint)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub.get('timestamp'), str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    
    return submissions

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
