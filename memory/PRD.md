# Prem Rishi Fitness - Product Requirements Document

## Original Problem Statement
Build a website for Fitness trainer Prem Rishi to showcase certifications, experience, and training programs. The website will be embedded in his Instagram profile to inform visitors about coaching services and capture leads through a contact form.

## User Personas
1. **Instagram Followers** - People who already know Prem via Instagram and want to learn more about his services
2. **Potential Clients** - Health-conscious individuals seeking professional fitness coaching
3. **Referral Traffic** - People referred by existing clients

## Core Requirements
- Dark theme with red, black, and white color palette
- Single-page website with smooth scroll navigation
- Mobile-first design (Instagram traffic)
- Professional yet energetic aesthetic
- Contact form with email notifications

## Features Implemented (January 2026)

### Frontend
- **Hero Section**: Full-height with NASM Certified badge, dynamic headline, and CTAs
- **Navigation**: Fixed nav with smooth scroll, mobile hamburger menu
- **Services Section**: Bento grid showcasing 4 programs:
  - Weight Loss
  - Strength Training / Weight Gain
  - Flexibility & Rehabilitation
  - Nutrition Coaching
- **About Section**: Trainer bio, credentials, experience stats
- **Contact Form**: Full name, email, phone, service selection dropdown, message
- **Footer**: Social links, copyright

### Backend
- FastAPI server with `/api` prefix
- Contact form submission endpoint (`POST /api/contact`)
- MongoDB storage for contact submissions
- Resend email integration ready (requires API key)
- Admin submissions endpoint (`GET /api/submissions`)

### Design System
- Typography: Barlow Condensed (headings) + Manrope (body)
- Colors: Primary #DC2626 (red), Background #09090B, Foreground #FAFAFA
- Glass morphism effects on cards and nav
- Framer Motion animations

## Technical Stack
- Frontend: React 19, Tailwind CSS, Shadcn UI, Framer Motion
- Backend: FastAPI, MongoDB, Resend
- Infrastructure: Kubernetes/Docker

## Email Configuration Required
To enable email notifications, add to `/app/backend/.env`:
```
RESEND_API_KEY=re_your_api_key
SENDER_EMAIL=your_verified_sender@domain.com
TRAINER_EMAIL=prem.rishi@email.com
```

## Next Action Items
1. Add actual photos of Prem Rishi (replace stock images)
2. Configure Resend API key for email notifications
3. Update contact info (email, Instagram handle)
4. Consider adding testimonials section
5. SEO optimization for local fitness searches
