import { renderPage } from 'vike/server';

export default async function handler(req, res) {
  const pageContextInit = {
    urlOriginal: req.url,
    headersOriginal: req.headers,
  };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;

  if (!httpResponse) {
    res.statusCode = 200;
    res.end();
    return;
  }

  const { statusCode, headers } = httpResponse;
  headers.forEach(([name, value]) => res.setHeader(name, value));
  res.statusCode = statusCode;
  httpResponse.pipe(res);
}