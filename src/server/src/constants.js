import dotenv from 'dotenv';
dotenv.config({
    path: "./.env"
});

export const PORT = process.env.PORT;

export const CLOUDINARY_NAME = process.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.CLOUDINARY_API_SECRET;

export const MONGO_DB_URL = process.env.MONGO_DB_URL;
export const DB_NAME = process.env.DB_NAME;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GPT_MODEL_1 = process.env.GPT_MODEL_1;
export const GPT_MODEL_2 = process.env.GPT_MODEL_2;
export const GPT_MODEL_3 = process.env.GPT_MODEL_3;

export const get_prompt = (TOPIC) => {
    const PROMPT = `Please provide a comprehensive 2-page summary about "${TOPIC}" and generate using proper LaTeX notation for all chemical equations and mathematical expressions following this exact structure:

    # Main Title: ${TOPIC}
    
    ## Introduction
    Start with a compelling introduction that includes:
    - Brief overview
    - Historical context
    - Key significance
    > Include a notable quote or fact about ${TOPIC}
    
    ## Key Concepts
    ### Core Principles
    [Explain fundamental concepts]
    
    ### Important Components
    [Break down major elements]
    
    ## Technical Details
    ### Process Overview
    [Include relevant chemical equations using LaTeX notation]
    - Example: $\\ce{6 CO2 + 6 H2O + light -> C6H12O6 + 6 O2}$
    
    ### Mechanisms and Reactions
    [Explain key mechanisms with chemical equations]
    - Format all chemical equations like: $\\ce{2 H2O -> 2 H2 + O2}$
    - Always wrap chemical equations in $ symbols
    - Use \\ce{} for all chemical reactions
    - Include reaction conditions and states:
      - States: $\\ce{H2O(l) -> H2O(g)}$
      - Concentrations: $\\ce{[H+] + [OH-] -> H2O}$
      - Catalysts: $\\ce{A + B ->[catalyst] C + D}$
      - Reversible reactions: $\\ce{A + B <=> C + D}$
    
    ## Applications
    ### Current Uses
    [List and explain major applications]
    
    ### Future Potential
    [Discuss emerging possibilities]
    
    ## Analysis
    ### Advantages
    - Point 1
    - Point 2
    
    ### Limitations
    - Point 1
    - Point 2
    
    ### Expert Insights
    > Include relevant expert quotes or research findings
    
    ## Conclusion
    [Summarize key points and future outlook]
    
    ---
    **Format Requirements:**
    1. Use markdown headers (#, ##, ###) for all sections.
    2. Include at least 2-3 chemical equations using this exact format: $\\ce{reactants -> products}$.
    3. Each equation must be in a separate line, wrapped in $ symbols.
    4. Use blockquotes (>) for important statements.
    5. Maintain logical flow and accuracy.
    6. Highlight critical terms using bold (**term**).
    
    Ensure scientific accuracy and proper LaTeX formatting throughout.
`    
    return PROMPT;
}

