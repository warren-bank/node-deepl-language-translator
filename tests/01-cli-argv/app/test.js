const unresolved_module_key = '../../../bin/deepl-translate/process_argv'
const   resolved_module_key = require.resolve(unresolved_module_key)

const run_test = async (args_string) => {
  try {
    process.argv = ['node', 'test.js', ...args_string.split(' ')]

    delete require.cache[resolved_module_key]
    const argv_vals = require(resolved_module_key)

    // sanitize
    if (argv_vals && argv_vals["--api-key"]) argv_vals["--api-key"] = 'MY_DEEPL_TRANSLATE_API_KEY'

    console.log(args_string)
    console.log(('-').repeat(args_string.length))
    console.log(
      JSON.stringify(argv_vals, null, 2)
    )
    console.log()
  }
  catch(e) {
    console.log(e.message)
    console.log()
  }
}

const run_tests = async () => {
  // hyjack explicit process termination
  process.exit = (code) => {
    throw new Error('Process terminated with exit code: ' + code)
  }

  await run_test('-i en -o de -s Hello')
  await run_test('-i xx -o de -s Hello')  // invalid  input language code
  await run_test('-i en -o yy -s Hello')  // invalid output language code
}

run_tests()
