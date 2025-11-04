#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# declare variables "DEEPL_TRANSLATE_API_KEY" and "DEEPL_TRANSLATE_API_URL"
source "${DIR}/../DEEPL_TRANSLATE_API_CREDENTIALS.sh"

function deepl-translate {
  node "${DIR}/../../bin/deepl-translate.js" "$@"
}

output_dir="${DIR}/output"
log_file="${output_dir}/test.log"

[ ! -d "$output_dir" ] && mkdir "$output_dir"
[ -f "$log_file" ]     && rm    "$log_file"

deepl-translate -i 'en' -o 'de' -s 'Hello world'            >>"$log_file" 2>&1
deepl-translate -i 'en' -o 'de' -s 'Welcome to the jungle'  >>"$log_file" 2>&1

# test invalid input
deepl-translate -i 'xx' -o 'de' -s 'Hello' >>"$log_file" 2>&1
deepl-translate -i 'en' -o 'yy' -s 'Hello' >>"$log_file" 2>&1
