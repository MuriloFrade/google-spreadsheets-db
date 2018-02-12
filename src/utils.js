
const httpClient = {}
if (typeof module !== 'undefined' && module.exports) {
  const request = require('request')
  httpClient.get = request.get
} else {
  httpClient.get = (url, callback) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4) {
      callback(null, { statusCode: xmlHttp.status }, xmlHttp.responseText)
    }
    xmlHttp.open("GET", theUrl, true)
    xmlHttp.send(null)
  }
  }
}

module.exports.httpClient = httpClient