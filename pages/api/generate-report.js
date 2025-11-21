import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city, state, address } = req.body;

  if (!city || !state) {
    return res.status(400).json({ error: 'City and state are required' });
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const location = address || `${city}, ${state}`;
    
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const prompt = `You are a senior commercial retail real estate analyst preparing a market report for ${location} as of ${currentDate}. This report will be read by sophisticated commercial property owners who need CURRENT, HYPERLOCAL retail data.

CRITICAL REQUIREMENTS:
1. Search the web EXTENSIVELY for information from the LAST 60 DAYS (since October 2025)
2. Focus on a 10-15 mile radius around ${location}
3. Find SPECIFIC, REAL data - actual tenant names, actual addresses, actual square footages, actual lease rates
4. This is ${currentDate} - DO NOT reference Q4 2024, 2024 outlooks, or outdated information
5. If you find data from more than 60 days ago, clearly note it as "recent months" not "last 60 days"

SEARCH FOR (10-15 mile radius from ${location}):

**Newly Signed Leases (Last 60 Days):**
- Which retailers signed NEW leases?
- What shopping centers? (exact names and addresses)
- Square footage of each lease?
- Lease rates if available ($/SF/year or $/SF/month)?
- Move-in dates?

**New Lease Listings (Currently Available):**
- What retail spaces just hit the market?
- Shopping center names and locations
- Available square footages
- Asking rents
- Property features (anchor tenant, pad sites, inline spaces, etc.)

**For Sale Listings (Shopping Centers/Multi-Tenant Retail):**
- Any retail properties recently listed for sale?
- Property names, addresses, square footages
- Asking prices or price per SF
- Cap rates if mentioned
- Occupancy rates

**Recent Closures/Departures:**
- Any retailers that recently closed or announced closures?
- Spaces that became available

**Development/Construction:**
- Any NEW retail developments under construction or recently announced?
- Shopping center expansions or renovations?

**Rent Comparables:**
- What are CURRENT asking rents in the area (last 60 days)?
- Mention specific shopping centers and their asking rates

OUTPUT FORMAT - Write 2 concise paragraphs (200-250 words total):

**Paragraph 1 - Recent Leasing Activity (Last 60 Days):**
Write 4-5 sentences covering NEW lease signings you found, current available listings, and asking rent data from the last 60 days. Name specific retailers, shopping centers with addresses, square footages, and rent rates. Be data-driven and specific. If you can't find data from the last 60 days, say "limited publicly available data from the last 60 days" and use recent months data while being clear about timing.

**Paragraph 2 - Investment Activity & Available Opportunities:**
Write 4-5 sentences covering for-sale listings (multi-tenant retail/shopping centers), recent closures creating opportunities, any new developments, and market outlook for the NEXT 60 days (through January 2026). Include specific property names, asking prices, and cap rates when available.

CRITICAL REMINDERS:
- We are in ${currentDate} - reference current time period correctly
- Search multiple times to find real, current data
- Use specific names: "Starbucks signed a 2,400 SF lease at Livermore Valley Plaza" NOT "a coffee shop signed a lease"
- Include actual numbers: square footages, lease rates, prices
- Mention specific streets and shopping center names
- If data is limited, acknowledge it: "Public leasing data for the last 60 days is limited, however..."
- NEVER make up data - only use what you actually find

Write in a professional, analytical tone. Keep it concise for PowerPoint display.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const report = message.content[0].text;

    return res.status(200).json({ report });
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ 
      error: 'Failed to generate report',
      details: error.message 
    });
  }
}
