import https from 'https';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'GET') {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var options = {
      hostname: '141.145.200.146',
      port: 443,
      path: '/api/get_last_video_data',
      method: 'GET',
      headers: myHeaders,
      key: fs.readFileSync('/tmp/ca-keyAndCert.pem'),
      cert: fs.readFileSync('/tmp/ca-keyAndCert.pem'),
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        res.status(200).json(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });

    req.end();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}