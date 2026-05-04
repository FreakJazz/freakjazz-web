# Vercel Deployment Setup

## Environment Variables Configuration

To deploy this application to Vercel and make the contact/quote forms work properly, you need to configure the following environment variables in your Vercel project dashboard.

### Required Environment Variables for Serverless Functions

Go to your Vercel project → Settings → Environment Variables and add:

#### Mailjet Configuration (Backend API)

```
MAILJET_API_KEY=your_mailjet_api_key_here
MAILJET_API_SECRET=your_mailjet_api_secret_here
MAILJET_SENDER_EMAIL=noreply@yourdomain.com
MAILJET_SENDER_NAME=FreakJazz Development
COMPANY_EMAIL=contact@yourdomain.com
COMPANY_NAME=FreakJazz Development
APP_URL=https://yourdomain.com
```

#### Frontend Variables (with VITE\_ prefix)

```
VITE_MAILJET_API_KEY=your_mailjet_api_key_here
VITE_MAILJET_API_SECRET=your_mailjet_api_secret_here
VITE_MAILJET_SENDER_EMAIL=noreply@yourdomain.com
VITE_MAILJET_SENDER_NAME=FreakJazz Development
VITE_COMPANY_EMAIL=contact@yourdomain.com
VITE_COMPANY_NAME=FreakJazz Development
VITE_APP_URL=https://yourdomain.com
```

#### Images Configuration

```
VITE_HERO_IMAGE=your_firebase_storage_url
VITE_CONTACT_IMAGE=your_firebase_storage_url
VITE_QUOTE_IMAGE=your_firebase_storage_url
VITE_PROJECTS_IMAGE=your_firebase_storage_url
```

### Important Notes

1. **Why duplicate variables?**
   - Variables **without** `VITE_` prefix are used by serverless functions in `/api` folder
   - Variables **with** `VITE_` prefix are used by the frontend Vite application
   - Both are needed for the application to work correctly

2. **Getting Mailjet Credentials:**
   - Sign up at [Mailjet](https://www.mailjet.com/)
   - Go to Account Settings → API Keys Management
   - Copy your API Key and Secret Key
   - Verify your sender email address in Mailjet dashboard

3. **Production URL:**
   - Replace `https://yourdomain.com` with your actual domain
   - Example: `https://freakjazz.com`

4. **Security:**
   - Never commit `.env` file to Git (it's already in `.gitignore`)
   - Use `.env.example` as a template for team members
   - Keep your API keys secure and rotate them periodically

### Testing Locally

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Fill in your actual credentials in `.env`

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Test the contact form at `http://localhost:5173/contact-us`

### Troubleshooting

#### 500 Error on Contact Form

- **Cause**: Missing or incorrect Mailjet credentials
- **Solution**:
  1. Verify Mailjet API Key and Secret are correct
  2. Check that sender email is verified in Mailjet dashboard
  3. Ensure all required environment variables are set in Vercel
  4. Redeploy after updating environment variables

#### Emails Not Sending

- **Cause**: Unverified sender email
- **Solution**:
  1. Log into Mailjet dashboard
  2. Go to Account Settings → Sender Addresses
  3. Verify your sender email address
  4. Wait for verification email and click the confirmation link

#### Environment Variables Not Loading

- **Cause**: Vercel needs redeployment after env var changes
- **Solution**:
  1. Update environment variables in Vercel dashboard
  2. Go to Deployments tab
  3. Click "Redeploy" on the latest deployment
  4. Wait for deployment to complete

### Support

For more information:

- [Vercel Environment Variables Documentation](https://vercel.com/docs/projects/environment-variables)
- [Mailjet API Documentation](https://dev.mailjet.com/)
