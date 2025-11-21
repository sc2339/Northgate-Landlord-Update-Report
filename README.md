# Landlord Update Report Generator

Automated biweekly report generator for commercial real estate landlords with AI-powered market insights.

## Features

- 📄 **PDF Upload**: Upload property offering memorandum (PDF)
- 🎨 **Automatic Brand Detection**: Extracts colors from your PDF for consistent branding
- 🤖 **AI Market Reports**: Claude AI generates comprehensive market insights by searching the web for:
  - Recent retail lease signings
  - Tenant departures/closures
  - New retail developments
  - Rent comparables
  - Vacancy data
  - Investment sales activity
  - Local economic drivers
- 📊 **Activity Tracking**: Monitors outbound/inbound contacts, tours, prospects, and proposals
- 💼 **Professional PowerPoint**: Generates a complete presentation with:
  - Cover page from your PDF
  - Activity summary with KPIs
  - AI-generated market insights
  - Detailed contact lists
  - Closing page from your PDF

## Tech Stack

- **Framework**: Next.js 14
- **Frontend**: React 18
- **AI**: Anthropic Claude API (claude-sonnet-4)
- **PDF Processing**: PDF.js
- **PowerPoint Generation**: PptxGenJS
- **Icons**: Lucide React
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sc2339/ngc-landlord-update-report.git
   cd ngc-landlord-update-report
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` with your API key
   - Add to all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
   - Select "Production"
   - Paste your Anthropic API key

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Usage

1. **Enter Property Address**
   - Input the full property address (e.g., "123 Main Street, Livermore, CA 94550")
   - This is used for AI market research

2. **Upload PDF**
   - Drag and drop or click to upload your property offering memorandum
   - Only PDF files are accepted

3. **Generate Report**
   - Click "Generate PowerPoint Report"
   - The AI will search the web for current market data
   - A PowerPoint file will automatically download

4. **Review PowerPoint**
   - Cover page with your PDF's first page
   - Activity summary with KPIs
   - AI-generated market insights
   - Contact lists (outbound and inbound activity)
   - Closing page with your PDF's last page

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude AI | Yes |

## Project Structure

```
ngc-landlord-update-report/
├── components/
│   └── LandlordReportForm.jsx    # Main form component
├── pages/
│   ├── api/
│   │   └── generate-report.js    # API endpoint for AI reports
│   └── index.js                  # Home page
├── package.json                  # Dependencies
├── vercel.json                   # Vercel configuration
└── README.md                     # This file
```

## API Endpoints

### POST /api/generate-report

Generates an AI-powered market report for a specific location.

**Request Body:**
```json
{
  "city": "Livermore",
  "state": "CA",
  "address": "123 Main Street, Livermore, CA 94550"
}
```

**Response:**
```json
{
  "report": "Comprehensive market report text..."
}
```

## Troubleshooting

### "Failed to generate report"
- Check that your `ANTHROPIC_API_KEY` is correctly set in environment variables
- Verify your API key is valid at [console.anthropic.com](https://console.anthropic.com/)
- Check API usage limits

### PDF not uploading
- Ensure file is a valid PDF format
- Check file size (recommended under 50MB)

### PowerPoint not downloading
- Check browser download permissions
- Try a different browser (Chrome, Firefox, Safari recommended)

### Deployment fails
- Ensure all environment variables are set in Vercel
- Check build logs for specific errors
- Verify Node.js version compatibility (18+)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- PDF processing by [PDF.js](https://mozilla.github.io/pdf.js/)
- PowerPoint generation by [PptxGenJS](https://gitbrent.github.io/PptxGenJS/)
