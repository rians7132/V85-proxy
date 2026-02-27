export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.query.path;
  if (!path) return res.status(400).json({ error: 'Missing path' });

  try {
    const url = 'https://www.atg.se/services/racinginfo/v1/api/' + path;
    console.log('Fetching:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'sv-SE,sv;q=0.9',
        'Referer': 'https://www.atg.se/',
        'Origin': 'https://www.atg.se'
      }
    });
    
    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
