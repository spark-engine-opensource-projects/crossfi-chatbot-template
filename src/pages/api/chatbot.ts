import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ success: false, message: 'Invalid messages format' });
      }

      const completion = await groq.chat.completions.create({
        messages,
        model: 'llama3-8b-8192',
      });

      const responseContent = completion.choices[0]?.message?.content || '';

      res.status(200).json({ message: responseContent });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error || 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
