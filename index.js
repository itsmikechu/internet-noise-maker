const nouns = require('./nouns.json')
const Nightmare = require('nightmare')
const UserAgent = require('user-agents')

const minNumberOfWords = 2
const maxNumberOfWords = 4

const minViewPort = {
  width: 360,
  height: 640,
}
const maxViewPort = {
  width: 1920,
  height: 1080,
}

function randomInterBetween(a, b) {
  return a + Math.floor((1 + b - a) * Math.random())
}

function getRandomWord() {
  return nouns[randomInterBetween(0, nouns.length - 1)]
}

function getRandomViewport() {
  return {
    width: randomInterBetween(minViewPort.width, maxViewPort.width),
    height: randomInterBetween(minViewPort.height, maxViewPort.height),
  }
}

async function lucky(words, name) {
  const encodedQueryWords = encodeURIComponent(words.join(' '))
  // kp=1 Safe Search On https://duckduckgo.com/params
  const url = `https://duckduckgo.com/?kp=1&q=${encodedQueryWords}`
  console.info(`Navigating to: ${url}`)

  const browser = new Nightmare({ show: true })
  const randomUserAgent = new UserAgent()
  const randomViewport = getRandomViewport()

  browser.useragent(randomUserAgent.toString())
  browser.viewport(randomViewport.width, randomViewport.height)

  const pageUrl = await browser
    .goto(url)
    .wait(10000) // arbitrary, I know, but a little related extra traffic is cool too.
    .url()
  const pageTitle = await browser.title().end()

  console.log(`Internet Noise made at ${new Date()}`)
  console.log(`Title: ${pageTitle}`)
  console.log(`URL: ${pageUrl}`)
  console.log(`Viewport Size: ${randomViewport.width}x${randomViewport.height}`)
  console.log(`User Agent: ${randomUserAgent}`)
}

function getWords() {
  const words = []
  const n = randomInterBetween(minNumberOfWords, maxNumberOfWords)

  words.push('!ducky') // Like Google's I'm feeling lucky button
  for (let i = 0; i < n; i++) {
    words.push(getRandomWord())
  }

  return words
}

function noisify(name) {
  stop = false
  lucky(getWords(), name)
}

noisify('noise_a')
// Thanks to @The_HatedOne_ and http://makeinternetnoise.com/ for the inspiration