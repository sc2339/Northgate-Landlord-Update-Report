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
    
    const prompt = `You are a senior commercial real estate market analyst preparing a comprehensive retail market report for ${location}. This report will be read by sophisticated commercial property owners and requires deep, hyperlocalized research.

CRITICAL INSTRUCTIONS:
1. Search the web extensively for CURRENT information (last 60 days) about this specific market
2. Find REAL tenant names, ACTUAL lease transactions, SPECIFIC developments
3. Look within 10-mile radius of ${location}
4. Write in an original, analytical voice - NOT a template

REQUIRED RESEARCH (search multiple times if needed):
- Recent retail lease signings: Who signed leases? What square footage? Where specifically?
- Tenant departures/closures: Which retailers left? Why?
- New retail developments: What's under construction? Who's developing it?
- Rent comparables: What are ACTUAL asking rents per SF in recent deals?
- Vacancy data: Current vacancy rates for this specific submarket
- Investment sales: Any retail properties sold recently? At what cap rates?
- Notable retailers expanding or contracting in this market
- Local economic drivers affecting retail (employment, demographics, infrastructure)

OUTPUT FORMAT - Write 2 concise paragraphs (total approximately 200-250 words):

Paragraph 1 (Leasing Activity & Market Dynamics):
Write 4-5 sentences covering recent leasing velocity, specific tenant activity (name actual retailers), current rent levels with data points, and vacancy trends. Include specific street names or shopping centers you find. Be concise and data-focused.

Paragraph 2 (Investment Activity & Market Outlook):
Write 4-5 sentences covering investment sales activity, new development pipeline with specific project names, and forward-looking outlook for the next 6-12 months. Cite specific data points. Be concise and analytical.

DO NOT use phrases like "As of my knowledge cutoff" or "I don't have access to real-time data." You MUST search the web and provide current, real market intelligence. If you cannot find specific data after searching, acknowledge what's publicly available vs. what requires proprietary data sources.

Write naturally and professionally - vary your sentence structure, use transition words, and make it flow like a real analyst wrote it. KEEP IT CONCISE - this will be displayed in a PowerPoint slide.`;

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
