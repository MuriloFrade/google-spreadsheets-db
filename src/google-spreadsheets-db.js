
const httpClient = require('request')

class GoogleSpreadsheetsDb {

  constructor (apiKey, spreadsheetId) {
    if (!apiKey) {
      throw new Error("API Key is required")
    }

    if (!spreadsheetId) {
      throw new Error("spreadsheetId is required")
    }

    this.apiKey = apiKey
    this.spreadsheetId = spreadsheetId
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets'

  }

  getAll (sheetName, callback) {
    httpClient.get(this.buildUrl(sheetName), (err, response, body) => {
      if (err) {
        callback(err)
        return
      }
      if (response.statusCode >= 400) {
        callback(body)
        return
      }
      const result = JSON.parse(body)
      callback(null, this.parseValues(result.values))
    })
  }

  /**
   * Returns Url in format:
   * https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values/sheetName!range?key=apiKey
   * @param {*} sheetName
   *
   */
  buildUrl (sheetName, range) {
    range = range ? `!${range}` : ''
    return `${this.baseUrl}/${this.spreadsheetId}/values/${sheetName}${range}?key=${this.apiKey}`
  }

  parseValues (values) {
    const propertiesNames = values[0]
    const result = []
    for (let i = 1; i < values.length; i++) {
      const obj = {}
      for (let j = 0; j < propertiesNames.length; j++) {
        // throws trying to parse texts
        try {
          obj[propertiesNames[j]] = JSON.parse(values[i][j])
        } catch (e) {
          obj[propertiesNames[j]] = values[i][j]
        }
      }
      result.push(obj)
    }

    return result
  }
}

module.exports = GoogleSpreadsheetsDb
