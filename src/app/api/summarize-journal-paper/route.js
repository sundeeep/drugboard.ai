// app/api/summarize-journal-paper/route.js
import { NextResponse } from 'next/server';


const SYSTEM_PROMPT = `You are a chemistry research paper analyzer. Your task is to analyze the provided research paper and create a structured summary following these rules:

1. Chemical Reactions List:
   - Extract and list all chemical reactions mentioned in the paper
   - Use standard IUPAC nomenclature
   - Present reactions in a clear, equation format

2. Detailed Reaction Analysis:
   - For each reaction, provide:
     a) Complete formulation
     b) List of reactants
     c) List of reagents
     d) Products
     e) Reaction conditions
   - Explain each reaction in simple chemistry terms
   - Use standard IUPAC chemical names for all molecules

3. Research Analysis:
   - Provide a comprehensive research perspective
   - List and analyze the most cited references
   - Include relevant bibliography

Format the output as follows:
Give me the response in the Markdown format with the following sections, Use bold, italic, ordered, unordered lists, h2, h3,h4 tags in appropriate places and format the every section in beautiful hierarchy.

SECTION 1: Summarize the whole research: abstract, intro, main research, findings, observations in third person perspective. (1 page, 2000 tokens)
SECTION 2: Chemical Reactions Overview (1 page, 2000 tokens)
SECTION 3: Detailed Reaction Analysis (2 pages, 8000 tokens)
SECTION 4: Research Perspective, Future Scope and Bibliography (2 pages, 6000 tokens)

Total length should be 5-6 pages, with clear section breaks and formatted text.`;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    
    // Extract text from PDF
    const paperText = await extractTextFromPDF(buffer);

    // Prepare AI API request
    const aiRequest = {
      model: process.env.PPLX_AI_RESEARCH_PAPER_SUMMARIZER_MODEL_CHAT,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Please analyze the following chemistry research paper: \n\n${paperText}`
        }
      ],
      temperature: 0.2,
      max_tokens: 35000
    };

    // Make API call to Perplexity AI
    const aiResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PPLX_AI_API_KEY}`
      },
      body: JSON.stringify(aiRequest)
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.statusText}`);
    }

    const analysis = await aiResponse.json();

    return NextResponse.json({
      success: true,
      analysis: analysis.choices[0].message.content
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing the PDF file' },
      { status: 500 }
    );
  }
}