# Email Configuration Setup

This guide explains how to configure email functionality for the application form.

## Environment Variables

Add the following variables to your `.env` file in the backend directory:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@cof.edu.in
```

## Gmail Setup (Recommended)

If you're using Gmail, you'll need to create an **App Password**:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Factor Authentication if not already enabled
4. Search for "App Passwords" in the search bar
5. Generate a new App Password for "Mail"
6. Copy the 16-character password
7. Use this password in the `EMAIL_PASS` variable (remove spaces)

**Example:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=cofjabalpur@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Your 16-character app password (no spaces)
ADMIN_EMAIL=dean@cof.edu.in
```

## Other Email Providers

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### Custom SMTP Server
```env
EMAIL_HOST=mail.yourserver.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourserver.com
EMAIL_PASS=your-password
```

## Testing

After configuration, test the email functionality by:

1. Restart your backend server
2. Navigate to the Academics page or any Program detail page
3. Click the "Apply Now" button
4. Fill out and submit the application form
5. Check if emails are received:
   - Admin should receive the application details at `ADMIN_EMAIL`
   - Applicant should receive a confirmation email

## Troubleshooting

### Emails not sending

1. **Check environment variables**: Ensure all EMAIL_* variables are set correctly
2. **Check firewall**: Port 587 should be open
3. **Check Gmail security**: If using Gmail, ensure App Password is generated
4. **Check logs**: Look at backend console for error messages
5. **Test credentials**: Try logging into your email account manually

### Common Errors

- **"Invalid login"**: Wrong EMAIL_USER or EMAIL_PASS
- **"Connection timeout"**: Firewall blocking port 587 or wrong EMAIL_HOST
- **"Self-signed certificate"**: Set `rejectUnauthorized: false` in nodemailer config (not recommended for production)

## Email Templates

The system sends two emails per application:

1. **To Admin** (`ADMIN_EMAIL`):
   - Applicant details
   - Program information
   - Message content
   - Resume attachment (if provided)

2. **To Applicant**:
   - Confirmation of receipt
   - Program details
   - Contact information
   - Expected response time

## Important Notes

- Never commit your `.env` file to version control
- Use strong, unique passwords
- Consider using a dedicated email account for the application
- Regularly monitor the admin email for new applications
- For production, consider using a professional email service like SendGrid, AWS SES, or Mailgun
