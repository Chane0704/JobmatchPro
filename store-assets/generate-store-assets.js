const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname);

// SVG 1: Screenshot 1 - Match Score & Overview (1280x800)
const screenshot1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="1280" height="800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1280" height="800" fill="url(#bgGrad)"/>
  <circle cx="200" cy="150" r="350" fill="#6366F1" opacity="0.08" filter="blur(60px)"/>
  <circle cx="1100" cy="650" r="400" fill="#8B5CF6" opacity="0.08" filter="blur(70px)"/>

  <!-- Top Marketing Headline -->
  <g transform="translate(640, 75)" text-anchor="middle">
    <rect x="-140" y="-28" width="280" height="32" rx="16" fill="#1E293B" stroke="#475569" stroke-width="1"/>
    <text x="0" y="-7" fill="#818CF8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="12" font-weight="700" letter-spacing="1.5">MANIFEST V3 CHROME EXTENSION</text>
    <text x="0" y="42" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="34" font-weight="800" letter-spacing="-0.5">Instant ATS Match Score for Any Job</text>
    <text x="0" y="74" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="16" font-weight="400">Scan LinkedIn, Indeed, and Greenhouse postings in 1 click and compare to your resume.</text>
  </g>

  <!-- Browser Window Mockup -->
  <g transform="translate(140, 195)" filter="url(#cardShadow)">
    <!-- Browser Chrome Frame -->
    <rect width="1000" height="560" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1"/>
    <rect width="1000" height="42" rx="14" fill="#1E293B"/>
    <rect y="32" width="1000" height="10" fill="#1E293B"/>
    <!-- Window Controls -->
    <circle cx="22" cy="21" r="5.5" fill="#EF4444"/>
    <circle cx="38" cy="21" r="5.5" fill="#F59E0B"/>
    <circle cx="54" cy="21" r="5.5" fill="#10B981"/>
    <!-- Search Bar -->
    <rect x="90" y="10" width="460" height="22" rx="6" fill="#0F172A" stroke="#334155"/>
    <text x="105" y="25" fill="#64748B" font-family="monospace" font-size="11">https://www.linkedin.com/jobs/view/senior-software-engineer</text>

    <!-- Background Job Board Page Mock -->
    <g transform="translate(30, 65)">
      <rect width="520" height="460" rx="8" fill="#1E293B" opacity="0.6"/>
      <text x="24" y="38" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="18" font-weight="700">Senior Full Stack Engineer</text>
      <text x="24" y="58" fill="#818CF8" font-family="Segoe UI, Roboto" font-size="13" font-weight="600">CloudScale Systems &bull; San Francisco, CA (Hybrid)</text>
      <line x1="24" y1="75" x2="496" y2="75" stroke="#334155" stroke-width="1"/>
      <rect x="24" y="90" width="470" height="10" rx="4" fill="#334155"/>
      <rect x="24" y="110" width="440" height="10" rx="4" fill="#334155"/>
      <rect x="24" y="130" width="410" height="10" rx="4" fill="#334155"/>
      <text x="24" y="175" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="13" font-weight="700">Requirements &amp; Tech Stack:</text>
      <rect x="24" y="195" width="460" height="10" rx="4" fill="#334155"/>
      <rect x="24" y="215" width="430" height="10" rx="4" fill="#334155"/>
      <rect x="24" y="235" width="450" height="10" rx="4" fill="#334155"/>
      <rect x="24" y="255" width="380" height="10" rx="4" fill="#334155"/>
    </g>

    <!-- Floating Extension UI (Foreground) -->
    <g transform="translate(580, 52)" filter="url(#cardShadow)">
      <!-- Extension Body -->
      <rect width="390" height="490" rx="12" fill="#0F172A" stroke="#6366F1" stroke-width="1.5"/>
      
      <!-- Extension Header -->
      <rect width="390" height="48" rx="12" fill="#1E293B"/>
      <rect y="38" width="390" height="10" fill="#1E293B"/>
      <!-- Icon & Logo -->
      <rect x="14" y="12" width="24" height="24" rx="6" fill="url(#purpleGrad)"/>
      <text x="26" y="29" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="12" font-weight="800" text-anchor="middle">JM</text>
      <text x="46" y="29" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="14" font-weight="700">JobMatch <tspan fill="#6366F1">Pro</tspan></text>
      <!-- PRO Badge -->
      <rect x="310" y="14" width="62" height="20" rx="10" fill="url(#greenGrad)"/>
      <text x="341" y="28" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="9" font-weight="800" text-anchor="middle">PRO ACTIVE</text>

      <!-- Score Card -->
      <g transform="translate(18, 64)">
        <rect width="354" height="100" rx="10" fill="#1E293B" stroke="#334155" stroke-width="1"/>
        <!-- Radial Score Circle -->
        <circle cx="58" cy="50" r="32" fill="none" stroke="#334155" stroke-width="6"/>
        <circle cx="58" cy="50" r="32" fill="none" stroke="#10B981" stroke-width="6" stroke-dasharray="201" stroke-dashoffset="44" stroke-linecap="round" transform="rotate(-90 58 50)"/>
        <text x="58" y="53" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="17" font-weight="800" text-anchor="middle">78%</text>
        <text x="58" y="65" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="7" font-weight="700" text-anchor="middle">MATCH</text>

        <!-- Score Desc -->
        <rect x="110" y="16" width="95" height="18" rx="9" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.4"/>
        <text x="157" y="29" fill="#34D399" font-family="Segoe UI, Roboto" font-size="9.5" font-weight="700" text-anchor="middle">STRONG MATCH</text>
        <text x="110" y="50" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="11" font-weight="400">Matches 11 key requirements.</text>
        <text x="110" y="66" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="11" font-weight="400">Adding 3 missing keywords unlocks</text>
        <text x="110" y="82" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="11" font-weight="400">a 95%+ ATS qualification rate.</text>
      </g>

      <!-- Missing Keywords Section -->
      <g transform="translate(18, 178)">
        <text x="0" y="10" fill="#F87171" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="700" letter-spacing="0.5">MISSING KEYWORDS (ADD TO RESUME)</text>
        <!-- Badges -->
        <g transform="translate(0, 18)">
          <rect x="0" y="0" width="70" height="24" rx="12" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.3"/>
          <text x="35" y="16" fill="#F87171" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">+ Docker</text>

          <rect x="76" y="0" width="92" height="24" rx="12" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.3"/>
          <text x="122" y="16" fill="#F87171" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">+ Kubernetes</text>

          <rect x="174" y="0" width="76" height="24" rx="12" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.3"/>
          <text x="212" y="16" fill="#F87171" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">+ GraphQL</text>

          <rect x="256" y="0" width="80" height="24" rx="12" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.3"/>
          <text x="296" y="16" fill="#F87171" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">+ Terraform</text>
        </g>
      </g>

      <!-- Matched Keywords Section -->
      <g transform="translate(18, 238)">
        <text x="0" y="10" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="700" letter-spacing="0.5">MATCHED KEYWORDS</text>
        <g transform="translate(0, 18)">
          <rect x="0" y="0" width="60" height="24" rx="12" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.3"/>
          <text x="30" y="16" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">✓ React</text>

          <rect x="66" y="0" width="84" height="24" rx="12" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.3"/>
          <text x="108" y="16" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">✓ TypeScript</text>

          <rect x="156" y="0" width="74" height="24" rx="12" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.3"/>
          <text x="193" y="16" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">✓ Node.js</text>

          <rect x="236" y="0" width="56" height="24" rx="12" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.3"/>
          <text x="264" y="16" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">✓ AWS</text>

          <rect x="298" y="0" width="56" height="24" rx="12" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-opacity="0.3"/>
          <text x="326" y="16" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="600" text-anchor="middle">✓ Redis</text>
        </g>
      </g>

      <!-- Tailored Bullets Section -->
      <g transform="translate(18, 298)">
        <text x="0" y="10" fill="#6366F1" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="700" letter-spacing="0.5">SUGGESTED BULLETS (1-CLICK COPY)</text>
        <g transform="translate(0, 18)">
          <rect width="354" height="54" rx="6" fill="#1E293B" stroke="#334155"/>
          <rect width="4" height="54" rx="2" fill="#6366F1"/>
          <text x="12" y="20" fill="#F8FAFC" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="500">Architected automated CI/CD pipelines deploying Docker</text>
          <text x="12" y="36" fill="#F8FAFC" font-family="Segoe UI, Roboto" font-size="10.5" font-weight="500">containers to Kubernetes, slashing release time by 45%.</text>
          <!-- Copy icon -->
          <rect x="326" y="12" width="20" height="20" rx="4" fill="#334155"/>
          <text x="336" y="26" fill="#94A3B8" font-size="10" text-anchor="middle">📋</text>
        </g>
      </g>

      <!-- Bottom Action Button -->
      <g transform="translate(18, 386)">
        <rect width="354" height="38" rx="8" fill="url(#purpleGrad)"/>
        <text x="177" y="24" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="12" font-weight="700" text-anchor="middle">Scan &amp; Match Resume (Unlimited Pro)</text>
      </g>
    </g>
  </g>
</svg>`;

// SVG 2: Promo Tile (440x280) for Chrome Web Store Search Cards
const promoTileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 280" width="440" height="280">
  <defs>
    <linearGradient id="tileBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19"/>
      <stop offset="50%" stop-color="#1E1B4B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#6366F1" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="440" height="280" fill="url(#tileBg)"/>
  <circle cx="220" cy="80" r="140" fill="#6366F1" opacity="0.15" filter="blur(30px)"/>

  <!-- Logo Icon -->
  <g transform="translate(196, 35)" filter="url(#glow)">
    <rect width="48" height="48" rx="12" fill="url(#purpleGrad)"/>
    <text x="24" y="32" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="22" font-weight="800" text-anchor="middle">JM</text>
  </g>

  <!-- Title & Subtitle -->
  <text x="220" y="118" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="24" font-weight="800" text-anchor="middle" letter-spacing="-0.5">JobMatch <tspan fill="#818CF8">Pro</tspan></text>
  <text x="220" y="142" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="13" font-weight="600" text-anchor="middle">ATS Resume &amp; Skill Matcher</text>

  <!-- Pill Badges -->
  <g transform="translate(65, 168)">
    <rect x="0" y="0" width="95" height="24" rx="12" fill="#1E293B" stroke="#334155"/>
    <text x="47" y="16" fill="#34D399" font-family="Segoe UI, Roboto" font-size="10" font-weight="700" text-anchor="middle">✓ LinkedIn Jobs</text>

    <rect x="105" y="0" width="85" height="24" rx="12" fill="#1E293B" stroke="#334155"/>
    <text x="147" y="16" fill="#818CF8" font-family="Segoe UI, Roboto" font-size="10" font-weight="700" text-anchor="middle">✓ Indeed ATS</text>

    <rect x="200" y="0" width="110" height="24" rx="12" fill="#1E293B" stroke="#334155"/>
    <text x="255" y="16" fill="#F87171" font-family="Segoe UI, Roboto" font-size="10" font-weight="700" text-anchor="middle">✓ Missing Keywords</text>
  </g>

  <!-- Bottom Guaranteed Tag -->
  <rect x="110" y="215" width="220" height="32" rx="16" fill="url(#purpleGrad)"/>
  <text x="220" y="235" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="12" font-weight="700" text-anchor="middle">1-Click ATS Optimization</text>
</svg>`;

// SVG 3: Marquee Banner (1400x560) for Featured Placements
const marqueeBannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 560" width="1400" height="560">
  <defs>
    <linearGradient id="marqueeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="40%" stop-color="#1E1B4B"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>

  <rect width="1400" height="560" fill="url(#marqueeBg)"/>
  <circle cx="300" cy="280" r="300" fill="#6366F1" opacity="0.12" filter="blur(60px)"/>
  <circle cx="1100" cy="280" r="280" fill="#10B981" opacity="0.08" filter="blur(70px)"/>

  <!-- Left Value Proposition -->
  <g transform="translate(100, 150)">
    <rect width="180" height="28" rx="14" fill="#1E293B" stroke="#6366F1" stroke-width="1"/>
    <text x="90" y="18" fill="#A5B4FC" font-family="Segoe UI, Roboto" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1">CHROME EXTENSION</text>
    
    <text x="0" y="80" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="44" font-weight="800" letter-spacing="-1">Land More Interviews with</text>
    <text x="0" y="130" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="44" font-weight="800" letter-spacing="-1">Instant <tspan fill="#818CF8">ATS Match Scoring</tspan></text>
    
    <text x="0" y="175" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="18" font-weight="400">Scrape LinkedIn &amp; Indeed jobs. Spot missing keywords. Tailor bullets in seconds.</text>

    <!-- CTAs -->
    <g transform="translate(0, 215)">
      <rect width="210" height="46" rx="23" fill="url(#purpleGrad)"/>
      <text x="105" y="28" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="14" font-weight="700" text-anchor="middle">Add to Chrome — Free</text>
      
      <text x="240" y="28" fill="#34D399" font-family="Segoe UI, Roboto" font-size="14" font-weight="600">✓ 100% Local &amp; Private</text>
    </g>
  </g>

  <!-- Right Visual Mockup -->
  <g transform="translate(860, 80)">
    <rect width="440" height="400" rx="16" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <rect width="440" height="44" rx="16" fill="#0F172A"/>
    <rect y="36" width="440" height="8" fill="#0F172A"/>
    <circle cx="24" cy="22" r="5" fill="#EF4444"/>
    <circle cx="38" cy="22" r="5" fill="#F59E0B"/>
    <circle cx="52" cy="22" r="5" fill="#10B981"/>
    <text x="75" y="27" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="12" font-weight="600">JobMatch Pro Analyzer</text>

    <!-- Score Circle in Card -->
    <g transform="translate(30, 75)">
      <circle cx="60" cy="60" r="48" fill="none" stroke="#334155" stroke-width="8"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="#10B981" stroke-width="8" stroke-dasharray="301" stroke-dashoffset="65" stroke-linecap="round" transform="rotate(-90 60 60)"/>
      <text x="60" y="66" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="26" font-weight="800" text-anchor="middle">82%</text>

      <text x="135" y="42" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="16" font-weight="700">Senior Full Stack Role</text>
      <text x="135" y="64" fill="#34D399" font-family="Segoe UI, Roboto" font-size="12" font-weight="700">✓ EXCELLENT FIT</text>
      <text x="135" y="85" fill="#94A3B8" font-family="Segoe UI, Roboto" font-size="11">14 of 17 requirements matched.</text>
    </g>

    <!-- Missing Keywords Preview -->
    <g transform="translate(30, 215)">
      <text x="0" y="10" fill="#F87171" font-family="Segoe UI, Roboto" font-size="11" font-weight="700">CRITICAL MISSING SKILLS</text>
      <rect x="0" y="22" width="75" height="26" rx="13" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.4"/>
      <text x="37" y="39" fill="#F87171" font-family="Segoe UI, Roboto" font-size="11" font-weight="600" text-anchor="middle">+ Docker</text>

      <rect x="85" y="22" width="100" height="26" rx="13" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.4"/>
      <text x="135" y="39" fill="#F87171" font-family="Segoe UI, Roboto" font-size="11" font-weight="600" text-anchor="middle">+ Kubernetes</text>

      <rect x="195" y="22" width="85" height="26" rx="13" fill="#EF4444" fill-opacity="0.15" stroke="#EF4444" stroke-opacity="0.4"/>
      <text x="237" y="39" fill="#F87171" font-family="Segoe UI, Roboto" font-size="11" font-weight="600" text-anchor="middle">+ Terraform</text>
    </g>

    <!-- Action Bullet -->
    <g transform="translate(30, 290)">
      <rect width="380" height="50" rx="8" fill="#0F172A" stroke="#6366F1"/>
      <text x="14" y="22" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="10.5">Architected containerized microservices using Docker</text>
      <text x="14" y="38" fill="#FFFFFF" font-family="Segoe UI, Roboto" font-size="10.5">and Kubernetes, improving deployment frequency by 60%.</text>
    </g>
  </g>
</svg>`;

// Interactive HTML Previewer with 1-Click Canvas PNG Download
const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JobMatch Pro — Chrome Web Store Assets &amp; PNG Exporter</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0B0F19;
      color: #F8FAFC;
      margin: 0;
      padding: 40px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    h1 { font-size: 32px; margin-bottom: 8px; }
    p { color: #94A3B8; font-size: 16px; margin: 0; }
    .asset-card {
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 40px;
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
    }
    .asset-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .asset-title { font-size: 20px; font-weight: 700; color: #FFFFFF; }
    .asset-dims { font-size: 13px; color: #6366F1; font-weight: 600; background: rgba(99, 102, 241, 0.15); padding: 4px 10px; border-radius: 6px; }
    .btn {
      background: linear-gradient(135deg, #6366F1, #8B5CF6);
      color: #FFFFFF;
      border: none;
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .preview-box {
      background: #0F172A;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #334155;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .preview-box svg { max-width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Chrome Web Store Visual Assets</h1>
    <p>Pre-sized promotional tiles, store screenshots, and 1-click PNG exporters.</p>
  </div>

  <!-- Asset 1: Screenshot 1 (1280x800) -->
  <div class="asset-card">
    <div class="asset-meta">
      <div>
        <div class="asset-title">Store Screenshot 1 — ATS Match Score &amp; Scanner</div>
        <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">Primary Web Store screenshot demonstrating 1-click scanning on LinkedIn Jobs.</div>
      </div>
      <div>
        <span class="asset-dims">1280 x 800 PNG</span>
        <button class="btn" onclick="exportSvgToPng('svg-screenshot1', 'screenshot-1-ats-match-score.png', 1280, 800)">Download PNG</button>
      </div>
    </div>
    <div class="preview-box" id="container-screenshot1">
      ${screenshot1Svg.replace(/viewBox="0 0 1280 800" width="1280" height="800"/, 'id="svg-screenshot1" viewBox="0 0 1280 800"')}
    </div>
  </div>

  <!-- Asset 2: Small Promo Tile (440x280) -->
  <div class="asset-card" style="max-width: 600px;">
    <div class="asset-meta">
      <div>
        <div class="asset-title">Small Promo Tile</div>
        <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">Displayed in Chrome Web Store search results and category rankings.</div>
      </div>
      <div>
        <span class="asset-dims">440 x 280 PNG</span>
        <button class="btn" onclick="exportSvgToPng('svg-promotile', 'promo-tile-440x280.png', 440, 280)">Download PNG</button>
      </div>
    </div>
    <div class="preview-box">
      ${promoTileSvg.replace(/viewBox="0 0 440 280" width="440" height="280"/, 'id="svg-promotile" viewBox="0 0 440 280"')}
    </div>
  </div>

  <!-- Asset 3: Marquee Banner (1400x560) -->
  <div class="asset-card">
    <div class="asset-meta">
      <div>
        <div class="asset-title">Marquee Hero Banner</div>
        <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">Featured on the Chrome Web Store homepage header.</div>
      </div>
      <div>
        <span class="asset-dims">1400 x 560 PNG</span>
        <button class="btn" onclick="exportSvgToPng('svg-marquee', 'marquee-banner-1400x560.png', 1400, 560)">Download PNG</button>
      </div>
    </div>
    <div class="preview-box">
      ${marqueeBannerSvg.replace(/viewBox="0 0 1400 560" width="1400" height="560"/, 'id="svg-marquee" viewBox="0 0 1400 560"')}
    </div>
  </div>

  <canvas id="exportCanvas" style="display: none;"></canvas>

  <script>
    function exportSvgToPng(svgId, filename, width, height) {
      const svgEl = document.getElementById(svgId);
      const svgXml = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.onload = function() {
        const canvas = document.getElementById('exportCanvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.href = pngUrl;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      img.src = url;
    }
  </script>
</body>
</html>`;

// Write files to disk
fs.writeFileSync(path.join(assetsDir, 'screenshot-1.svg'), screenshot1Svg);
fs.writeFileSync(path.join(assetsDir, 'promo-tile-440x280.svg'), promoTileSvg);
fs.writeFileSync(path.join(assetsDir, 'marquee-banner-1400x560.svg'), marqueeBannerSvg);
fs.writeFileSync(path.join(assetsDir, 'preview.html'), previewHtml);

console.log('Store promotional assets generated successfully in store-assets/');
