# PowerShell script to fix .env file
# Run this if your password is Ayush@123 (with @ symbol)

$envPath = ".env"
$content = Get-Content $envPath -Raw

# Replace the MONGODB_URI line
$newURI = "MONGODB_URI=mongodb+srv://ayush:Ayush%40123@cluster0.93zng3t.mongodb.net/career_guidance?appName=Cluster0"

# Replace the line
$content = $content -replace 'MONGODB_URI=.*', $newURI

# Save the file
$content | Set-Content $envPath -NoNewline

Write-Host "✅ .env file updated!"
Write-Host "Password encoded: Ayush@123 → Ayush%40123"
Write-Host ""
Write-Host "⚠️  IMPORTANT: Still need to fix Network Access in MongoDB Atlas!"
Write-Host "   1. Go to MongoDB Atlas → Network Access"
Write-Host "   2. Click 'Add IP Address' → 'Allow Access from Anywhere'"
Write-Host "   3. Wait 1-2 minutes, then try npm start again"
