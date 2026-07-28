const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  https.get('https://n8n-production-1412.up.railway.app/webhook/3dfe549f-4d1b-4d76-9639-1ecdf1020644', (r) => {
    let data = '';
    r.on('data', chunk => data += chunk);
    r.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.status(500).json({ error: 'parse error' }); }
    });
  }).on('error', (e) => res.status(500).json({ error: e.message }));
};
