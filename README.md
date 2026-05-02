# Edrean's Portfolio Backend

A Node.js/Express backend service for handling contact form submissions with email functionality.

## Features

- ✅ Contact form submission handling
- ✅ Email validation and security
- ✅ CORS support for frontend integration
- ✅ Multiple email provider support (Gmail, SendGrid, SMTP)
- ✅ Automatic confirmation emails to users
- ✅ Error handling and logging
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Email provider account (Gmail, SendGrid, or SMTP service)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

#### Gmail Setup (Recommended for testing)

1. Go to [myaccount.google.com/app-passwords](https://myaccount.google.com/app-passwords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character app password
4. Add to `.env`:
   ```
   EMAIL_PROVIDER=gmail
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

#### SendGrid Setup (Production)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Generate an API key from settings
3. Add to `.env`:
   ```
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=your-sendgrid-api-key
   ```

### 3. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 4. Start Production Server

```bash
npm start
```

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a web development project..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I will get back to you soon."
}
```

**Response (Error):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### GET /api/contact/health

Check if the contact service is operational.

**Response:**
```json
{
  "status": "OK",
  "service": "contact-form",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/health

Health check for the entire backend service.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Frontend Integration

Update your HTML form to POST to the backend:

```html
<form id="contactForm" action="http://localhost:5000/api/contact" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="text" name="subject" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

Or using fetch:

```javascript
const formData = {
  name: document.getElementById('name').value,
  email: document.getElementById('email').value,
  subject: document.getElementById('subject').value,
  message: document.getElementById('message').value,
};

fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      console.log('Message sent!');
    } else {
      console.log('Errors:', data.errors);
    }
  });
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | CORS-allowed frontend URL | `http://localhost:3000` |
| `EMAIL_PROVIDER` | Email service provider | `gmail`, `sendgrid`, `smtp` |
| `GMAIL_USER` | Gmail account email | `your-email@gmail.com` |
| `GMAIL_APP_PASSWORD` | Gmail app-specific password | `xxxx xxxx xxxx xxxx` |
| `SENDGRID_API_KEY` | SendGrid API key | `SG.xxxxxxxxxxxxx` |
| `EMAIL_FROM` | Sender email address | `noreply@edrean.dev` |
| `EMAIL_TO` | Recipient email address | `edreanochieng@gmail.com` |

## Validation Rules

- **name**: 2-100 characters, required
- **email**: Valid email format, required
- **subject**: 3-200 characters, required
- **message**: 10-5000 characters, required

## Security Features

- CORS protection
- Request validation with express-validator
- HTML escaping in email content
- Helmet security headers
- Rate limiting ready (can be added)
- Environment variable protection

## Deployment

### Deploy to Heroku

1. Create Heroku account and install CLI
2. `heroku login`
3. `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set GMAIL_USER=your-email@gmail.com
   heroku config:set GMAIL_APP_PASSWORD=your-app-password
   heroku config:set FRONTEND_URL=https://yourdomain.com
   ```
5. `git push heroku main`

### Deploy to Other Platforms

Works with Vercel, Railway, Render, AWS, DigitalOcean, etc. Ensure:
- Environment variables are configured
- NODE_ENV is set appropriately
- FRONTEND_URL points to your production domain

## Troubleshooting

**Email not sending:**
- Check `.env` variables are set correctly
- Verify Gmail app password is 16 characters (with spaces)
- Ensure Gmail account allows "Less secure apps" or use app password
- Check spam/promotions folder

**CORS errors:**
- Update `FRONTEND_URL` in `.env` to match your frontend domain
- Ensure frontend is making POST requests to correct endpoint

**Form not submitting:**
- Check browser console for network errors
- Verify backend is running (`npm run dev`)
- Check that form action URL is correct

## License

MIT
