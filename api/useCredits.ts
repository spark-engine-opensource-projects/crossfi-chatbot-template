export default async function handler(req: any, res: any) {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Validate the request method
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  // Extract input parameters from the request body
  const { wallet_address, project_id, prompt, fileUrls = [] } = req.body;

  // Ensure all required fields are provided
  if (!wallet_address || !project_id || !prompt) {
    res.status(400).json({
      message:
        "Missing required fields: wallet_address, project_id, and prompt",
    });
    return;
  }

  try {
    // Make a call to the API route for web3completion
    const apiUrl = `https://www.sparkengine.ai/api/engine/web3completion`;

    // Structure the API call with all required parameters
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet_address,
        project_id,
        prompt,
        fileUrls, // Optional array of file URLs if provided
      }),
    });

    // Handle the response from the web3completion API
    const data = await response.json();

    // Check for errors in the API response
    if (!response.ok) {
      res
        .status(response.status)
        .json({ message: data.message || "Error during web3completion" });
      return;
    }

    return res.status(200).json(data.data);
  } catch (error) {
    console.error("Error calling web3completion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
