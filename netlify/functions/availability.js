const https = require('https');

exports.handler = async (event) => {
  const date = event.queryStringParameters && event.queryStringParameters.date;

  if (!date) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'date parameter required' })
    };
  }

  return new Promise((resolve) => {
    const options = {
      hostname: 'n8n-production-1412.up.railway.app',
      path: `/webhook/availability?date=${date}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsed)
          });
        } catch (e) {
          resolve({
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: JSON.stringify({ taken: [] })
          });
        }
      });
    });

    req.on('error', () => {
      resolve({
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ taken: [] })
      });
    });

    req.end();
  });
};
