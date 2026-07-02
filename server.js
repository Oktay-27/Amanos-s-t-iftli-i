const express = require("express");
const products = require("./products");

const app = express();
const PORT = process.env.PORT || 3000;

// Metindeki özel XML karakterlerini güvenli hale getirir (& < > vb.)
function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Tek bir ürünü Google Merchant <item> bloğuna çevirir
function productToXmlItem(p) {
  return `
    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <title>${escapeXml(p.title)}</title>
      <description>${escapeXml(p.description)}</description>
      <link>${escapeXml(p.link)}</link>
      <g:image_link>${escapeXml(p.image_link)}</g:image_link>
      <g:availability>${escapeXml(p.availability)}</g:availability>
      <g:price>${escapeXml(p.price)}</g:price>
      <g:brand>${escapeXml(p.brand)}</g:brand>
      <g:condition>${escapeXml(p.condition)}</g:condition>
      ${p.gtin ? `<g:gtin>${escapeXml(p.gtin)}</g:gtin>` : ""}
      ${p.mpn ? `<g:mpn>${escapeXml(p.mpn)}</g:mpn>` : ""}
    </item>`;
}

// Statik dosyalar (index.html, iade-politikasi.html, styles.css)
app.use(express.static("public"));

// Ürünler sayfasını products.js'ten otomatik üretir,
// böylece site ile feed hep aynı veriden beslenir
app.get("/urunler.html", (req, res) => {
  const cards = products.map(p => `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="price">${p.price}</div>
        <span class="avail">${p.availability === "in_stock" ? "Stokta" : "Stokta yok"}</span>
      </div>`).join("");

  res.send(`<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ürünler — Amanos Süt Evi</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="site">
  <a class="brand" href="/">Amanos Süt Evi</a>
  <nav>
    <a href="/urunler.html">Ürünler</a>
    <a href="/iade-politikasi.html">İade Politikası</a>
  </nav>
</header>
<div class="hero" style="padding-bottom: 50px;">
  <div class="eyebrow">Katalog</div>
  <h1 style="font-size: clamp(2rem, 4vw, 2.8rem);">Tüm Ürünlerimiz</h1>
</div>
<svg class="ridge" viewBox="0 0 1200 64" preserveAspectRatio="none">
  <path d="M0,64 L0,40 L120,10 L240,34 L360,4 L520,38 L640,14 L780,42 L900,8 L1040,36 L1200,18 L1200,64 Z"></path>
</svg>
<main>
  <section>
    <div class="grid">${cards}</div>
  </section>
</main>
<footer>
  <p>© 2026 Amanos Süt Evi</p>
</footer>
</body>
</html>`);
});

// Feed URL'si: bunu Merchant Center'a gireceksin
app.get("/feed/products.xml", (req, res) => {
  const items = products.map(productToXmlItem).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Ürün Feed'im</title>
    <link>https://senin-siten.com</link>
    <description>Google Merchant Center ürün akışı</description>
    ${items}
  </channel>
</rss>`;

  res.set("Content-Type", "application/xml");
  res.send(xml);
});

app.get("/", (req, res) => {
  res.send('Feed hazır: <a href="/feed/products.xml">/feed/products.xml</a>');
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
  console.log(`Feed adresi: http://localhost:${PORT}/feed/products.xml`);
});

