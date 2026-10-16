@echo off
rem ---------------------------------------------------------------
rem  Pheasant Couch site - preview server for Windows.
rem  Double-click this file. The site opens at http://localhost:8080
rem  Close this window to stop the server.
rem ---------------------------------------------------------------
cd /d "%~dp0"
set "PY="
where py >nul 2>nul
if not errorlevel 1 set "PY=py -3"
if defined PY goto run
where python >nul 2>nul
if not errorlevel 1 set "PY=python"
if not defined PY goto nopython

:run
%PY% serve.py %*
if errorlevel 1 pause
goto :eof

:nopython
echo.
echo   Python isn't installed on this PC.
echo   Get it free from https://www.python.org/downloads/
echo   During setup, tick "Add python.exe to PATH". Then double-click this file again.
echo.
echo   Or skip the server: double-click site\index.html to view the site directly.
echo.
pause
