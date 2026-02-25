### [deepl-language-translator](https://github.com/warren-bank/node-deepl-language-translator)

Unofficial Node.js client library and CLI for a subset of the [DeepL&trade; service API](https://developers.deepl.com/api-reference).

#### Installation:

```bash
npm install @warren-bank/deepl-language-translator
```

- - - - -

#### Library API:

* translate(api_key, api_url, input_language_code, output_language_code, input_strings_array, optimize_duplicates)
  - input parameters:
    * api_key
      - type: string
      - unique to a [DeepL account](.etc/docs/DeepL-account.md)
    * api_url
      - type: string | `null`
      - default: `null`
        * uses _api_key_ to determine the correct API host
    * input_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-input-languages)
    * output_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-output-languages)
    * input_strings_array
      - type: array of strings
      - each string will be translated from `input_language_code` to `output_language_code`
      - the order of strings is preserved in the resolved return value
    * optimize_duplicates
      - type: boolean
      - default: false
      - when true:
        * duplicate strings are removed from the request to the translation service
        * translations for duplicate input strings are positionally inserted into the response from the translation service
          - the resolved value is identical to that of a non-optimized request
          - the benefit is that the translation service performs less work
  - return value:
    * Promise that resolves to an array of translated strings in the same order as the input array

#### [Supported Input Languages](https://developers.deepl.com/docs/getting-started/supported-languages#translation-source-languages)

* a real-time JSON array of supported language objects is returned from the [API](https://developers.deepl.com/api-reference/languages) endpoint: `/languages?type=source`
* the following table summarizes this response: <small>(last updated on 02/25/2026)</small>

| code | name               |
|------|--------------------|
| "AF" | Afrikaans          |
| "SQ" | Albanian           |
| "AR" | Arabic             |
| "AN" | Aragonese          |
| "HY" | Armenian           |
| "AS" | Assamese           |
| "AY" | Aymara             |
| "AZ" | Azerbaijani        |
| "BA" | Bashkir            |
| "EU" | Basque             |
| "BE" | Belarusian         |
| "BN" | Bengali            |
| "BS" | Bosnian            |
| "BR" | Breton             |
| "BG" | Bulgarian          |
| "MY" | Burmese            |
| "CA" | Catalan            |
| "ZH" | Chinese            |
| "HR" | Croatian           |
| "CS" | Czech              |
| "DA" | Danish             |
| "NL" | Dutch              |
| "EN" | English            |
| "EO" | Esperanto          |
| "ET" | Estonian           |
| "FI" | Finnish            |
| "FR" | French             |
| "GL" | Galician           |
| "KA" | Georgian           |
| "DE" | German             |
| "EL" | Greek              |
| "GN" | Guarani            |
| "GU" | Gujarati           |
| "HT" | Haitian Creole     |
| "HA" | Hausa              |
| "HE" | Hebrew             |
| "HI" | Hindi              |
| "HU" | Hungarian          |
| "IS" | Icelandic          |
| "IG" | Igbo               |
| "ID" | Indonesian         |
| "GA" | Irish              |
| "IT" | Italian            |
| "JA" | Japanese           |
| "JV" | Javanese           |
| "KK" | Kazakh             |
| "KO" | Korean             |
| "KY" | Kyrgyz             |
| "LA" | Latin              |
| "LV" | Latvian            |
| "LN" | Lingala            |
| "LT" | Lithuanian         |
| "LB" | Luxembourgish      |
| "MK" | Macedonian         |
| "MG" | Malagasy           |
| "MS" | Malay              |
| "ML" | Malayalam          |
| "MT" | Maltese            |
| "MI" | Maori              |
| "MR" | Marathi            |
| "MN" | Mongolian          |
| "NE" | Nepali             |
| "NB" | Norwegian (bokmål) |
| "OC" | Occitan            |
| "OM" | Oromo              |
| "PS" | Pashto             |
| "FA" | Persian            |
| "PL" | Polish             |
| "PT" | Portuguese         |
| "PA" | Punjabi            |
| "QU" | Quechua            |
| "RO" | Romanian           |
| "RU" | Russian            |
| "SA" | Sanskrit           |
| "SR" | Serbian            |
| "ST" | Sesotho            |
| "SK" | Slovak             |
| "SL" | Slovenian          |
| "ES" | Spanish            |
| "SU" | Sundanese          |
| "SW" | Swahili            |
| "SV" | Swedish            |
| "TL" | Tagalog            |
| "TG" | Tajik              |
| "TA" | Tamil              |
| "TT" | Tatar              |
| "TE" | Telugu             |
| "TH" | Thai               |
| "TS" | Tsonga             |
| "TN" | Tswana             |
| "TR" | Turkish            |
| "TK" | Turkmen            |
| "UK" | Ukrainian          |
| "UR" | Urdu               |
| "UZ" | Uzbek              |
| "VI" | Vietnamese         |
| "CY" | Welsh              |
| "WO" | Wolof              |
| "XH" | Xhosa              |
| "YI" | Yiddish            |
| "ZU" | Zulu               |

#### [Supported Output Languages](https://developers.deepl.com/docs/getting-started/supported-languages#translation-target-languages)

* a real-time JSON array of supported language objects is returned from the [API](https://developers.deepl.com/api-reference/languages) endpoint: `/languages?type=target`
* the following table summarizes this response: <small>(last updated on 02/25/2026)</small>

| code      | name                     |
|-----------|--------------------------|
| "AF"      | Afrikaans                |
| "SQ"      | Albanian                 |
| "AR"      | Arabic                   |
| "AN"      | Aragonese                |
| "HY"      | Armenian                 |
| "AS"      | Assamese                 |
| "AY"      | Aymara                   |
| "AZ"      | Azerbaijani              |
| "BA"      | Bashkir                  |
| "EU"      | Basque                   |
| "BE"      | Belarusian               |
| "BN"      | Bengali                  |
| "BS"      | Bosnian                  |
| "BR"      | Breton                   |
| "BG"      | Bulgarian                |
| "MY"      | Burmese                  |
| "CA"      | Catalan                  |
| "ZH"      | Chinese (simplified)     |
| "ZH-HANS" | Chinese (simplified)     |
| "ZH-HANT" | Chinese (traditional)    |
| "HR"      | Croatian                 |
| "CS"      | Czech                    |
| "DA"      | Danish                   |
| "NL"      | Dutch                    |
| "EN-US"   | English (American)       |
| "EN-GB"   | English (British)        |
| "EO"      | Esperanto                |
| "ET"      | Estonian                 |
| "FI"      | Finnish                  |
| "FR"      | French                   |
| "GL"      | Galician                 |
| "KA"      | Georgian                 |
| "DE"      | German                   |
| "EL"      | Greek                    |
| "GN"      | Guarani                  |
| "GU"      | Gujarati                 |
| "HT"      | Haitian Creole           |
| "HA"      | Hausa                    |
| "HE"      | Hebrew                   |
| "HI"      | Hindi                    |
| "HU"      | Hungarian                |
| "IS"      | Icelandic                |
| "IG"      | Igbo                     |
| "ID"      | Indonesian               |
| "GA"      | Irish                    |
| "IT"      | Italian                  |
| "JA"      | Japanese                 |
| "JV"      | Javanese                 |
| "KK"      | Kazakh                   |
| "KO"      | Korean                   |
| "KY"      | Kyrgyz                   |
| "LA"      | Latin                    |
| "LV"      | Latvian                  |
| "LN"      | Lingala                  |
| "LT"      | Lithuanian               |
| "LB"      | Luxembourgish            |
| "MK"      | Macedonian               |
| "MG"      | Malagasy                 |
| "MS"      | Malay                    |
| "ML"      | Malayalam                |
| "MT"      | Maltese                  |
| "MI"      | Maori                    |
| "MR"      | Marathi                  |
| "MN"      | Mongolian                |
| "NE"      | Nepali                   |
| "NB"      | Norwegian (bokmål)       |
| "OC"      | Occitan                  |
| "OM"      | Oromo                    |
| "PS"      | Pashto                   |
| "FA"      | Persian                  |
| "PL"      | Polish                   |
| "PT-BR"   | Portuguese (Brazilian)   |
| "PT-PT"   | Portuguese (European)    |
| "PA"      | Punjabi                  |
| "QU"      | Quechua                  |
| "RO"      | Romanian                 |
| "RU"      | Russian                  |
| "SA"      | Sanskrit                 |
| "SR"      | Serbian                  |
| "ST"      | Sesotho                  |
| "SK"      | Slovak                   |
| "SL"      | Slovenian                |
| "ES"      | Spanish                  |
| "ES-419"  | Spanish (Latin American) |
| "SU"      | Sundanese                |
| "SW"      | Swahili                  |
| "SV"      | Swedish                  |
| "TL"      | Tagalog                  |
| "TG"      | Tajik                    |
| "TA"      | Tamil                    |
| "TT"      | Tatar                    |
| "TE"      | Telugu                   |
| "TH"      | Thai                     |
| "TS"      | Tsonga                   |
| "TN"      | Tswana                   |
| "TR"      | Turkish                  |
| "TK"      | Turkmen                  |
| "UK"      | Ukrainian                |
| "UR"      | Urdu                     |
| "UZ"      | Uzbek                    |
| "VI"      | Vietnamese               |
| "CY"      | Welsh                    |
| "WO"      | Wolof                    |
| "XH"      | Xhosa                    |
| "YI"      | Yiddish                  |
| "ZU"      | Zulu                     |

#### Library Examples:

* implicit optimization of duplicate input strings

```javascript
const {translate} = require('@warren-bank/deepl-language-translator')

{
  const api_key              = 'MY_DEEPL_TRANSLATE_API_KEY'
  const api_url              = null
  const input_language_code  = 'en'
  const output_language_code = 'de'
  const input_strings_array  = ['Hello world', 'Welcome to the jungle', 'Hello world', 'Welcome to the jungle']
  const optimize_duplicates  = true

  const translated_strings_array = await translate(api_key, api_url, input_language_code, output_language_code, input_strings_array, optimize_duplicates)

  console.log(output_language_code)
  console.log(JSON.stringify(translated_strings_array, null, 2))
}
```

* explicit optimization of duplicate input strings

```javascript
const {translate}       = require('@warren-bank/deepl-language-translator')
const {DuplicatesStore} = require('@warren-bank/deepl-language-translator/lib/optimize-duplicates')

{
  const api_key              = 'MY_DEEPL_TRANSLATE_API_KEY'
  const api_url              = null
  const input_language_code = 'en'
  const input_strings_array = ['Hello world', 'Welcome to the jungle', 'Hello world', 'Welcome to the jungle']
  const optimize_duplicates = false

  const duplicates_store            = new DuplicatesStore(input_strings_array)
  const deduped_input_strings_array = duplicates_store.dehydrate_input_strings_array()
  const output_languages            = ['de', 'es', 'fr']

  for (const output_language_code of output_languages) {
    const deduped_translated_strings_array = await translate(
      api_key, api_url, input_language_code, output_language_code, deduped_input_strings_array, optimize_duplicates
    )
    const translated_strings_array = duplicates_store.rehydrate_translated_strings_array(deduped_translated_strings_array)

    console.log(output_language_code)
    console.log(JSON.stringify(translated_strings_array, null, 2))
  }
}
```

- - - - -

#### CLI Usage:

```bash
deepl-translate <options>

options:
========
"-h"
"--help"
    Print a help message describing all command-line options.

"-v"
"--version"
    Display the version.

"-k" <key>
"--api-key" <key>
    [optional] DeepL service API key.
    Fallback: Value of the "DEEPL_TRANSLATE_API_KEY" environment variable, if one exists.

"-u" <url>
"--api-url" <url>
    [optional] DeepL service API URL.
    Fallback: Value of the "DEEPL_TRANSLATE_API_URL" environment variable, if one exists.
    Default for free accounts: "https://api-free.deepl.com/v2"
    Default for paid accounts: "https://api.deepl.com/v2"

"-i" <language>
"--input-language" <language>
    [required] Language code for input string.

"-o" <language>
"--output-language" <language>
    [required] Language code for translated output string, written to stdout.

"-s" <text>
"--input-string" <text>
    [required] Input string to be translated.
```

#### CLI Example:

```bash
source ~/DEEPL_TRANSLATE_API_CREDENTIALS.sh

deepl-translate -i 'en' -o 'de' -s 'Hello world'
deepl-translate -i 'en' -o 'de' -s 'Welcome to the jungle'
```

- - - - -

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
