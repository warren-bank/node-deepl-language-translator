const https     = require('https')
const parse_url = require('url').parse

const get_options = (api_key, api_url, api_endpoint, postBody) => {
  if (!api_url) {
    api_url = api_key.endsWith(':fx')
      ? 'https://api-free.deepl.com/v2'
      : 'https://api.deepl.com/v2'
  }

  const options = parse_url(api_url + api_endpoint)
  const is_post = !!postBody

  options.method  = is_post ? 'POST' : 'GET'
  options.headers = is_post
    ? {
      'Content-Type':   'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(postBody))
    }
    : {}
  options.headers['Authorization'] = `DeepL-Auth-Key ${api_key}`
  if (!options.port)
    options.port = 443

  return options
}

const request = (options, postBody) => {
  return new Promise((resolve, reject) => {
    const is_post = !!postBody
    const _method = is_post ? https.request : https.get

    const req = _method(options, res => {
      let json_chunks = []

      res.setEncoding('utf8')

      res.on('data', chunk => {
        json_chunks.push(chunk)
      })

      res.on('end', () => {
        let data
        try {
          data = JSON.parse(json_chunks.join(''))
          resolve(data)
        }
        catch(e) {
          e.why = 2
          e.json = json_chunks.join('')
          reject(e)
        }
        finally {
          json_chunks = null
        }
      })
    })

    req.on('error', e => {
      e.why = 1
      reject(e)
    })

    if (is_post) {
      req.write(JSON.stringify(postBody))
      req.end()
    }
  })
}

module.exports = {get_options, request}
