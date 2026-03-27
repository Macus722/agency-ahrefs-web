<#
  fix_duplicate_css.ps1
  Removes any duplicate <link rel="stylesheet" href="...tailwind.min.css"> tags
  that were incorrectly injected inside <header> body elements.
  Keeps only the FIRST occurrence per file.
#>
$root  = $PSScriptRoot
$files = Get-ChildItem -Path $root -Recurse -Filter '*.html' |
         Where-Object { $_.FullName -notmatch '\\node_modules\\' }
$pattern = '<link rel="stylesheet" href="[^"]*tailwind\.min\.css">'
$fixed = 0
foreach ($f in $files) {
    $c    = Get-Content $f.FullName -Raw -Encoding UTF8
    $orig = $c
    $matches = [regex]::Matches($c, $pattern)
    if ($matches.Count -gt 1) {
        # Walk backwards so indices stay valid after removal
        for ($i = $matches.Count - 1; $i -ge 1; $i--) {
            $m = $matches[$i]
            $c = $c.Remove($m.Index, $m.Length)
        }
    }
    if ($c -ne $orig) {
        Set-Content $f.FullName -Value $c -Encoding UTF8 -NoNewline
        $fixed++
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "Done. Fixed $fixed / $($files.Count) files."
