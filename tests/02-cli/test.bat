@echo off

set DIR=%~dp0.

rem :: declare variables "DEEPL_TRANSLATE_API_KEY" and "DEEPL_TRANSLATE_API_URL"
call "%DIR%\..\DEEPL_TRANSLATE_API_CREDENTIALS.bat"

goto :start

:deepl-translate
  call node "%DIR%\..\..\bin\deepl-translate.js" %*
  goto :eof

:start
set output_dir=%DIR%\output
set log_file="%output_dir%\test.log"

if not exist "%output_dir%" mkdir "%output_dir%"
if exist %log_file% del %log_file%

call :deepl-translate -i "en" -o "de" -s "Hello world"            >>%log_file% 2>&1
call :deepl-translate -i "en" -o "de" -s "Welcome to the jungle"  >>%log_file% 2>&1

rem :: test invalid input
call :deepl-translate -i "xx" -o "de" -s "Hello" >>%log_file% 2>&1
call :deepl-translate -i "en" -o "yy" -s "Hello" >>%log_file% 2>&1
