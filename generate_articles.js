const fs = require('fs');
const path = require('path');

const OUT = 'c:/Users/desmo/Herd/landing_page/articles';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const NAV = `<header class="fixed inset-x-0 top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
    <a href="../index.html" class="flex items-center gap-2"><img src="../../../../../assets/logo_transparent.png" alt="Agency Ahrefs SEO Authority Logo" class="h-8 w-auto object-contain"></a>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-brand-navy">
      <a href="../index.html" class="hover:text-brand-orange">首页</a>
      <a href="../solutions/seo-services.html" class="hover:text-brand-orange">什么是 SEO</a>
      <a href="../solutions/geo-services.html" class="hover:text-brand-orange">什么是 GEO</a>
      <a href="../solutions/aeo-services.html" class="hover:text-brand-orange">什么是 AEO</a>
      <a href="../agencies.html" class="hover:text-brand-orange">SEO 数据平台</a>
      <a href="../case-studies.html" class="hover:text-brand-orange">权威成果</a>
    </nav>
  </div>
</header>`;

const FOOTER = `<footer class="bg-white border-t border-gray-200 text-brand-navy pt-16 pb-8 mt-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div class="col-span-2">
        <a href="../index.html" class="flex items-center gap-2 mb-4"><img src="../../../../../assets/logo_transparent.png" alt="Agency Ahrefs SEO Authority Logo" class="h-8 w-auto object-contain"></a>
        <p class="text-sm text-brand-navy/60 max-w-xs">中文互联网领先的 SEO、GEO 与 AEO 知识库。权威解析搜索引擎优化、AI 概览与答案引擎的原理与策略。</p>
      </div>
      <div><h3 class="font-bold text-brand-navy mb-4 text-sm">知识体系</h3><ul class="space-y-2 text-sm text-brand-navy/60">
        <li><a href="../solutions/seo-services.html" class="hover:text-brand-orange">什么是 SEO</a></li>
        <li><a href="../solutions/geo-services.html" class="hover:text-brand-orange">什么是 GEO</a></li>
        <li><a href="../solutions/aeo-services.html" class="hover:text-brand-orange">什么是 AEO</a></li>
        <li><a href="../local-seo-malaysia.html" class="hover:text-brand-orange">本地 SEO</a></li>
      </ul></div>
      <div><h3 class="font-bold text-brand-navy mb-4 text-sm">SEO 文章</h3><ul class="space-y-2 text-sm text-brand-navy/60">
        <li><a href="seo-keyword-research.html" class="hover:text-brand-orange">关键词研究指南</a></li>
        <li><a href="technical-seo-guide.html" class="hover:text-brand-orange">技术SEO完整指南</a></li>
        <li><a href="link-building-guide.html" class="hover:text-brand-orange">外链建设策略</a></li>
        <li><a href="on-page-seo-guide.html" class="hover:text-brand-orange">On-Page SEO指南</a></li>
      </ul></div>
    </div>
    <div class="pt-8 border-t border-gray-200 flex justify-between items-center text-xs text-brand-navy/40">
      <p>&copy; <span id="year"></span> Agency Ahrefs. 保留所有权利。</p>
      <a href="mailto:hello@agencyahrefs.com" class="hover:text-brand-navy">hello@agencyahrefs.com</a>
    </div>
  </div>
</footer>
<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>`;

const HEAD = (title, desc, slug) => `<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>\n  <link rel="icon" href="../assets/logo_transparent.png"/>
  <meta charset="UTF-8"/>
  <title>${title} | Agency Ahrefs</title>
  <meta name="description" content="${desc}"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="canonical" href="https://agencyahrefs.com/articles/${slug}.html"/>
  <meta property="og:title" content="${title} | Agency Ahrefs"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:type" content="article"/>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = { theme: { extend: { fontFamily: { sans: ['Inter','system-ui','sans-serif'] }, colors: { brand: { orange:'#ff8000', blue:'#1462ff', navy:'#012f56', gray:'#5e617d', light:'#f8fafc' } } } } };
  <\/script>
  <style>body{font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;} .prose h2{font-size:1.5rem;font-weight:700;margin-top:2.5rem;margin-bottom:1rem;color:#012f56;} .prose h3{font-size:1.1rem;font-weight:600;margin-top:1.5rem;margin-bottom:.5rem;color:#012f56;} .prose p{margin-bottom:1rem;line-height:1.8;color:#374151;} .prose ul{list-style:disc;padding-left:1.5rem;margin-bottom:1rem;} .prose li{margin-bottom:.4rem;line-height:1.7;color:#374151;} .prose table{width:100%;border-collapse:collapse;margin:1.5rem 0;} .prose th{background:#012f56;color:#fff;padding:.6rem 1rem;text-align:left;font-size:.85rem;} .prose td{padding:.6rem 1rem;border-bottom:1px solid #e5e7eb;font-size:.9rem;} .tag{display:inline-block;padding:.2rem .7rem;border-radius:9999px;font-size:.7rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;}</style>
</head>
<body class="bg-white text-brand-navy">`;

const articles = [
  {
    slug: 'seo-keyword-research',
    title: '关键词研究完整指南（2024）',
    desc: '从零掌握SEO关键词研究方法论：搜索意图分析、长尾词策略、竞争对手关键词挖掘与关键词优先级排列。',
    tag: 'SEO 基础',
    readTime: '12 分钟',
    content: `
<h2>什么是关键词研究？</h2>
<p>关键词研究（Keyword Research）是 SEO 的核心基础工作，指系统性地发现、分析并筛选出目标用户在搜索引擎中输入的词语或短语，再以此为基础规划内容策略与网站架构的过程。</p>
<p>高质量的关键词研究能够回答三个核心问题：<strong>目标用户在搜索什么？搜索背后的意图是什么？哪些词值得优先投入资源？</strong></p>

<h2>关键词研究的四大核心指标</h2>
<table>
<tr><th>指标</th><th>含义</th><th>建议标准</th></tr>
<tr><td>月均搜索量（MSV）</td><td>每月搜索次数</td><td>根据行业而定，不盲目追高</td></tr>
<tr><td>关键词难度（KD）</td><td>竞争激烈程度，0-100</td><td>新站优先选 KD &lt; 30</td></tr>
<tr><td>搜索意图（Intent）</td><td>用户搜索目的</td><td>与内容类型强匹配</td></tr>
<tr><td>点击潜力（CPC）</td><td>广告主竞价高低</td><td>高CPC = 商业价值高</td></tr>
</table>

<h2>搜索意图的四种类型</h2>
<h3>① 信息型（Informational）</h3>
<p>用户在收集信息，尚未产生购买意向。示例："什么是 SEO"、"SEO 怎么做"。适合创作教程、指南类内容。</p>
<h3>② 导航型（Navigational）</h3>
<p>用户知道自己想去哪，直接搜索品牌或网址。示例："Ahrefs 登录"。此类关键词意义较小，除非是您自己的品牌词。</p>
<h3>③ 商业调研型（Commercial）</h3>
<p>用户在比较选项，接近决策。示例："最佳 SEO 工具推荐"、"SEO 公司排名"。适合对比评测文章。</p>
<h3>④ 交易型（Transactional）</h3>
<p>用户已准备好采取行动。示例："购买 Semrush 订阅"。适合落地页、产品页。</p>

<h2>关键词研究五步法</h2>
<h3>第一步：确定种子关键词</h3>
<p>从您的业务核心出发，列出 10-20 个宽泛核心词，例如："SEO"、"搜索引擎优化"、"内容营销"。这些是关键词挖掘的起点。</p>
<h3>第二步：使用工具扩展</h3>
<p>借助 Ahrefs Keywords Explorer、Google Keyword Planner、Semrush 等工具，基于种子词挖掘大量相关词，获取搜索量与难度数据。</p>
<h3>第三步：分析竞争对手</h3>
<p>输入竞争对手域名，查看他们排名靠前的关键词。这些词通常已被市场验证，是最有价值的切入点。</p>
<h3>第四步：挖掘长尾关键词</h3>
<p>长尾词（Long-tail keywords）搜索量较低但竞争小、转化率高。例如"北京小红书 SEO 服务报价"比"SEO"更容易排名且流量更精准。</p>
<h3>第五步：规划关键词优先级</h3>
<p>综合搜索量、难度与商业价值，将关键词分为：立即布局（低难度高价值）、中期目标（中等难度）、长期挑战（高难度高价值）三个梯队。</p>

<h2>常见关键词研究工具推荐</h2>
<ul>
<li><strong>Ahrefs Keywords Explorer</strong>：数据最全面，适合专业 SEO 从业者</li>
<li><strong>Google Search Console</strong>：免费，直接获取自己网站的排名关键词数据</li>
<li><strong>Semrush</strong>：竞争对手分析功能强大</li>
<li><strong>Google Trends</strong>：了解关键词搜索趋势变化</li>
<li><strong>AnswerThePublic</strong>：挖掘问题类关键词，适合信息型内容</li>
</ul>

<h2>关键词研究的常见误区</h2>
<ul>
<li>❌ 盲目追求高搜索量：忽略了竞争激烈度，新站难以排名</li>
<li>❌ 忽视搜索意图：内容类型与关键词意图不匹配，排名难，跳出率高</li>
<li>❌ 关键词堆砌：一个页面硬塞多个不相关关键词，拉低内容质量</li>
<li>❌ 只做短词：忽略长尾词的精准流量价值</li>
</ul>

<h2>总结</h2>
<p>关键词研究是 SEO 的地基。做好关键词研究，才能确保内容方向正确、资源分配高效。建议每季度更新一次关键词库，结合 Google Search Console 数据持续优化。</p>`,
  },
  {
    slug: 'technical-seo-guide',
    title: '技术SEO完整指南：让搜索引擎高效抓取您的网站',
    desc: '全面解析技术SEO核心要素：网站速度、Core Web Vitals、结构化数据、XML Sitemap、robots.txt与网站架构优化。',
    tag: '技术 SEO',
    readTime: '15 分钟',
    content: `
<h2>什么是技术 SEO？</h2>
<p>技术 SEO（Technical SEO）是指通过优化网站的技术层面，确保搜索引擎爬虫能够高效地<strong>发现、抓取、解析和索引</strong>您的网页内容。它是 SEO 三大支柱之一，另外两个是内容 SEO 和外链建设。</p>
<p>即便您的内容质量再高，如果搜索引擎无法正常抓取和索引，也无法获得排名。技术 SEO 就是解决这一根本问题。</p>

<h2>Core Web Vitals：Google 的体验评分标准</h2>
<table>
<tr><th>指标</th><th>衡量内容</th><th>优良标准</th></tr>
<tr><td>LCP（最大内容绘制）</td><td>主要内容加载速度</td><td>≤ 2.5 秒</td></tr>
<tr><td>INP（交互到下一次绘制）</td><td>页面响应速度</td><td>≤ 200 毫秒</td></tr>
<tr><td>CLS（累积布局偏移）</td><td>视觉稳定性</td><td>≤ 0.1</td></tr>
</table>

<h2>网站速度优化策略</h2>
<h3>图片优化</h3>
<p>图片通常是页面体积最大的元素。建议使用 WebP 格式替代 JPEG/PNG，实现懒加载（Lazy Loading），并指定图片尺寸避免布局偏移。</p>
<h3>启用缓存</h3>
<p>设置浏览器缓存（Browser Caching）和服务端缓存，减少重复请求，显著提升回访用户的加载速度。</p>
<h3>CDN（内容分发网络）</h3>
<p>使用 Cloudflare 等 CDN 将资源分发至离用户最近的服务器节点，降低延迟。</p>
<h3>最小化 CSS/JS</h3>
<p>压缩并合并 CSS 和 JavaScript 文件，移除未使用的代码，减少文件体积。</p>

<h2>网站架构与爬虫优化</h2>
<h3>XML Sitemap</h3>
<p>Sitemap 是告诉搜索引擎您的网站有哪些页面的地图文件。提交至 Google Search Console，确保所有重要页面都能被索引。</p>
<h3>robots.txt</h3>
<p>通过 robots.txt 文件控制哪些页面允许爬虫访问，哪些需要屏蔽（如后台登录页、重复内容页）。但切勿错误屏蔽重要页面。</p>
<h3>网站层级结构</h3>
<p>遵循"3次点击原则"：用户和爬虫从首页出发，最多 3 次点击应能到达任意重要页面。扁平化的网站结构有利于权重传递和爬取效率。</p>
<h3>内链优化</h3>
<p>合理的内部链接体系能帮助爬虫发现新页面，同时将页面权重（PageRank）有效分配至重要落地页。</p>

<h2>结构化数据（Schema Markup）</h2>
<p>结构化数据是用标准化格式（JSON-LD）向搜索引擎提供页面额外信息，帮助触发富媒体搜索结果（Rich Results），如星级评分、FAQ 展开、面包屑导航等。</p>
<ul>
<li><strong>Article Schema</strong>：文章页适用，显示发布时间和作者</li>
<li><strong>FAQ Schema</strong>：常见问题页，可触发 FAQ 富媒体展示</li>
<li><strong>LocalBusiness Schema</strong>：本地商户，显示营业时间和地址</li>
<li><strong>Product Schema</strong>：电商产品页，显示价格和评分</li>
</ul>

<h2>HTTPS 与安全性</h2>
<p>HTTPS 是 Google 的排名因子之一。确保网站使用 SSL 证书，所有 HTTP 流量自动跳转至 HTTPS，避免混合内容（Mixed Content）错误。</p>

<h2>移动端优化（Mobile-First）</h2>
<p>Google 采用移动优先索引（Mobile-First Indexing），以移动端版本内容为排名依据。确保网站在手机端完整显示所有内容，响应式设计是最低标准。</p>

<h2>技术 SEO 常用检测工具</h2>
<ul>
<li><strong>Google Search Console</strong>：官方工具，查看索引状态、核心体验报告</li>
<li><strong>Screaming Frog</strong>：全站爬虫，扫描技术问题</li>
<li><strong>PageSpeed Insights</strong>：Core Web Vitals 检测</li>
<li><strong>Ahrefs Site Audit</strong>：全面技术健康度扫描</li>
</ul>`,
  },
  {
    slug: 'link-building-guide',
    title: '外链建设完整指南：2024年有效的链接获取策略',
    desc: '深度解析白帽外链建设策略：内容营销获取外链、HARO媒体引用、资源页链接、竞争对手链接分析与外链质量评估。',
    tag: '外链建设',
    readTime: '14 分钟',
    content: `
<h2>为什么外链仍然重要？</h2>
<p>外链（Backlinks）——其他网站链接到您网站的超链接——是 Google 算法中权重最高的排名因子之一。Google 将外链视为"票数"，来自权威网站的外链相当于高质量投票，能显著提升您的域名权威度（Domain Authority）和关键词排名。</p>
<p>研究数据显示，排名第一的页面平均拥有的外链数量是排名第10页面的<strong>3.8倍</strong>。外链建设是 SEO 长期竞争力的核心。</p>

<h2>评估外链质量的核心指标</h2>
<table>
<tr><th>指标</th><th>含义</th><th>优先级</th></tr>
<tr><td>域名权威度（DA/DR）</td><td>来源网站的整体权威性</td><td>最高</td></tr>
<tr><td>相关性</td><td>来源网站与您的行业相关度</td><td>最高</td></tr>
<tr><td>链接位置</td><td>正文内 > 侧边栏 > 页脚</td><td>高</td></tr>
<tr><td>锚文本</td><td>链接的可点击文字</td><td>中</td></tr>
<tr><td>Follow/Nofollow</td><td>是否传递权重</td><td>中</td></tr>
</table>

<h2>六大有效外链建设策略</h2>
<h3>① 创作值得被链接的内容（Linkable Assets）</h3>
<p>原创研究报告、行业数据统计、权威指南、免费工具——这类内容天然具有被引用的价值。一篇包含独家数据的行业报告可以在无任何主动推广的情况下自然积累数百条外链。</p>
<h3>② 客座发文（Guest Posting）</h3>
<p>向行业内权威媒体和博客投稿，在文章中自然植入返回您网站的链接。关键是选择真实流量和高权威的平台，而非链接农场。</p>
<h3>③ 破损链接建设（Broken Link Building）</h3>
<p>使用 Ahrefs 等工具找到竞争对手或行业网站上的失效外链，然后联系站长，建议用您的相关内容替代该失效链接。</p>
<h3>④ HARO（Help A Reporter Out）</h3>
<p>注册 HARO 或类似平台，回应记者的专家引用需求。一旦媒体引用您的观点，通常会附上您网站的链接，这些往往是顶级权威媒体的外链。</p>
<h3>⑤ 竞争对手外链反查</h3>
<p>在 Ahrefs 中输入竞争对手网址，查看其所有外链来源。这些网站已经证明愿意链接到您领域的内容，是最精准的外链目标清单。</p>
<h3>⑥ 资源页链接（Resource Pages）</h3>
<p>搜索"[行业关键词] + 资源推荐"或"[行业关键词] + 有用工具"，找到汇总行业工具和资源的页面，联系站长将您的优质内容加入其中。</p>

<h2>外链建设的红线：绝对避免的黑帽手法</h2>
<ul>
<li>❌ 购买外链：违反 Google 指南，面临手动惩罚风险</li>
<li>❌ 链接农场/PBN（私人博客网络）：一旦被识别，全站降权</li>
<li>❌ 大规模互换链接：过度互换会被视为链接图谱操纵</li>
<li>❌ 评论区垃圾外链：毫无权重，且损害品牌形象</li>
</ul>

<h2>外链分析工具推荐</h2>
<ul>
<li><strong>Ahrefs</strong>：最全面的外链数据库，必备工具</li>
<li><strong>Semrush Backlink Analytics</strong>：竞争对手外链分析</li>
<li><strong>Google Search Console</strong>：查看指向您网站的外链</li>
<li><strong>Moz Link Explorer</strong>：DA 指标来源</li>
</ul>`,
  },
  {
    slug: 'on-page-seo-guide',
    title: 'On-Page SEO 完整优化指南：页面内部优化的每一个细节',
    desc: '系统掌握On-Page SEO优化方法：标题标签、Meta描述、H标签结构、内容优化、图片ALT、内链策略与URL架构。',
    tag: 'On-Page SEO',
    readTime: '11 分钟',
    content: `
<h2>什么是 On-Page SEO？</h2>
<p>On-Page SEO（页面内优化）是指通过优化单个网页的内容与 HTML 源代码，提升该页面在搜索引擎结果页面（SERP）中的排名。它区别于 Off-Page SEO（外链建设）和技术 SEO，专注于页面自身可控的优化要素。</p>

<h2>标题标签（Title Tag）优化</h2>
<p>标题标签是最重要的 On-Page SEO 元素之一，直接显示在 Google 搜索结果中作为蓝色可点击链接。</p>
<ul>
<li>长度控制在 <strong>50-60 个字符</strong>以内，避免被截断</li>
<li>核心关键词尽量靠前放置</li>
<li>每个页面使用唯一的标题，不重复</li>
<li>自然可读，不堆砌关键词</li>
</ul>

<h2>Meta 描述优化</h2>
<p>Meta 描述虽然不直接影响排名，但影响点击率（CTR）。一条好的 Meta 描述能让用户在看到搜索结果时产生点击冲动。</p>
<ul>
<li>长度控制在 <strong>150-160 个字符</strong></li>
<li>包含目标关键词（会被加粗显示）</li>
<li>以行动号召结尾（"立即了解"、"查看完整指南"）</li>
</ul>

<h2>H 标签层级结构</h2>
<table>
<tr><th>标签</th><th>用途</th><th>数量建议</th></tr>
<tr><td>H1</td><td>页面主标题，包含核心关键词</td><td>每页仅一个</td></tr>
<tr><td>H2</td><td>主要章节标题</td><td>3-8 个</td></tr>
<tr><td>H3</td><td>子章节标题</td><td>按需使用</td></tr>
</table>

<h2>内容质量优化</h2>
<h3>E-E-A-T 原则</h3>
<p>Google 的内容质量评估框架：<strong>经验（Experience）、专业性（Expertise）、权威性（Authoritativeness）、可信度（Trustworthiness）</strong>。内容需展现实际经验、引用权威来源，作者简介应体现专业背景。</p>
<h3>内容深度与覆盖度</h3>
<p>针对目标关键词，确保内容覆盖用户可能关心的所有子话题。使用"Also Asked"和"People Also Ask"数据发现用户关联问题，构建全面的内容框架。</p>
<h3>语义相关词（LSI Keywords）</h3>
<p>在内容中自然融入与主关键词语义相关的词汇，帮助搜索引擎更好地理解内容主题范围。</p>

<h2>URL 结构优化</h2>
<ul>
<li>使用简洁、描述性的 URL：<code>/seo-keyword-research/</code> 优于 <code>/page?id=123</code></li>
<li>包含目标关键词</li>
<li>使用连字符（-）分隔单词，而非下划线（_）</li>
<li>URL 尽量简短，避免过多层级</li>
</ul>

<h2>图片 ALT 文本优化</h2>
<p>ALT 文本帮助搜索引擎理解图片内容，同时提升可访问性。自然描述图片内容，在合适时融入关键词，但不要强行堆砌。</p>

<h2>内部链接策略</h2>
<p>内部链接将网站各页面连接起来，帮助搜索引擎发现新内容并分配页面权重。在内容中自然地链接到相关页面，使用描述性锚文本（而非"点击这里"）。</p>

<h2>页面加载速度</h2>
<p>页面速度是 Google 的排名因子，同时直接影响用户体验和跳出率。目标是首字节时间（TTFB）低于 200ms，首次内容绘制（FCP）低于 1.8 秒。</p>`,
  },
  {
    slug: 'content-seo-strategy',
    title: '内容SEO策略：如何创作让Google爱上的内容',
    desc: '掌握内容SEO核心方法论：主题权威策略、内容聚类、内容日历规划、常青内容与内容更新的系统化方法。',
    tag: '内容 SEO',
    readTime: '13 分钟',
    content: `
<h2>内容 SEO 的核心逻辑</h2>
<p>内容 SEO 不是单纯地"写文章再期待排名"，而是基于<strong>主题权威（Topical Authority）</strong>构建的系统性内容战略。Google 的目标是向用户提供最权威、最全面的答案来源，因此，成为某个主题领域的权威内容枢纽，是现代内容 SEO 的核心目标。</p>

<h2>主题权威策略（Topical Authority）</h2>
<p>主题权威策略的核心是：与其在众多主题上浅尝辄止，不如在特定垂直领域深耕，全面覆盖该主题的每一个子话题和相关问题。</p>
<h3>支柱页面（Pillar Pages）</h3>
<p>支柱页面是对某个宽泛主题的全面概述性页面，例如"SEO 完整指南"。它链接到所有相关的子话题文章，形成内容枢纽。</p>
<h3>集群内容（Cluster Content）</h3>
<p>集群内容是深入探讨支柱页面中某个具体子话题的文章，例如"关键词研究方法"、"技术 SEO 优化"等。所有集群内容都反向链接至支柱页面，强化整体主题权威。</p>

<h2>内容类型选择</h2>
<table>
<tr><th>内容类型</th><th>适用搜索意图</th><th>SEO价值</th></tr>
<tr><td>How-to 教程</td><td>信息型</td><td>高——常年稳定流量</td></tr>
<tr><td>对比评测</td><td>商业调研型</td><td>高——高转化率</td></tr>
<tr><td>行业报告</td><td>信息型</td><td>极高——天然外链磁铁</td></tr>
<tr><td>工具/模板</td><td>交易/信息型</td><td>极高——持续引用</td></tr>
<tr><td>案例研究</td><td>商业调研型</td><td>中高——建立信任</td></tr>
</table>

<h2>内容日历的规划方法</h2>
<h3>第一步：关键词聚类</h3>
<p>将关键词研究得出的词库按主题进行聚类分组，相似话题合并为同一篇文章，避免关键词蚕食（Keyword Cannibalization）。</p>
<h3>第二步：优先级排序</h3>
<p>以"商业价值 × 流量潜力 ÷ 竞争难度"为维度评分，优先创作高分内容。</p>
<h3>第三步：发布节奏</h3>
<p>一致的发布节奏比偶尔的爆发更重要。建议中小团队每周 1-2 篇，但确保每篇都达到质量标准。</p>

<h2>常青内容（Evergreen Content）策略</h2>
<p>常青内容是不受时间限制、长期有效的内容——例如"什么是 SEO"、"如何写商业计划书"。这类内容是流量的长期资产，创作一次可持续带来流量数年。</p>
<ul>
<li>避免使用"2023年"等年份限定标题（除非内容确实年度更新）</li>
<li>每6-12个月审查并更新常青内容，保持信息准确</li>
<li>聚焦基础概念和方法论，而非热点事件</li>
</ul>

<h2>内容更新策略</h2>
<p>对现有内容进行优化更新，通常比创作新内容更高效。以下页面优先更新：</p>
<ul>
<li>排名在第2页（第11-20位）——距第一页最近，提升空间最大</li>
<li>流量持续下滑的页面——可能因内容过时被算法降权</li>
<li>已有外链但排名不佳——说明内容质量是瓶颈</li>
</ul>`,
  },
  {
    slug: 'seo-tools-guide',
    title: '2024年最值得使用的SEO工具完整推荐（含免费与付费）',
    desc: '全面评测最佳SEO工具：Ahrefs、Semrush、Google Search Console、Screaming Frog等工具的功能对比与使用场景推荐。',
    tag: 'SEO 工具',
    readTime: '10 分钟',
    content: `
<h2>SEO 工具选择指南</h2>
<p>SEO 工具是提升工作效率的关键，但市场上工具琳琅满目，并非每一款都物有所值。本指南按功能类别推荐最值得投资的工具，并区分免费与付费选项。</p>

<h2>综合 SEO 平台（付费）</h2>
<h3>Ahrefs</h3>
<p>全球最受专业 SEO 从业者信赖的综合性工具。核心优势在于其庞大的外链数据库、精准的关键词难度评分和全面的竞争对手分析功能。</p>
<ul>
<li>✅ 外链分析：行业最大数据库，更新频率高</li>
<li>✅ Keywords Explorer：支持全球 171 个国家关键词数据</li>
<li>✅ Site Audit：全面技术 SEO 扫描</li>
<li>✅ Content Gap：竞争对手关键词差距分析</li>
<li>💰 起步价约 $129/月</li>
</ul>
<h3>Semrush</h3>
<p>功能最全面的一体化数字营销平台，覆盖 SEO、PPC、内容营销和社交媒体。</p>
<ul>
<li>✅ 竞争对手流量估算最为准确</li>
<li>✅ 本地 SEO 功能强大</li>
<li>✅ 内容优化工具（SEO Content Template）</li>
<li>💰 起步价约 $139/月</li>
</ul>

<h2>免费必备工具</h2>
<h3>Google Search Console（GSC）</h3>
<p>每位 SEO 从业者的第一必装工具，完全免费。提供您网站在 Google 中的真实表现数据。</p>
<ul>
<li>查看实际排名关键词与点击率</li>
<li>Core Web Vitals 官方检测报告</li>
<li>索引覆盖问题诊断</li>
<li>提交 Sitemap 和检查爬取错误</li>
</ul>
<h3>Google Analytics 4（GA4）</h3>
<p>了解用户行为、流量来源和转化数据，与 GSC 结合使用效果最佳。</p>
<h3>Google PageSpeed Insights</h3>
<p>检测页面 Core Web Vitals 指标，提供具体优化建议，免费且权威。</p>

<h2>技术 SEO 专项工具</h2>
<h3>Screaming Frog SEO Spider</h3>
<p>桌面端爬虫工具，模拟 Googlebot 抓取您的网站，发现断链、重复标题、缺失 meta 等技术问题。免费版支持爬取 500 个 URL，付费版无限制（约 £209/年）。</p>
<h3>GTmetrix</h3>
<p>页面速度检测工具，提供详细的性能瀑布图和优化建议。免费版已能满足大多数需求。</p>

<h2>关键词研究专项工具</h2>
<h3>Google Keyword Planner</h3>
<p>Google 官方关键词规划师，完全免费，数据直接来自 Google。需要 Google Ads 账号，但无需投放广告。</p>
<h3>AnswerThePublic</h3>
<p>可视化展示围绕某个关键词的所有问题类搜索需求，适合挖掘信息型内容选题。免费版每日有查询限制。</p>

<h2>工具选择建议</h2>
<table>
<tr><th>预算</th><th>推荐组合</th></tr>
<tr><td>零预算</td><td>GSC + GA4 + PageSpeed Insights + Screaming Frog（免费版）</td></tr>
<tr><td>中等预算</td><td>以上免费工具 + Ahrefs Starter 或 Semrush Pro</td></tr>
<tr><td>专业团队</td><td>Ahrefs 或 Semrush 完整版 + Screaming Frog 付费版 + 以上免费工具</td></tr>
</table>`,
  },
  {
    slug: 'local-seo-complete-guide',
    title: '本地SEO完整指南：让附近用户精准找到您的业务',
    desc: '深度解析本地SEO策略：Google Business Profile优化、本地引用建设、评论管理、本地关键词研究与地图包排名技巧。',
    tag: '本地 SEO',
    readTime: '12 分钟',
    content: `
<h2>什么是本地 SEO？</h2>
<p>本地 SEO（Local SEO）是针对有地理位置属性的搜索查询（如"附近的咖啡厅"、"吉隆坡 SEO 公司"）进行优化，让您的业务在 Google 地图包（Map Pack）和本地搜索结果中获得高曝光的策略。</p>
<p>数据显示，<strong>46% 的 Google 搜索具有本地意图</strong>，78% 的本地移动搜索会导致线下购买行为。对于实体门店、服务型本地业务，本地 SEO 是 ROI 最高的数字营销投资之一。</p>

<h2>Google 地图包（Map Pack）的排名因素</h2>
<table>
<tr><th>因素类别</th><th>具体要素</th><th>权重</th></tr>
<tr><td>Google Business Profile</td><td>信息完整度、类别、评论</td><td>极高</td></tr>
<tr><td>本地引用</td><td>NAP 信息一致性</td><td>高</td></tr>
<tr><td>评论</td><td>数量、评分、回复频率</td><td>高</td></tr>
<tr><td>距离</td><td>用户与商家的物理距离</td><td>高</td></tr>
<tr><td>本地外链</td><td>本地权威网站链接</td><td>中</td></tr>
</table>

<h2>Google Business Profile（GBP）优化</h2>
<p>GBP（原 Google 我的商家）是本地 SEO 最重要的单一因素。完整优化步骤：</p>
<h3>完善基础信息</h3>
<ul>
<li><strong>NAP 一致性</strong>：名称（Name）、地址（Address）、电话（Phone）在所有平台保持完全一致</li>
<li>选择最精确的主类别（Primary Category），可添加多个副类别</li>
<li>填写完整的营业时间，包括节假日调整</li>
<li>上传高质量实景照片，包括外观、内部、产品和团队</li>
</ul>
<h3>GBP 帖子（Posts）</h3>
<p>定期发布 GBP 帖子——优惠活动、新产品、行业资讯——保持账户活跃度，向 Google 发出"业务活跃"的信号。</p>
<h3>Q&A 管理</h3>
<p>主动在 Q&A 模块预设常见问题并提供答案，防止他人发布不准确信息。</p>

<h2>本地引用建设（Local Citations）</h2>
<p>本地引用是指在各目录网站、行业平台上展示您的 NAP 信息。引用数量越多且信息越一致，本地排名越有利。</p>
<ul>
<li>提交至主要目录：黄页、Yelp、Foursquare、TripAdvisor（视行业）</li>
<li>提交至行业垂直目录：律所提交至律师目录，餐厅提交至美食平台</li>
<li>确保所有引用中的 NAP 信息与 GBP 完全一致，包括地址格式</li>
</ul>

<h2>评论管理策略</h2>
<p>评论数量和评分是地图包排名的重要信号，同时直接影响用户转化。</p>
<h3>获取更多评论</h3>
<ul>
<li>服务完成后主动邀请满意客户留评（发送评论链接）</li>
<li>在收据、名片上印制"Google 评价"二维码</li>
<li>不可购买评论或发布虚假评论，违反 Google 政策</li>
</ul>
<h3>回复评论</h3>
<p>回复所有评论——尤其是负面评论。专业、建设性的回复向潜在客户展示您的服务态度，同时也是 Google 评判活跃度的信号之一。</p>

<h2>本地关键词优化</h2>
<p>本地 SEO 的关键词策略应覆盖：</p>
<ul>
<li>地理修饰词：[城市] + [服务]，例如"吉隆坡 SEO 服务"</li>
<li>邻近区域词：布满克、孟沙等吉隆坡各区域关键词</li>
<li>隐含本地意图词："附近的"、"本地"、"当地"</li>
</ul>`,
  },
  {
    slug: 'seo-mistakes-guide',
    title: '初学者最常犯的12个SEO错误（以及如何避免）',
    desc: '盘点SEO新手最容易踩的坑：关键词堆砌、忽视移动端、重复内容、忽略内链等12个常见SEO错误与纠正方法。',
    tag: 'SEO 避坑',
    readTime: '9 分钟',
    content: `
<h2>为什么了解 SEO 错误如此重要？</h2>
<p>SEO 的进步不仅来自做对了什么，更来自避免了什么。一个严重的技术错误可能抵消数月的内容创作成果，而一个被忽视的关键设置可能让大量流量白白流失。以下是 SEO 新手（甚至中级从业者）最常犯的 12 个错误。</p>

<h2>错误 1：忽视关键词搜索意图</h2>
<p>创作了大量内容，却不了解每个关键词背后的用户意图。例如，为"SEO 是什么"这类信息型查询创作了销售页，用户会立即离开。始终先分析搜索意图，再决定内容类型。</p>

<h2>错误 2：关键词堆砌（Keyword Stuffing）</h2>
<p>将关键词强行重复塞入内容，不仅阅读体验差，还可能触发 Google 的垃圾内容算法惩罚。现代 SEO 注重自然语言和语义覆盖，关键词密度并非越高越好。</p>

<h2>错误 3：忽略 Title Tag 和 Meta 描述</h2>
<p>许多网站使用 CMS 自动生成的标题，错过了关键词和点击率优化机会。每个重要页面都应有手动优化的、包含核心关键词且具有吸引力的标题和描述。</p>

<h2>错误 4：H1 标签使用错误</h2>
<p>每个页面应只有一个 H1，且应包含该页面最重要的目标关键词。常见错误：H1 与 Title Tag 完全相同（浪费机会），或一个页面有多个 H1（结构混乱）。</p>

<h2>错误 5：不重视网站速度</h2>
<p>超过 3 秒的加载时间会导致 53% 的移动用户离开页面。网站速度既影响排名（Google 排名因子），又直接影响转化率。使用 PageSpeed Insights 定期检测并修复。</p>

<h2>错误 6：忽视移动端体验</h2>
<p>Google 采用移动优先索引，以手机版页面决定排名。若您的网站在移动端显示异常、字体过小或按钮难以点击，将直接损害排名。响应式设计是基本要求。</p>

<h2>错误 7：重复内容问题</h2>
<p>相同或高度相似的内容出现在多个 URL，让搜索引擎无法决定应该排名哪个版本，导致权重被稀释。使用 canonical 标签指定规范 URL，或通过 301 重定向合并重复页面。</p>

<h2>错误 8：没有内部链接策略</h2>
<p>许多网站各页面之间"孤岛"式存在，缺乏内部链接。这不仅让爬虫难以发现新内容，也无法通过内链将首页权重传递至重要落地页。建立系统性内链体系。</p>

<h2>错误 9：没有提交 Sitemap</h2>
<p>Sitemap 是告诉 Google 您有哪些重要页面的地图。不提交 Sitemap，新页面可能数周甚至数月才被索引。在 Google Search Console 中提交并定期更新。</p>

<h2>错误 10：图片没有 ALT 文本</h2>
<p>搜索引擎无法直接"看见"图片。缺少 ALT 文本等于放弃了图片搜索流量机会，同时也影响可访问性合规。为每张有意义的图片添加描述性 ALT 文本。</p>

<h2>错误 11：只关注流量，忽视转化</h2>
<p>SEO 的终极目标是业务增长，而非流量数字。高流量低转化的关键词可能远不如低流量高商业意图的精准词有价值。结合业务目标规划关键词策略。</p>

<h2>错误 12：SEO 效果期望过于急切</h2>
<p>SEO 是一项长期投资。新内容通常需要 3-6 个月才能在 Google 中建立排名，外链建设的效果可能需要 6-12 个月体现。不要因为短期没有明显效果就放弃或频繁改变策略。</p>

<h2>总结</h2>
<p>避开这些常见错误，您的 SEO 工作效率将大幅提升。建议定期使用 Screaming Frog 或 Ahrefs Site Audit 做全站健康度扫描，主动发现并修复问题。</p>`,
  },
];

function buildPage(article) {
  return `${HEAD(article.title, article.desc, article.slug)}
${NAV}
<main class="mx-auto max-w-3xl px-4 pt-28 pb-24">
  <div class="mb-8">
    <span class="tag bg-brand-orange/10 text-brand-orange">${article.tag}</span>
    <span class="ml-3 text-xs text-brand-gray">阅读时间：${article.readTime}</span>
  </div>
  <h1 class="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight tracking-tight">${article.title}</h1>
  <p class="mt-4 text-brand-gray text-sm">由 Agency Ahrefs 知识团队整理 · 更新于 2024 年</p>
  <hr class="my-8 border-gray-200"/>
  <div class="prose">${article.content}</div>
  <div class="mt-16 rounded-2xl bg-orange-50 border border-brand-orange/20 px-6 py-10 text-center">
    <h2 class="text-xl font-bold text-brand-navy">探索更多 SEO 知识</h2>
    <p class="mt-2 text-sm text-brand-gray">深入了解 SEO、GEO 与 AEO 的完整知识体系</p>
    <a href="../seo-vs-geo-vs-aeo.html" class="mt-6 inline-block rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white hover:bg-[#e67300]">查看 SEO vs GEO vs AEO 对比</a>
  </div>
</main>
${FOOTER}
</body></html>`;
}

articles.forEach(a => {
  const html = buildPage(a);
  const fp = path.join(OUT, a.slug + '.html');
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Created: ' + a.slug + '.html');
});
console.log(`\nDone. Generated ${articles.length} articles in /articles/`);




