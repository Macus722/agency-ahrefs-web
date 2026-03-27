$files = Get-ChildItem -Path . -Recurse -Include *.html,*.js

foreach ($file in $files) {
    if ($file.Name -match 'update_footer') { continue }
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    $regex = '(?si)<footer.*?</footer>'
    
    $newContent = [regex]::Replace($content, $regex, {
        param($match)
        $footerText = $match.Value
        
        $footerText = $footerText -replace 'bg-brand-navy', 'bg-white border-t border-gray-200'
        $footerText = $footerText -replace '(?<!/)text-white\b', 'text-brand-navy'
        
        $footerText = $footerText -replace 'text-white/60', 'text-brand-navy/70'
        $footerText = $footerText -replace 'text-white/70', 'text-brand-navy/80'
        $footerText = $footerText -replace 'text-white/40', 'text-brand-navy/60'
        
        $footerText = $footerText -replace 'border-white/10', 'border-gray-200'
        $footerText = $footerText -replace 'hover:text-white', 'hover:text-brand-orange'
        
        return $footerText
    })
    
    if ($newContent -cne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated footer in $($file.Name)"
    }
}

Write-Host "Re-generating articles..."
node generate_articles.js
