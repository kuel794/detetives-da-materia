@echo off
cd /d "%~dp0"
node ferramentas\gerar-arquivo-unico.js
echo.
echo O arquivo para enviar esta na pasta "para-enviar".
pause
