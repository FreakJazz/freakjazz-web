# Email Configuration Guide

This project uses **Mailjet** to send emails from the contact and quote forms.

## Setup Instructions

### 1. Get Mailjet Credentials

1. Sign up for a free account at [Mailjet](https://www.mailjet.com/)
2. Go to **Account Settings** > **API Keys**
3. Copy your **API Key** and **Secret Key**

### 2. Configure Environment Variables

Create a `.env` file in the root of your project (copy from `.env.example`):

```bash
# Mailjet Configuration
MAILJET_API_KEY=your_mailjet_api_key_here
MAILJET_API_SECRET=your_mailjet_api_secret_here
MAILJET_SENDER_EMAIL=noreply@yourdomain.com
MAILJET_SENDER_NAME=FreakJazz Development
COMPANY_EMAIL=contact@yourdomain.com
COMPANY_NAME=FreakJazz Development

# Application Configuration
APP_URL=https://yourdomain.com
```

### 3. Verify Sender Email

1. In Mailjet dashboard, go to **Senders & Domains**
2. Add and verify your sender email address
3. Follow the verification steps (email confirmation)

### 4. Install Dependencies

```bash
npm install
# or
yarn install
```

### 5. Deploy to Vercel

The API routes in `/api` folder will automatically be deployed as serverless functions.

**Configure environment variables in Vercel:**

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add all the environment variables from your `.env` file

## How It Works

### Email Flow

#### Contact Form

1. User fills contact form
2. POST request to `/api/contact`
3. Two emails are sent:
   - **To Company**: Contains all form details
   - **To Client**: Confirmation email

#### Quote Form

1. User fills quote request form
2. POST request to `/api/quote`
3. Two emails are sent:
   - **To Company**: Contains all project and contact details
   - **To Client**: Confirmation with next steps

### Email Templates

All email templates are styled with your brand colors:

- Primary: `#078DEE` (Celeste)
- Dark: `#0351AB`
- Professional, responsive HTML design
- Consistent branding across all emails

## Development

### Local Testing

For local development, you can use Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

This will start a local server that simulates the Vercel environment.

### Testing Emails

You can use Mailjet's sandbox mode for testing:

- Emails will be visible in your Mailjet dashboard
- No actual emails sent in sandbox mode

## Troubleshooting

### Emails Not Sending

1. **Check API Keys**: Ensure they're correctly set in environment variables
2. **Verify Sender**: Make sure sender email is verified in Mailjet
3. **Check Logs**: View function logs in Vercel dashboard
4. **Rate Limits**: Free Mailjet accounts have daily sending limits

### CORS Issues

The API routes are configured to only accept POST requests. Make sure you're making POST requests from your frontend.

## API Endpoints

### POST `/api/contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in your services..."
}
```

### POST `/api/quote`

**Request Body:**

```json
{
  "projectType": "complex",
  "technologies": ["react", "nodejs", "cloud"],
  "timeline": "3-6",
  "budget": "30-50",
  "description": "Description of project...",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Company Name",
  "requirements": "Additional requirements..."
}
```

## Email Preview

You can view email templates in the Mailjet dashboard after sending test emails.

## Security Notes

- API keys are stored as environment variables (never in code)
- Serverless functions run on Vercel's secure infrastructure
- Input validation on both frontend and backend
- CORS protection on API routes

## Support

For issues with:

- **Mailjet**: [Mailjet Support](https://www.mailjet.com/support/)
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
