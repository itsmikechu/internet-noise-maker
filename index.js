const nouns = require('./nouns.json')

let stop = false
let popups = {}
let min_number_of_words = 2
let max_number_of_words = 4

function random_integer_between(a, b) {
  return a + Math.floor((1 + b - a) * Math.random())
}

function get_random_word() {
  return nouns[random_integer_between(0, nouns.length - 1)]
}

function lucky(words, name) {
  const url = `https://www.google.com/search?btnI&q=${encodeURIComponent(
    words.join(' '),
  )}`

  if (name in popups && !popups[name]) {
    // If browser is blocking our pop-ups, return.
    return
  }

  if (popups[name] && !popups[name].closed) {
    popups[name].location = url
  } else {
    popups[name] = window.open(url, name)
    if (!popups[name]) {
      $('#popup-alert').css('display', 'block')
    }
  }

  self.focus()
  setTimeout(function() {
    if (!stop) noisify(name)
  }, Math.floor(Math.random() * 10000) + 8000)
}

function get_words() {
  const words = []
  const n = random_integer_between(min_number_of_words, max_number_of_words)

  for (let i = 0; i < n; i++) {
    words.push(get_random_word())
  }

  return words
}

function noisify(name) {
  stop = false
  lucky(get_words(), name)
}

noisify('noise_a')
