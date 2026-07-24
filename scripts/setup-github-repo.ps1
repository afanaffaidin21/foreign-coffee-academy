# Setup GitHub Repository & Import Milestones/Issues
#
# Execution:
#   .\scripts\setup-github-repo.ps1

Write-Host "🔐 Step 1: Checking GitHub CLI Authentication..." -ForegroundColor Cyan
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ GitHub CLI token is invalid or expired." -ForegroundColor Yellow
    Write-Host "Please re-authenticate by running: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "🚀 Step 2: Creating GitHub repository 'afanaffaidin21/foreign-coffee-academy'..." -ForegroundColor Cyan
gh repo create foreign-coffee-academy --public --source=. --remote=origin --push

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Failed to create or push repository via gh CLI. Attempting standard git push..." -ForegroundColor Yellow
    git push -u origin main
}

Write-Host "📌 Step 3: Generating Milestones and 56 GitHub Issues..." -ForegroundColor Cyan
node scripts/create-github-issues.js

Write-Host "🎉 Setup complete! All code pushed and issues created." -ForegroundColor Green
