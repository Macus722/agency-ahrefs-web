<#
  update_perf.ps1
  Mass-updates all HTML files for performance:
    1. Replaces Tailwind CDN script + inline config with local CSS <link>
    2. Removes inline <style> blocks that duplicate shared CSS now in tailwind.min.css
    3. Adds loading="lazy" to below-fold images
    4. Adds fetchpriority="high" to hero images in index.html
    5. Replaces blocking Google Fonts with async preload pattern
    6. Removes duplicate Tailwind CDN tag (index.html)
#>

$root = $PSScriptRoot
$files = Get-ChildItem -Path $root -Recurse -Filter "*.html" |
         Where-Object { $_.FullName -notmatch '\\node_modules\\' }

$updated = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content
    $depth = ($file.DirectoryName.Replace($root, '').Split([IO.Path]::DirectorySeparatorChar) | Where-Object { $_ -ne '' }).Count

    # Build the relative path prefix to /assets/
    $prefix = if ($depth -eq 0) { './assets/' } else { ('../' * $depth) + 'assets/' }
    $cssHref = "${prefix}tailwind.min.css"

    # ── 1. Remove ALL <script src="cdn.tailwindcss.com"> tags (handles duplicates) ──
    $content = $content -replace '<script src="https://cdn\.tailwindcss\.com">\s*</script>\s*', ''

    # ── 2. Remove inline tailwind.config script blocks ──
    $content = $content -replace '\s*<script>\s*tailwind\.config\s*=\s*\{[^<]*?\}\s*;\s*</script>', ''

    # ── 3. Inject <link rel="stylesheet"> if not already present ──
    if ($content -notmatch 'tailwind\.min\.css') {
        $content = $content -replace '(<head[^>]*>)', "`$1`r`n    <link rel=`"stylesheet`" href=`"$cssHref`">"
    }

    # ── 4. Replace blocking Google Fonts link with async preload pattern ──
    $fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
    $fontUrlOutfit = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap'

    # Remove any existing preconnect/font link combos first (to avoid duplication)
    $content = $content -replace '\s*<link rel="preconnect"\s+href="https://fonts\.googleapis\.com"\s*/>\s*', ''
    $content = $content -replace '\s*<link rel="preconnect"\s+href="https://fonts\.gstatic\.com"\s+crossorigin\s*/>\s*', ''
    $content = $content -replace '\s*<link rel="preconnect"\s+href="https://fonts\.googleapis\.com"\s*>\s*', ''
    $content = $content -replace '\s*<link rel="preconnect"\s+href="https://fonts\.gstatic\.com"\s+crossorigin\s*>\s*', ''
    $content = $content -replace '\s*<link href="https://fonts\.googleapis\.com[^"]*" rel="stylesheet"[^>]*/>\s*', ''
    $content = $content -replace '\s*<link href="https://fonts\.googleapis\.com[^"]*" rel="stylesheet"[^>]*>\s*', ''

    $asyncFont = @"

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="$fontUrl" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="$fontUrl"></noscript>
"@

    # Insert before </head>
    if ($content -notmatch 'fonts\.googleapis\.com') {
        $content = $content -replace '</head>', "$asyncFont`r`n  </head>"
    }

    # ── 5. Remove inline <style> blocks whose content is now in tailwind.min.css ──
    #    Only remove style blocks that contain ONLY our utility/animation CSS
    #    (safe: we keep prose styles since they're in input.css now too)
    $content = $content -replace '(?s)\s*<style>\s*html\{font-size:112\.5%;\}.*?</style>', ''
    # Also remove the shorter variant used in article pages
    $content = $content -replace '(?s)\s*<style>body\{font-family[^<]*\.tag\{[^<]*\}</style>', ''
    $content = $content -replace '(?s)\s*<style>html\{font-size:112\.5%;\}[^<]*\.tag\{[^<]*\}</style>', ''

    # ── 6. Add loading="lazy" to images (skip if already has loading attribute) ──
    # Match <img ...> without a loading= attribute already set
    $content = $content -replace '(<img\b(?![^>]*\bloading=)[^>]*)(/>|>)', '$1 loading="lazy"$2'

    # ── 7. Fix hero image in index.html: eager + fetchpriority=high ──
    if ($file.Name -eq 'index.html') {
        # The hero image — hero_bg_custom.jpg
        $content = $content -replace '(src="assets/hero_bg_custom\.jpg"[^>]*?) loading="lazy"', '$1 loading="eager" fetchpriority="high"'
        # Also fix logo to not be lazy (it's always above fold)
        $content = $content -replace '(alt="Agency Ahrefs SEO Authority Logo"[^>]*?) loading="lazy"', '$1 loading="eager"'
    }

    # ── 8. Fix logos on all pages (header + footer logos are always visible) ──
    $content = $content -replace '(alt="Agency Ahrefs SEO Authority Logo"[^>]*?) loading="lazy"', '$1 loading="eager"'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updated++
        Write-Host "Updated: $($file.FullName.Replace($root, '.'))"
    }
}

Write-Host ""
Write-Host "Done. Updated $updated / $($files.Count) HTML files."
