const baseUrl = 'https://ytbnbtmjdgofdydwanuj.supabase.co/rest/v1'
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjY0NDAxOCwiZXhwIjoxOTM4MjIwMDE4fQ.xhHELIF71sVQAS4TJeyIakWhTiAzeuMKolP6kPt4NIY'
const path = window.location.hash.replace('#', '');

// Setup listeners
const button = document.getElementById('shorten-url-button')
const info = document.getElementById('info')
const infoText = document.getElementById('info-text')
button.addEventListener('click', shorten)

if (path === "") {
  showForm()
} else {
  redirect(path)
}

function showForm() {
  const shortenUrl = document.getElementById('shorten-url')
  shortenUrl.style.display = 'block'

}

function redirect(shortened) {
  window.fetch(`${baseUrl}/redirect?select=url&redirect=eq.${shortened}`, {
    headers: {
      accept: 'application/vnd.pgrst.object+json',
      apikey: apikey
    }
  })
    .then(result => {
      if (result.ok) {
        return result.json()
      } else {
        throw `${decodeURI(shortened)} gave no results 🙀`
      }
    }).then(res => {
      const redirectText = (n) => `Redirecting to ${res.url} in ${n} seconds`
      showSuccess(redirectText(3))
      setTimeout(() => {
        showSuccess(redirectText(0))
        location.href = res.url
      }, 3000)
      setTimeout(() => showSuccess(redirectText(2)), 1000)
      setTimeout(() => showSuccess(redirectText(1)), 2000)
    }).catch(e => {
      showError(e)
    });
}

function showError(text) {
  infoText.innerText = text
  infoText.classList.remove('info--success')
  infoText.classList.add('info--error')
}

function showSuccess(text) {
  infoText.innerText = text
  infoText.classList.remove('info--error')
  infoText.classList.add('info--success')
}

function shorten() {
  const urlInput = document.getElementById('shorten-url-input')
  const url = urlInput.value
  console.log(url)
  return window.fetch(`${baseUrl}/rpc/shorten_url`, {
    method: 'POST',
    body: JSON.stringify({ long_url: url }),
    headers: {
      apikey: apikey,
      'content-type': 'application/json',
      accept: 'application/vnd.pgrst.object+json'
    }
  }).then(res => {
    if (res.ok) {
      return res.text();
    } else {
      throw "Could not shorten URL"
    }
  }).then(emojis => {
    showSuccess(emojis.slice(1, -1))
  }).catch(e => {
    showError(e)
  });
}
