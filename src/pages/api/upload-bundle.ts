// pages/api/upload-app.js
import { createReadStream } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { readFileSync, unlinkSync, existsSync } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
  });
  try {
    // Get token from cookies
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse form data
    const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });
      const bundle = Array.isArray(files.bundle) ? files.bundle : [files.bundle];
      const assets = Array.isArray(files.assets) ? files.assets : [files.assets];

    // Validate required fields
    if (!fields.targetedVersion || !fields.platform || !files.assets  || !files.bundle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const assetsFile = assets[0];
    if (!existsSync(assetsFile.filepath)) {
      console.log('File path exists check failed:', assetsFile.filepath);
      return res.status(400).json({ error: 'Uploaded file not found' });
    }
    if (!existsSync(assetsFile.filepath)) {
      console.log('File path exists check failed:', assetsFile.filepath);
      return res.status(400).json({ error: 'Uploaded assets not found' });
    }

    const bundleFile = bundle[0];
    if (!existsSync(bundleFile.filepath)) {
      console.log('File path exists check failed:', bundleFile.filepath);
      return res.status(400).json({ error: 'Uploaded file not found' });
    }
    if (!existsSync(bundleFile.filepath)) {
      console.log('File path exists check failed:', bundleFile.filepath);
      return res.status(400).json({ error: 'Uploaded bundle not found' });
    }

  
      if (!fields.targetedVersion || !fields.platform) {
        if (files.bundleFile?.filepath) unlinkSync(files.bundleFile.filepath);
        if (files.assetsFile?.filepath) unlinkSync(files.assetsFile.filepath);
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // 3. Read file into Buffer and create Blob
      const bundleBuffer = readFileSync(bundleFile.filepath);
      const bundleBlob = new Blob([bundleBuffer], {
        type: bundleFile.mimetype || 'application/octet-stream',
      });

      const assetsBuffer = readFileSync(assetsFile.filepath);
      const assetsBlob = new Blob([assetsBuffer], {
        type: assetsFile.mimetype || 'application/octet-stream',
      });
      

    const formData = new FormData();
    formData.append('bundle', bundleBlob, bundleFile.originalFilename || 'upload.jpg');
    formData.append('assets', assetsBlob, assetsFile.originalFilename || 'upload.jpg');
    formData.append('targetedVersion', fields.targetedVersion);
    formData.append('envKey', fields.envKey);
    formData.append('platform', fields.platform);
    formData.append('accessKey', token);



    // Forward to backend
    const backendResponse = await fetch('https:// /api/bundle/upload', {
      method: 'POST',
      body: formData,
      
    });

    const result = await backendResponse.json();    
    if (!backendResponse.ok) {
      throw new Error(result.message || 'Backend registration failed');
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
}