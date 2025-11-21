# Deployment Checklist

## Pre-Deployment Checks ✅

### 1. Code Status
- [x] API endpoint complete (`pages/api/generate-report.js`)
- [x] Main component complete (`components/LandlordReportForm.jsx`)
- [x] Dependencies configured (`package.json`)
- [x] Next.js config added (`next.config.js`)
- [x] Vercel config present (`vercel.json`)
- [x] .gitignore configured
- [x] README.md with instructions
- [x] Environment example file (`.env.local.example`)

### 2. Required Files
```
✓ components/LandlordReportForm.jsx
✓ pages/api/generate-report.js
✓ pages/index.js
✓ package.json
✓ vercel.json
✓ next.config.js
✓ .gitignore
✓ README.md
✓ .env.local.example
```

### 3. Environment Variables Needed
```
ANTHROPIC_API_KEY=your_key_here
```

## Deployment Steps

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repo: `sc2339/ngc-landlord-update-report`

3. **Configure Environment Variables**
   - In project settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key from https://console.anthropic.com/
   - Apply to: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```

4. **Add Environment Variable**
   ```bash
   vercel env add ANTHROPIC_API_KEY production
   ```
   - Paste your API key when prompted

5. **Deploy**
   ```bash
   vercel --prod
   ```

## Post-Deployment Testing

### Test Checklist
1. [ ] Open deployed URL
2. [ ] Enter a property address
3. [ ] Upload a test PDF
4. [ ] Click "Generate PowerPoint Report"
5. [ ] Verify AI market report generates
6. [ ] Verify PowerPoint downloads successfully
7. [ ] Open PowerPoint and check all slides:
   - [ ] Cover page (from PDF)
   - [ ] Activity summary with KPIs
   - [ ] Market insights (AI-generated)
   - [ ] Outbound activity contacts
   - [ ] Inbound activity contacts
   - [ ] Last page (from PDF)

### Common Issues & Fixes

**Issue: "Failed to generate report"**
- Solution: Check ANTHROPIC_API_KEY is set correctly in Vercel
- Go to Project Settings → Environment Variables
- Verify the key is valid at console.anthropic.com

**Issue: Build fails**
- Solution: Check build logs in Vercel dashboard
- Ensure all dependencies in package.json are correct
- Node version should be 18+

**Issue: PDF not uploading**
- Solution: This is likely a browser issue
- Try different browser
- Check console for errors

**Issue: API route 404**
- Solution: Ensure Next.js detected the API route
- Check that `pages/api/generate-report.js` exists
- Redeploy if needed

## URLs

- **Production URL**: `https://[your-project].vercel.app`
- **GitHub Repo**: `https://github.com/sc2339/ngc-landlord-update-report`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **Anthropic Console**: `https://console.anthropic.com/`

## Quick Reference Commands

```bash
# Local development
npm install
npm run dev

# Build locally (test before deploy)
npm run build

# Deploy to production
vercel --prod

# View logs
vercel logs [deployment-url]

# Check environment variables
vercel env ls
```

## Status: ✅ READY TO DEPLOY

All files are complete and configured. Follow the deployment steps above.

## Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set
4. Review this checklist again
