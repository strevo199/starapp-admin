import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // Now req.body is already parsed JSON
    const payload = req.body;

    const backendRes = await fetch(
      'https://startapp-be.onrender.com/hymms/add_hymm',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const result = await backendRes.json();

    if (!backendRes.ok) {
      return res.status(backendRes.status).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: error.responseMessage || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
}
