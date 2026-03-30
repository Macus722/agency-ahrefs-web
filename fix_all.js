const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\desmo\\Herd\\landing_page';

// 1. Update sitemap.xml
let sitemapPath = path.join(rootDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    sitemap = sitemap.replace(/https:\/\/agency-ahrefs\.com\/([a-zA-Z0-9\-\/]*)\.html/g, 'https://agency-ahrefs.com/$1');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}

// 2. Add images mapping for articles
const articleImages = {
  'seo-keyword-research.html': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600',
  'technical-seo-guide.html': 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=1600',
  'link-building-guide.html': 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1600',
  'on-page-seo-guide.html': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1600',
  'content-seo-strategy.html': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600',
  'local-seo-complete-guide.html': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600',
  'seo-mistakes-guide.html': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1600',
  'seo-tools-guide.html': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
};

const altTexts = {
  'seo-keyword-research.html': '关键词研究',
  'technical-seo-guide.html': '技术SEO',
  'link-building-guide.html': '外链建设',
  'on-page-seo-guide.html': '页面内SEO',
  'content-seo-strategy.html': '内容SEO策略',
  'local-seo-complete-guide.html': '本地SEO',
  'seo-mistakes-guide.html': 'SEO常见错误',
  'seo-tools-guide.html': 'SEO工具'
};

// Function to recursively process files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('.git')) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const htmlFiles = walk(rootDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix logo paths (all recursive wrong paths to correct one)
    content = content.replace(/(\.\.\/)+assets\/logo_transparent\.png/g, file.includes('index.html') && path.dirname(file) === rootDir ? 'assets/logo_transparent.png' : '../assets/logo_transparent.png');

    // Add article images if applicable
    const filename = path.basename(file);
    if (articleImages[filename] && content.includes('<hr class="my-8 border-gray-200"/>')) {
        const imageHtml = `\n  <div class="mb-10 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm">\n    <img src="${articleImages[filename]}" alt="${altTexts[filename]}" class="w-full h-[380px] object-cover">\n  </div>`;
        if (!content.includes(articleImages[filename])) {
            content = content.replace('<hr class="my-8 border-gray-200"/>', '<hr class="my-8 border-gray-200"/>' + imageHtml);
        }
    }

    // Strip .html from internal links
    // Match href="something.html" or href="something.html#anchor" ignoring http/https/mailto
    content = content.replace(/href="((?!https?:\/\/|mailto:|#)[^"]*?)\.html(#[^"]*?)?"/g, 'href="$1$2"');
    
    // Fix for index.html edge case -> href="index" -> href="index" is valid with .htaccess
    // if it was href="index.html" it becomes href="index"

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Fixed ' + htmlFiles.length + ' HTML files successfully.');
