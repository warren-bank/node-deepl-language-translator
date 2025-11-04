const {get_options, request} = require('./request')
const supported_languages    = require('./supported-languages')
const {DuplicatesStore}      = require('../optimize-duplicates')

const api_endpoint = '/translate'

const translate = async (api_key, api_url, input_language_code, output_language_code, input_strings_array, optimize_duplicates = false) => {
  await supported_languages.init(api_key, api_url)

  // normalize language codes to uppercase
  input_language_code  = input_language_code.toUpperCase()
  output_language_code = output_language_code.toUpperCase()

  // short-circuit when no translation is necessary
  if (input_language_code === output_language_code) {
    return [...input_strings_array]
  }

  // validate language codes
  if (!supported_languages.is_valid_input_language(input_language_code)) {
    throw new Error(
      'ERROR: Input language is not valid.' + "\n" +
      `You entered: "${input_language_code}"` + "\n" +
      'Valid options: ' + JSON.stringify(supported_languages.get_input_languages(), null, 2)
    )
  }
  if (!supported_languages.is_valid_output_language(output_language_code)) {
    throw new Error(
      'ERROR: Output language is not valid.' + "\n" +
      `You entered: "${output_language_code}"` + "\n" +
      'Valid options: ' + JSON.stringify(supported_languages.get_output_languages(), null, 2)
    )
  }

  let duplicates_store, api_input_strings_array
  if (optimize_duplicates) {
    duplicates_store        = new DuplicatesStore(input_strings_array)
    api_input_strings_array = duplicates_store.dehydrate_input_strings_array()
  }
  else {
    api_input_strings_array = input_strings_array
  }

  const postBody = {"text": api_input_strings_array, "source_lang": input_language_code, "target_lang": output_language_code, "model_type": "prefer_quality_optimized", "split_sentences": "0", "preserve_formatting": true, "formality": "default", "show_billed_characters": true}
  const options  = get_options(api_key, api_url, api_endpoint, postBody)
  const response = await request(options, postBody)

  if (
       (response instanceof Object)
    && (response !== null)
    && Array.isArray(response.translations)
    && (response.translations.length === api_input_strings_array.length)
  ) {
    const api_output_strings_array = response.translations.map(obj => obj.text)

    const output_strings_array = optimize_duplicates
      ? duplicates_store.rehydrate_translated_strings_array(api_output_strings_array)
      : api_output_strings_array

    if (output_strings_array.length === input_strings_array.length) {
      return output_strings_array
    }
    else {
      throw new Error(
        'ERROR: Optimizations to process duplicate strings have failed.' + "\n" +
        'The server did return the correct number of distinct string translations.' + "\n" +
        'The library failed to denormalize duplicates.' + "\n\n" +
        'Distinct translations from server:' + "\n" +
        JSON.stringify(api_output_strings_array, null, 2) + "\n\n" +
        'Denormalized translations from library:' + "\n" +
        JSON.stringify(output_strings_array, null, 2)
      )
    }
  }
  else {
    throw new Error(
      'ERROR: DeepL service API returned an incorrect number of string translations.' + "\n\n" +
      'Full response:' + "\n" +
      JSON.stringify(response, null, 2)
    )
  }
}

module.exports = translate
