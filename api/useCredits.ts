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
  const { prompt, fileUrls = [] } = req.body;

  const project_id = "362bc660-dd60-4b89-9ab7-79560cdece73";

  // Ensure all required fields are provided
  if (!prompt) {
    res.status(400).json({
      message: "Missing required fields: and prompt",
    });
    return;
  }

  try {
    // Make a call to the API route for web3completion
    const apiUrl = `/api/web3completion`;

    // Structure the API call with all required parameters
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
