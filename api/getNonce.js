export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { walletAddress } = req.body;
  console.log(walletAddress);

  try {
    const response = await fetch("https://www.sparkengine.ai/api/getNonce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: walletAddress }),
    });
    console.log(response);
    const data = await response.json();
    if (data.nonce) {
      res.status(200).json(data);
    } else {
      console.error("Error fetching nonce:", data.error);
      res.status(500).json({ error: "Failed retireving nonce" });
    }
  } catch (error) {
    console.error("Error fetching nonce:", error);
    res.status(500).json({ error: "Failed retireving nonce" });
  }
}
