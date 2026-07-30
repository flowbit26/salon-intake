const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  https.get('https://n8n-production-1412.up.railway.app/webhook/agenda', (r) => {
    let data = '';
    r.on('data', chunk => data += chunk);
    r.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.json({ appointments: [] }); }
    });
  }).on('error', () => res.json({ appointments: [] }));
};
