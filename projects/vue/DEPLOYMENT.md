# Deployment Guide for Vue 3 Project

## Overview
This guide explains how to deploy your Vue 3 project to your Dreamhost server.

## Prerequisites

### 1. SSH Key Setup
Before deploying, ensure you have passwordless SSH access to your Dreamhost server:

```bash
# Generate SSH key if you don't have one
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy your public key to the server
ssh-copy-id msdacia@iad1-shared-b8-07.dreamhost.com
```

### 2. Test SSH Connection
```bash
ssh msdacia@iad1-shared-b8-07.dreamhost.com
```

## Deployment Commands

### Quick Deployment
```bash
# Full deployment (build + upload)
npm run deploy

# Or run the script directly
./scripts/deploy.sh
```

### Available Commands
```bash
# Full deployment
./scripts/deploy.sh deploy

# Build project only
./scripts/deploy.sh build

# Upload existing build (skip build step)
./scripts/deploy.sh upload

# Test SSH connection
./scripts/deploy.sh test

# Verify current deployment
./scripts/deploy.sh verify

# Show help
./scripts/deploy.sh help
```

## What Happens During Deployment

1. **Dependency Check**: Verifies rsync and ssh are available
2. **Connection Test**: Tests SSH connection to your server
3. **Backup Creation**: Creates a timestamped backup on the server
4. **Project Build**: Runs `npm run build` to create production files
5. **File Upload**: Uses rsync to efficiently upload files
6. **Verification**: Confirms deployment was successful

## Deployment Configuration

The deployment script is configured for:
- **Remote Server**: `msdacia@iad1-shared-b8-07.dreamhost.com`
- **Remote Path**: `/home/msdacia/msdacia.com`
- **Local Build**: `./dist` (Vite default)

### Customizing Configuration
To modify the deployment settings, edit the variables at the top of `scripts/deploy.sh`:

```bash
REMOTE_USER="msdacia"
REMOTE_HOST="iad1-shared-b8-07.dreamhost.com"
REMOTE_PATH="/home/msdacia/msdacia.com"
```

## File Exclusions

The deployment script automatically excludes:
- `.DS_Store` files
- Log files (`*.log`)
- `node_modules`
- `.git` directory
- Environment files (`.env*`)

## Backup System

Each deployment creates a timestamped backup on the server in the `backups` directory:
```
backups/
  backup_20250613_143022/
  backup_20250613_142015/
  ...
```

## Troubleshooting

### SSH Connection Issues
```bash
# Test connection
./scripts/deploy.sh test

# Debug SSH connection
ssh -v msdacia@iad1-shared-b8-07.dreamhost.com
```

### Build Issues
```bash
# Build locally to debug
npm run build

# Check build output
ls -la dist/
```

### Upload Issues
```bash
# Manual rsync test
rsync -avz --dry-run ./dist/ msdacia@iad1-shared-b8-07.dreamhost.com:/home/msdacia/msdacia.com/
```

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# 1. Build the project
npm run build

# 2. Upload with rsync
rsync -avz --delete ./dist/ msdacia@iad1-shared-b8-07.dreamhost.com:/home/msdacia/msdacia.com/

# 3. Or use scp
scp -r dist/* msdacia@iad1-shared-b8-07.dreamhost.com:/home/msdacia/msdacia.com/
```

## Environment Variables

If your project uses environment variables, create a `.env.production` file for production-specific settings:

```bash
# .env.production
VITE_API_URL=https://api.msdacia.com
VITE_GA_TRACKING_ID=GA_XXXXXXXX
```

## Performance Tips

1. **Optimize Assets**: The build process automatically optimizes your assets
2. **Enable Gzip**: Configure your server to enable gzip compression
3. **Cache Headers**: Set appropriate cache headers for static assets
4. **CDN**: Consider using a CDN for better performance

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to git
2. **SSH Keys**: Keep your SSH private key secure
3. **File Permissions**: Ensure proper file permissions on the server
4. **HTTPS**: Make sure your site uses HTTPS

## Next Steps

After successful deployment:
1. Visit your website to verify it's working
2. Test all functionality
3. Set up monitoring if needed
4. Configure any additional server settings

## Support

For issues with:
- **Vue/Vite**: Check the official documentation
- **Dreamhost**: Contact Dreamhost support
- **Deployment Script**: Check the script logs for error details
