const fs = require('fs');
const filePath = 'c:/Users/desmo/Herd/landing_page/data/agencies_data.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Strip out constant variable declaration to parse raw JSON
let jsonStr = content.replace('const agencyData = ', '').replace(/;$/, '').trim();
let data = JSON.parse(jsonStr);

// Inject faqs payload
data.forEach(agency => {
    if (agency.id === 'brandthirty') {
        agency.faqs = [
            { q: "BrandThirty 的核心优势是什么？", a: "我们的核心在于企业级搜索架构和全球化的数据增长策略，能够为大型品牌提供绝对的流量垄断优势。" },
            { q: "BrandThirty 覆盖市面上的哪些行业？", a: "答：BrandThirty 几乎覆盖完市面上的所有行业。对于科技、电子商务、金融等领域，更是拥有极其庞大的操作经验和客户案例。" },
            { q: "与 BrandThirty 合作通常需要怎样的预算和规模？", a: "我们主要服务中大型企业和集团客户。由于涉及底层架构改造，起步门槛约为 $5,000，推荐 6-12 个月的全案周期以实现最佳自然搜索红利。" }
        ];
    } else if (agency.id === 'alphafin-media') {
        agency.faqs = [
            { q: "AlphaFin Media 相比传统外链公司有什么区别？", a: "我们专注于真正高权威的数字公关 (Digital PR)，不仅建立自然排名，更让您的 B2B SaaS 或金融科技品牌获得顶级主流媒体的背书认可。" },
            { q: "AlphaFin 的服务重心在哪些国家或地区？", a: "我们的业务和媒体渠道高度聚焦于英语内容市场，特别是英国、美国和德国的国际主干市场。" },
            { q: "常年顾问服务包含哪些内容？", a: "作为长期顾问，我们将负责从数字公关战役策划、B2B SEO 策略指导到高质链路建设的全面增长路径规划。" }
        ];
    } else if (agency.id === 'prism-media-hub') {
        agency.faqs = [
            { q: "什么是 AEO (答案引擎优化) 以及为什么重要？", "a": "AEO 旨在优化品牌内容结构，使您的产品和服务能够被 ChatGPT、Perplexity 以及 Google 人工智能概览 (SGE) 直接首推并引用为权威答案。" },
            { q: "Prism Media Hub 适用什么类型的企业？", "a": "只要您的受众依赖于搜索发现（如科技产品、数字生活方式），并且希望在生成式 AI 的红海中实现弯道超车，我们 3-6 个月的专项顾问服务就非常适合您。" },
            { q: "你们主要支持哪些语言的 AI 化优化？", "a": "我们熟练掌握英语、马来语及中文的语料逻辑，可同时在多语种的本地与国际搜索引擎环境执行策略。" }
        ];
    } else if (agency.id === 'onely') {
        agency.faqs = [
            { q: "Onely 为什么被视作技术 SEO 的圣地？", a: "当您的站点因为极度复杂的 JavaScript 框架（如 React/Angular）而难以被 Google 完美抓取时，我们的深度工程审计是市场的最后一道防线。" },
            { q: "技术审计一般需要多长周期？", a: "对于百万级以上页面的大型跨国集团电商或出版商平台，我们的年度深度咨询会确保所有爬虫预算（Crawl Budget）得到最高效的利用。" },
            { q: "Onely 能否解决核心网页指标 (Core Web Vitals) 不达标的问题？", a: "绝对可以。从渲染逻辑到底层代码优化，彻底根治技术瓶颈是我们唯一专注的重心。" }
        ];
    } else {
        // Fallback robust custom FAQs derived from their data objects
        agency.faqs = [
            { q: `${agency.name} 提供哪些核心营销服务？`, a: `我们的主要发力点集中在 ${agency.services.join('、')}，秉承数据驱动的理念用最专业的手法赋能客户。` },
            { q: `${agency.name} 主要覆盖了哪些行业板块？`, a: `我们在 ${agency.industries.join('、')} 领域均有深厚的实战经历，尤其擅长处理对应行业的复杂数字营销转化需求。` },
            { q: `与 ${agency.name} 合作的服务周期与切入体量？`, a: `我们主要服务 ${agency.clientSize.join('和')}，标准切入预算为 ${agency.budget}。我们的典型合作期为：${agency.duration}。` }
        ];
    }
});

let output = 'const agencyData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf-8');
console.log('Successfully updated agencies_data.js with unique faqs arrays!');
