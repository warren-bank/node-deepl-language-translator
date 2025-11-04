const {get_options, request} = require('../../../lib/deepl-language-translator/request')

const main = async () => {
  await request_languages('source'); console.log()
  await request_languages('target')
}

const request_languages = async (type) => {
  const api_key      = process.env["DEEPL_TRANSLATE_API_KEY"]
  const api_url      = process.env["DEEPL_TRANSLATE_API_URL"]
  const api_endpoint = `/languages?type=${type}`
  const options      = get_options(api_key, api_url, api_endpoint)

  try {
    let data = await request(options)

    if (!Array.isArray(data) || !data.length) {
      console.log('API response is not valid:' + "\n" + JSON.stringify(data, null, 2))
      process.exit(2)
    }

    console.log(`${type}:`)
    console.log('='.repeat(type.length + 1) + "\n")

    data = normalize_api_data(data)
    sort_api_data(data)
    format_api_data(data)
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
  }
}

const normalize_api_data = (data) => {
  // rename fields: {name, language} => {name, code}
  return data.map(obj => ({name: obj.name, code: obj.language}))
}

const sort_api_data = (data) => {
  data.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

const format_api_data = (data) => {
  // 1st pass
  const col_widths = [0, 0]
  for (let lang of data) {
    if (lang.code.length > col_widths[0]) col_widths[0] = lang.code.length
    if (lang.name.length > col_widths[1]) col_widths[1] = lang.name.length
  }

  // 2nd pass
  const md = []
  md.push(`| ${add_right_padding('code', col_widths[0] + 2)} | ${add_right_padding('name', col_widths[1])} |`)
  md.push(`|${('-').repeat(col_widths[0] + 4)}|${('-').repeat(col_widths[1] + 2)}|`)
  md.push(
    ...data.map(lang => `| ${add_right_padding('"' + lang.code + '"', col_widths[0] + 2)} | ${add_right_padding(lang.name, col_widths[1])} |`)
  )

  // print
  console.log(
    md.join("\n")
  )
}

const add_right_padding = (text, width) => {
  const pad_width = width - text.length
  return text + (' ').repeat(pad_width)
}

main()