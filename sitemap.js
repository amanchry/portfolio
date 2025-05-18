const fs = require('fs');

const sitemapEntries = [
  {
    url: 'https://amanchaudhary.com',
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 1.0,
  },
  {
    url: 'https://amanchaudhary.com/resume',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'https://amanchaudhary.com/portfolio',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: 'https://amanchaudhary.com/contact',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: 'https://amanchaudhary.com/blogs',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries.map(entry => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
      <changefreq>${entry.changeFrequency}</changefreq>
      <priority>${entry.priority}</priority>
    </url>`).join('')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemapXml, 'utf8');
console.log('sitemap.xml has been generated!');
