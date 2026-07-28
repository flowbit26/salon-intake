export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const response = await fetch('https://n8n-production-1412.up.railway.app/webhook/3dfe549f-4d1b-4d76-9639-1ecdf1020644');
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
