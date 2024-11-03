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

Generate the response in such a way that It's generated by highly intelligent phd scolar is writing enhancing summary for the journal paper.

SECTION 1: Summarize the whole research: abstract, intro, main research, findings, observations in third person perspective. (1 page, 2000 tokens)
SECTION 2: Chemical Reactions Overview (1 page, 2000 tokens)
SECTION 3: Detailed Reaction Analysis (2 pages, 8000 tokens)
SECTION 4: Research Perspective, Future Scope and Bibliography (2 pages, 6000 tokens)

Remember that generate the Side headings with creativity and in the third person. Dont put the text: SECTION 1 beside the section headings.

Total length should be 5-6 pages, with clear section breaks and formatted text.

REMEMBER: 
1. Chemical Reactions Format:
   Use the following ASCII format for all chemical reactions:
   
   Simple reactions:
   CH3COOH + CH3OH --> CH3COOCH3 + H2O
   
   Multiple step reactions:
   Step 1: NaBH4 + CH3OH --> Na[B(OCH3)4] + 4H2
   Step 2: Na[B(OCH3)4] + H2O --> B(OH)3 + 4CH3OH + NaOH

   Complex mechanisms:
   R-Br + Mg/ether --> RMgBr
   RMgBr + H2O --> R-H + Mg(OH)Br

   Equilibrium reactions:
   H2CO3 <--> H+ + HCO3-
   
   Resonance structures:
   CH3-CH=CH2 <--> +CH3-CH2-CH2

2. Chemical Structures:
   - Use ASCII art for simple structures
   Example for benzene:
      H
      |
   H-C     C-H
     ||   ||
   H-C     C-H
      |
      H

3. Conditions Format:
   Temperature: Write as "(25°C)" or "(room temp)"
   Pressure: Write as "(1 atm)" or "(high pressure)"
   Time: Write as "(2h)" or "(overnight)"
   Example: 
   CH3COOH + CH3OH --> CH3COOCH3 + H2O (65°C, 2h, H2SO4)

4. Exmample of Detailed Reaction Analysis Format:
   REACTION TITLE
   -------------
   Complete Reaction:
   A + B --> C + D (conditions)
   
   (Render this as Sub-Headings as h3 or h4) Reactants:
   - A (full name)
   - B (full name)
   
   (Render this as Sub-Headings as h3 or h4) Reagents:
   - List catalysts
   - List solvents
   
   (Render this as Sub-Headings as h3 or h4) Products:
   - C (full name)
   - D (full name)
   
   (Render this as Sub-Headings as h3 or h4) Conditions:
   - Temperature: X°C
   - Time: Y hours
   - Pressure: Z atm
   - Other conditions

Below is the Example, How You could generate the complete analysis of a chemical reaction:
------------------------
ESTER FORMATION
-------------
Complete Reaction:
CH3COOH + CH3OH --> CH3COOCH3 + H2O (65°C, 2h, H2SO4)

(Render this as Sub-Headings as h3 or h4) Reactants:
- CH3COOH (Acetic acid)
- CH3OH (Methanol)

(Render this as Sub-Headings as h3 or h4) Reagents:
- H2SO4 (Sulfuric acid) - catalyst
- No additional solvents required

(Render this as Sub-Headings as h3 or h4) Products:
- CH3COOCH3 (Methyl acetate)
- H2O (Water)

(Render this as Sub-Headings as h3 or h4) Conditions:
- Temperature: 65°C
- Time: 2 hours
- Catalyst: Concentrated H2SO4
- Pressure: Atmospheric pressure

## Mechanism:
Step 1: H2SO4 + CH3COOH --> CH3C(OH)2+ + HSO4-
Step 2: CH3C(OH)2+ + CH3OH --> CH3COOCH3 + H3O+

5. Research Analysis Format:
   Structure your analysis with:
   
   Title of Research
   (Render this as Sub-Headings as h3 or h4) Key Findings
   Write the below findings very informatively and enhance the knowledge.
   • Finding 1
   • Finding 2
   
   (Render this as Sub-Headings as h3 or h4) Reaction Overview
   Insert reaction using above formats. Write the chemical reactions descriptive here!
   
   (Render this as Sub-Headings as h3 or h4) Detailed Analysis
   Insert detailed analysis using above formats, Write each and every step involved in the chemical reaction.

When formatting your response, make sure to:
1. Use consistent spacing and alignment
2. Break complex reactions into numbered steps
3. Include all relevant conditions
4. Use ASCII arrows consistently (--> for reactions, <--> for equilibrium)
5. Maintain clear section boundaries with markdown headers
6. Include relevant units for all numerical values


NOTE: Render Chemical reactions as text only, write the chemical reactions using text, prefix and suffix. Use only ASCII format mentioned above, Don't write the complete name like: Benzene, instead write:CH3COOCH3  with prefixes and suffixes for number of atoms. the size of no of atoms in the molecule should be down/suffix than the atom.Don't use direct names of the molecule in plain english. Use IUPAC Naming notations and Chemical Formalas.

`;


// AI processing function
async function processWithAI(paperText) {
  if (!process.env.PPLX_AI_API_KEY || !process.env.PPLX_AI_RESEARCH_PAPER_SUMMARIZER_MODEL_CHAT) {
    throw new Error('Missing required environment variables');
  }

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
    max_tokens: 75000
  };

  const aiResponse = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PPLX_AI_API_KEY}`
    },
    body: JSON.stringify(aiRequest)
  });

  // Parse the response once and store it
  const result = await aiResponse.json();

  if (!aiResponse.ok) {
    throw new Error(result.error || `AI API error: ${aiResponse.statusText}`);
  }
  
  if (!result?.choices?.[0]?.message?.content) {
    throw new Error('Invalid response from AI API');
  }

  return result.choices[0].message.content;
}

// Main route handler
export async function POST(request) {
  try {
    // Validate request
    if (!request || !request.formData) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const paperText = formData.get("textFromPDF");
    

    // Process with AI
    const analysis = await processWithAI(paperText);

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Error in PDF processing route:', error);
    
    const errorMessage = error.message || 'Error processing the PDF file';
    const statusCode = error.message.includes('Missing required environment') ? 500 :
                      error.message.includes('No valid PDF') ? 400 : 500;

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}