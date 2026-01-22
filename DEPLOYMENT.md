# CV Upload System - Netlify Deployment Guide

This CV upload system uses Netlify Functions and Netlify Blobs for seamless serverless deployment.

## Features

- **Persistent Storage**: Uses Netlify Blobs for permanent file storage
- **Serverless Architecture**: No server maintenance required
- **Automatic Scaling**: Handles traffic spikes automatically
- **Secure**: Rate limiting and file validation built-in

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

### Netlify Functions
1. **upload-cv**: `/.netlify/functions/upload-cv`
   - Handles file uploads
   - Stores files in Netlify Blobs (persistent storage)
   - Updates cv.json configuration
   - Rate limiting: 10 uploads per 15 minutes per IP

2. **get-cv**: `/cv/:filename`
   - Serves PDF files from Netlify Blobs
   - Proxied through redirect rules

3. **cv-config**: `/cv/cv.json`
   - Serves current CV configuration
   - Lists available CVs for each language
   - Proxied through redirect rules

### Netlify Blobs
The system uses two Netlify Blob stores:
- `cv-files`: Stores the actual PDF files
- `cv-config`: Stores the cv.json configuration

Files are automatically cached and served through Netlify's CDN.

### Configuration
- `netlify.toml`: Configured for static site with functions
- Build command: `corepack enable && pnpm install && pnpm build`
- Publish directory: `dist/public`
- Functions directory: `netlify/functions`

## Troubleshooting

### If uploads fail:
1. Check Netlify function logs in your dashboard
2. Verify Netlify Blobs are enabled for your site
3. Check browser console for errors
4. Ensure you're using a supported file type (PDF only)

### If files don't download:
1. Check that the file was uploaded successfully
2. Verify the redirect rules are working in netlify.toml
3. Check Netlify function logs for the get-cv function

### If cv.json doesn't update:
1. Check the cv-config function logs
2. Verify Netlify Blobs permissions
3. Try uploading a file again to trigger an update

## Alternative: Decap CMS

For advanced users, the site also includes Decap CMS at `/admin`:
- Requires GitHub OAuth authentication
- Full CMS capabilities
- Direct GitHub commits

## Support

For issues or questions, contact the development team.
