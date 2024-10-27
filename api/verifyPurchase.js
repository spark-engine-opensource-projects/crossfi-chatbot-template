export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { txHash, walletAddress } = req.body;

    if (!txHash || !walletAddress) {
        return res.status(400).json({ error: 'Transaction hash and wallet address are required' });
    }

    try {
  
        const response = await fetch('https://www.sparkengine.ai/api/verifyPurchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ txHash: txHash, walletAddress: walletAddress }),
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          console.log('Purchase verified:', data.message);
          res.status(200).json(data)
        } else {
          console.error('Purchase verification failed:', data.error);
          res.status(500).json({error: "Failed to verify purchase"})
        }
      } catch (error) {
        console.error('Error verifying purchase:', error);
        res.status(500).json({error: "Failed to verify purchase"})
    }
}
