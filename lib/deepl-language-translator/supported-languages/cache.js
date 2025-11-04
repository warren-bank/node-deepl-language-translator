const fs   = require('fs')
const path = require('path')

const {get_options, request} = require('../request')

// -----------------------------------------------------------------------------common

const get_cachedir = () => {
  return path.join(__dirname, 'cache')
}

const get_filepath = () => {
  // invalidate daily
  const timestamp = (new Date()).toISOString().split('T')[0]
  const filename  = `languages.${timestamp}.json`
  return path.join(get_cachedir(), filename)
}

// ----------------------------------------------------------------------------- update

const refresh_cache = async (api_key, api_url, filepath) => {
  if (fs.existsSync(filepath)) return

  clean_cache_directory()
  await download_cache_file(api_key, api_url, filepath)
}

const clean_cache_directory = () => {
  const cachedir = get_cachedir()
  const files = fs.readdirSync(cachedir, {encoding: 'utf8', withFileTypes: false, recursive: false})
  for (let file of files) {
    if (file.endsWith('.json')) {
      fs.rm(path.join(cachedir, file), {force: true}, (e) => {})
    }
  }
}

// returns a Promise
// can throw Error
const download_cache_file = async (api_key, api_url, filepath) => {
  const data = {source: [], target: []}

  data.source = await download_languages(api_key, api_url, 'source')
  data.target = await download_languages(api_key, api_url, 'target')

  fs.writeFileSync(filepath, JSON.stringify(data), {encoding: 'utf8'})
}

// returns a Promise
// can throw Error
const download_languages = async (api_key, api_url, type) => {
  const api_endpoint = `/languages?type=${type}`
  const options      = get_options(api_key, api_url, api_endpoint)
  const data         = await request(options)

  if (!Array.isArray(data) || !data.length)
    throw new Error('no languages in API response')

  return normalize_languages_data(data)
}

const normalize_languages_data = (data) => {
  // rename fields: {name, language} => {name, code}
  return data.map(obj => ({name: obj.name, code: obj.language}))
}

// ----------------------------------------------------------------------------- read

// returns an array of language objects
// can throw Error
const read_cache = async (api_key, api_url) => {
  const filepath = get_filepath()
  await refresh_cache(api_key, api_url, filepath)
  const json = fs.readFileSync(filepath, {encoding: 'utf8'})
  return JSON.parse(json)
}

// -----------------------------------------------------------------------------

module.exports = read_cache
