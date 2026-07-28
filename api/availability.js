const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const date = req.query.date || '';
  
  https.get(`https://n8n-production-1412.up.railway.app/webhook/availability?date=${date}`, (r) => {
    let data = '';
    r.on('data', chunk => data += chunk);
    r.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.json({ taken: [] }); }
    });
  }).on('error', () => res.json({ taken: [] }));
};
