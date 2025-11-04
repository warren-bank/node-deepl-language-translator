const read_cache = require('./cache')

let cached_data      = null
let input_languages  = null
let output_languages = null

// ----------------------------------------------------------------------------- init

const init = async (api_key, api_url) => {
  try {
    cached_data      = await read_cache(api_key, api_url)
    input_languages  = cached_data.source.map(lang => lang.code)
    output_languages = cached_data.target.map(lang => lang.code)
  }
  catch(e) {
    if (e.why) {
      switch(e.why) {
        case 1:
          console.log('API did not respond')
          break
        case 2:
          console.log('API response could not be parsed as JSON:' + "\n" + e.json)
          break
      }
    }
    else {
      console.log(e.message)
    }
    process.exit(1)
  }
}

// ----------------------------------------------------------------------------- getters

const get_input_languages = () => input_languages

const get_output_languages = () => output_languages

// ----------------------------------------------------------------------------- validation

const is_valid_input_language = (input_language) => {
  return input_languages && (input_languages.indexOf(input_language) !== -1)
}

const is_valid_output_language = (output_language) => {
  return output_languages && (output_languages.indexOf(output_language) !== -1)
}

// -----------------------------------------------------------------------------

module.exports = {
  init, // returns a promise: library is ready to use once resolved
  get_input_languages,
  get_output_languages,
  is_valid_input_language,
  is_valid_output_language
}
