from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.message import EmailMessage
import asyncio

# Load env
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Gmail SMTP config
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

GMAIL_SMTP_USER = os.environ.get("GMAIL_SMTP_USER", "")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "")
TRAINER_EMAIL = os.environ.get("TRAINER_EMAIL", "")

# App
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------- MODELS ---------------- #

class StatusCheck(BaseModel):
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

SERVICE_LABELS = {
    "weight-loss": "Weight Loss",
    "strength-training": "Strength Training / Weight Gain",
    "flexibility-rehab": "Flexibility & Rehabilitation",
    "nutrition-coaching": "Nutrition Coaching",
}

# In-memory status store (no DB)
STATUS_STORE: List[StatusCheck] = []

# ---------------- SMTP HELPER ---------------- #

def send_gmail_email(to_email: str, subject: str, html_content: str):
    msg = EmailMessage()
    msg["From"] = GMAIL_SMTP_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content("This email requires HTML support.")
    msg.add_alternative(html_content, subtype="html")

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(GMAIL_SMTP_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)

# ---------------- ROUTES ---------------- #

@api_router.get("/")
async def root():
    return {"message": "Prem Rishi Fitness API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status = StatusCheck(client_name=input.client_name)
    STATUS_STORE.append(status)
    return status

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    return STATUS_STORE

@api_router.post("/contact")
async def submit_contact_form(form: ContactForm):
    try:
        service_label = SERVICE_LABELS.get(form.service, form.service)

        email_html = f"""
        <div style="font-family:Arial; max-width:600px; margin:auto;
                    background:#09090B; color:#FAFAFA; padding:20px;">
            <h2 style="color:#DC2626; text-align:center;">New Consultation Request</h2>

            <p><b>Name:</b> {form.name}</p>
            <p><b>Email:</b> <a href="mailto:{form.email}" style="color:#DC2626;">{form.email}</a></p>
            <p><b>Phone:</b> {form.phone or "Not provided"}</p>
            <p><b>Service:</b> <span style="color:#DC2626;">{service_label}</span></p>

            {f"<p><b>Message:</b><br>{form.message}</p>" if form.message else ""}

            <hr style="border:1px solid #27272A; margin-top:20px;">
            <p style="font-size:12px; color:#A1A1AA; text-align:center;">
                Sent from Prem Rishi Fitness website
            </p>
        </div>
        """

        if not (GMAIL_SMTP_USER and GMAIL_APP_PASSWORD and TRAINER_EMAIL):
            raise RuntimeError("Gmail SMTP not configured")

        await asyncio.to_thread(
            send_gmail_email,
            TRAINER_EMAIL,
            f"New Consultation Request: {service_label} - {form.name}",
            email_html,
        )

        logger.info("Gmail email sent successfully")

        return {
            "status": "success",
            "message": "Your consultation request has been submitted successfully!"
        }

    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")

# ---------------- APP SETUP ---------------- #

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
