import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { walletAddress } = req.body;

  try {
    const response = await fetch(
      "https://www.sparkengine.ai/api/getweb3Credits",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: walletAddress }),
      }
    );
    const data = await response.json();
    if (data.credits !== undefined) {
      res.status(200).json(data);
    } else {
      console.error("Error fetching credits:", data.error, data.details);
      res.status(500).json({ error: "Failed to retrieve credits" });
    }
  } catch (error) {
    console.error("Error fetching credits:", error);
    res.status(500).json({ error: "Failed to retrieve credits" });
  }
}
