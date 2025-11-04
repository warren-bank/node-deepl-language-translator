@echo off

set api_creds_bat="%~dp0..\..\..\tests\DEEPL_TRANSLATE_API_CREDENTIALS.bat"
if not exist %api_creds_bat% (
  echo DEEPL_TRANSLATE_API_CREDENTIALS.bat not found
  exit \b 1
)
call %api_creds_bat%
if not defined DEEPL_TRANSLATE_API_KEY (
  echo DEEPL_TRANSLATE_API_KEY not defined
  exit \b 2
)

set output_path="%~dp0.\supported-languages.md"

call node "%~dpn0.js" >%output_path% 2>&1
