export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) {
        return res.status(400).json({ error: 'Wallet address and signature are required' });
    }

    try {
        const response = await fetch('https://www.sparkengine.ai/api/verifySignature', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: walletAddress, signature }),
        });
        const data = await response.json();

        // Extract the Set-Cookie header (if available) from the response
        const cookies = response.headers.get('set-cookie');

        if (data.success) {
            if (cookies) {
                // Forward the Set-Cookie header to the frontend
                res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`);
            }
            console.log('Authentication successful');
            res.status(200).json(data);
        } else {
            console.error('Authentication failed:', data.error);
            res.status(401).json({ error: data.error || 'Failed to authenticate' });
        }

    } catch (error) {
        console.error('Error signing message:', error);
        res.status(500).json({ error: "Failed to authenticate" })
    }
}
