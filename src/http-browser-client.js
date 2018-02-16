
module.exports = {
  get: (url, callback) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        callback(null, { statusCode: xmlHttp.status }, xmlHttp.responseText)
      }
    }
    xmlHttp.open("GET", url, true)
    xmlHttp.send(null)
  }
}
