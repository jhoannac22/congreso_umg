# Script para arreglar npm y recompilar assets

Write-Host "=== Arreglando npm y compilando assets ===" -ForegroundColor Green

# 1. Limpiar cache de npm
Write-Host "`n1. Limpiando cache de npm..." -ForegroundColor Yellow
npm cache verify

# 2. Verificar si existe package-lock.json
if (Test-Path "package-lock.json") {
    Write-Host "`n2. Removiendo package-lock.json..." -ForegroundColor Yellow
    Remove-Item "package-lock.json" -Force
}

# 3. Verificar si existe node_modules
if (Test-Path "node_modules") {
    Write-Host "`n3. Removiendo node_modules..." -ForegroundColor Yellow
    Remove-Item "node_modules" -Recurse -Force
}

# 4. Instalar dependencias
Write-Host "`n4. Instalando dependencias..." -ForegroundColor Yellow
npm install --force

# 5. Compilar assets
Write-Host "`n5. Compilando assets..." -ForegroundColor Yellow
npm run build

Write-Host "`n=== Proceso completado ===" -ForegroundColor Green
Write-Host "Ahora recarga tu navegador con Ctrl+Shift+R" -ForegroundColor Cyan

