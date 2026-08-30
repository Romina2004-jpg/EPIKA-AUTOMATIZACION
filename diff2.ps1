$dir1 = "C:\Users\URIEL\Downloads\epica-orginal\epica"
$dir2 = "C:\Users\URIEL\Downloads\epica"

$exclude = @("node_modules", ".git", "dist", ".vscode")

$files2 = Get-ChildItem -Path $dir2 -Recurse -File | Where-Object { 
  $keep = $true
  foreach ($ex in $exclude) { if ($_.FullName -match "\\$ex\\") { $keep = $false; break } }
  $keep
}

$diffList = @()

foreach ($f2 in $files2) {
    $relPath = $f2.FullName.Substring($dir2.Length + 1)
    $f1Path = Join-Path $dir1 $relPath
    
    if (!(Test-Path $f1Path)) {
        $diffList += [pscustomobject]@{ File = $relPath; Status = "NEW" }
    } else {
        $hash1 = (Get-FileHash $f1Path).Hash
        $hash2 = (Get-FileHash $f2.FullName).Hash
        if ($hash1 -ne $hash2) {
            $diffList += [pscustomobject]@{ File = $relPath; Status = "MODIFIED" }
        }
    }
}

$files1 = Get-ChildItem -Path $dir1 -Recurse -File | Where-Object { 
  $keep = $true
  foreach ($ex in $exclude) { if ($_.FullName -match "\\$ex\\") { $keep = $false; break } }
  $keep
}

foreach ($f1 in $files1) {
    $relPath = $f1.FullName.Substring($dir1.Length + 1)
    $f2Path = Join-Path $dir2 $relPath
    if (!(Test-Path $f2Path)) {
        $diffList += [pscustomobject]@{ File = $relPath; Status = "DELETED" }
    }
}

$diffList | Format-Table -AutoSize
