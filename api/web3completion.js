// This function will proxy the request to the external API
export default async function handler(req, res) {
  try {
    // Forward the request to the external API for `web3completion`
    const cookie = req.headers.cookie;
    let authToken = cookie.split("=");
    authToken = authToken[1] + "=" + authToken[2];

    console.log("Here is the cookie ==>>>> ", authToken);
    const response = await fetch(
      "https://www.sparkengine.ai/api/engine/web3completion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...req.body, // Spread existing request body contents
          token: authToken,
        }),
        credentials: "include", // Include cookies in the request if necessary
      }
    );

    const data = await response.json();
    console.log("Here is the response data =>>>> ", data);

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res
        .status(response.status)
        .json({ error: data.error || "Failed to complete action" });
    }
  } catch (error) {
    console.error("Error in web3completion proxy:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
