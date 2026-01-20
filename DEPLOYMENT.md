# CV Upload System - Netlify Deployment Guide

This CV upload system has been converted to use Netlify Functions for seamless deployment on Netlify.

## Deployment Instructions

### Automatic Deployment (Recommended)

1. **Push this branch to GitHub**
   ```bash
   git push origin copilot/add-lightweight-cms-for-cvs
   ```

2. **Deploy on Netlify**
   - Go to your Netlify dashboard
   - Select your site or create a new one
   - Connect to your GitHub repository
   - Select the branch: `copilot/add-lightweight-cms-for-cvs`
   - Netlify will automatically detect the `netlify.toml` configuration
   - Click "Deploy site"

3. **Access the Upload Page**
   - Once deployed, visit: `https://your-site-url.netlify.app/cv-upload`
   - Share this URL with your client for CV uploads

### Manual Deployment

If you prefer to deploy manually:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Features

- **CV Upload Page**: `/cv-upload`
  - 3 separate upload sections for English, Spanish, and Portuguese CVs
  - Drag-and-drop support
  - Real-time upload status feedback
  - Multi-language UI support

- **Security**:
  - Rate limiting: 10 uploads per 15 minutes per IP
  - PDF-only file validation
  - 10MB file size limit
  - Secure filename generation

- **Auto-update**: Uploaded CVs are immediately available in the website footer

## Technical Details

### Netlify Function
- Location: `netlify/functions/upload-cv.ts`
- Endpoint: `/.netlify/functions/upload-cv`
- Method: POST
- Handles: File uploads, rate limiting, cv.json updates

### Configuration
- `netlify.toml`: Configured for static site with functions
- Build command: `corepack enable && pnpm install && pnpm build`
- Publish directory: `dist/public`
- Functions directory: `netlify/functions`

## Troubleshooting

### If uploads fail:
1. Check Netlify function logs in your dashboard
2. Verify the `client/public/cv` directory exists
3. Ensure `cv.json` is properly formatted

### If the page doesn't load:
1. Check build logs in Netlify
2. Verify all dependencies are installed
3. Check browser console for errors

## Alternative: Decap CMS

For advanced users, the site also includes Decap CMS at `/admin`:
- Requires GitHub OAuth authentication
- Full CMS capabilities
- Direct GitHub commits

## Support

For issues or questions, contact the development team.
