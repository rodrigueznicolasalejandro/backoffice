# Script para iniciar todos los microfrontends en terminales separadas
# Ejecutar: .\start-all.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Iniciando todos los servicios" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Abriendo terminales para cada servicio..." -ForegroundColor Yellow
Write-Host ""

$currentPath = Get-Location

# Root Container (puerto 9000)
Write-Host "Iniciando Root Container (puerto 9000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\backoffice-root-container'; npm start"

# Login (puerto 8088)
Write-Host "Iniciando Login (puerto 8088)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-login'; npm start"

# Header (puerto 8087)
Write-Host "Iniciando Header (puerto 8087)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-header'; npm start"

# Menu (puerto 8086)
Write-Host "Iniciando Menu (puerto 8086)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-menu'; npm start"

# Bundle (puerto 3001)
Write-Host "Iniciando Bundle (puerto 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-bundle'; npm start"

# Product (puerto 3003)
Write-Host "Iniciando Product (puerto 3003)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-product'; npm start"

# MCC (puerto 3004)
Write-Host "Iniciando MCC (puerto 3004)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-mcc'; npm start"

# Business Size (puerto 3005)
Write-Host "Iniciando Business Size (puerto 3005)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\mfe\mf-backoffice-business-size'; npm start"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✓ Todos los servicios están iniciando" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "URLs disponibles:" -ForegroundColor Yellow
Write-Host "  Root:    http://localhost:9000" -ForegroundColor White
Write-Host "  Login:   http://localhost:9000/auth" -ForegroundColor White
Write-Host "  Dashboard: http://localhost:9000/bo/inicio" -ForegroundColor White
Write-Host ""
Write-Host "Nota: Asegúrate de que el BFF esté corriendo en el puerto 3000" -ForegroundColor Cyan
