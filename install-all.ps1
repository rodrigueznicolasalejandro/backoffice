# Script para instalar dependencias en todos los proyectos
# Ejecutar: .\install-all.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Instalando dependencias del backoffice" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Root Container
Write-Host "1/7 - Instalando Root Container..." -ForegroundColor Yellow
Set-Location "backoffice-root-container"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Root Container" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Login
Write-Host "2/7 - Instalando Login..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-login"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Login" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

# Header
Write-Host "3/7 - Instalando Header..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-header"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Header" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

# Menu
Write-Host "4/7 - Instalando Menu..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-menu"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Menu" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

# Bundle
Write-Host "5/7 - Instalando Bundle..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-bundle"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Bundle" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

# Product
Write-Host "6/8 - Instalando Product..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-product"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Product" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

# MCC
Write-Host "7/8 - Instalando MCC..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-mcc"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando MCC" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

# Business Size
Write-Host "8/8 - Instalando Business Size..." -ForegroundColor Yellow
Set-Location "mfe\mf-backoffice-business-size"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error instalando Business Size" -ForegroundColor Red
    exit 1
}
Set-Location ..\..

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "✓ Instalación completada exitosamente" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar todos los servicios, ejecutar:" -ForegroundColor Cyan
Write-Host ".\start-all.ps1" -ForegroundColor Yellow
