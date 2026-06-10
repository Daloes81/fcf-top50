export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target || !target.includes('fcf.cat')) {
    return new Response('Bad request', { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FCFTop50/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ca,es;q=0.9',
      },
      cf: { cacheTtl: 300 }
    });

    const text = await res.text();
    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      }
    });
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 502 });
  }
}
