
const { spy, assert, stub, match } = require('sinon')
const { expect } = require('chai')
const httpClient  = require('request')

const { delay } = require('./utils')

const GoogleSpreadsheetDb = require('../src/google-spreadsheet-db')

describe('Google spreadsheet DB', () => {
  const apiKey = 'abcde12345'
  const spreadsheetId = '1234567890'

  let db
  let sheetName
  let httpGetStub = stub(httpClient, 'get')
  let callback

  beforeEach(() => {
    db = new GoogleSpreadsheetDb(apiKey, spreadsheetId)
    sheetName = 'portifolio'
    httpGetStub.reset()
    callback = spy()
  })

  it('builds urls', () => {
    let range
    expect(db.buildUrl(sheetName, range)).to
      .equal(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`)

    range = 'A1:D2'
    expect(db.buildUrl(sheetName, range)).to
      .equal(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=${apiKey}`)
  })

  it('parses google sheets api values', () => {
    const result = [
      {
        id: 1,
        name: 'First item',
        images: ['https://someurl.jpg']
      },
      {
        id: 2,
        name: 'Second item',
        images: []
      }
    ]

    expect(db.parseValues([
      [
        "id",
        "name",
        "images"
      ],
      [
          "1",
          "First item",
          "[\"https://someurl.jpg\"]"
      ],
      [
          "2",
          "Second item",
          "[]"
      ]
    ])).to.deep.equal(result)
  })

  it('sends http get request in gets all', async () => {
    db.getAll(sheetName, callback)

    await delay(0)
    assert.calledOnce(httpGetStub)
    assert.calledWith(httpGetStub, db.buildUrl(sheetName), match.func)
  })

  it('calls callback with items in getAll', async () => {
    const bodyResponse = {
      "range": "portifolio!A1:D3",
      "majorDimension": "ROWS",
      "values": [
        [
          "id",
          "name",
          "description",
          "images"
        ],
        [
          "1",
          "First item",
          "some description goes here",
          "[\"https://someurl.jpg?v=1507860071\"]"
        ],
        [
          "2",
          "Second item",
          "some description goes here",
          "[\"https://someurl.jpg?v=1507860071\"]"
        ]
      ]
    }
    httpGetStub.yields(null, { statusCode: 200 }, JSON.stringify(bodyResponse))

    db.getAll(sheetName, callback)

    await delay(0)
    assert.calledOnce(callback)
    assert.calledWith(callback, null, db.parseValues(bodyResponse.values))
  })

  it('calls callback with error in getAll', async () => {
    const bodyResponse = JSON.stringify({
      "error": {
        "code": 400,
        "message": "API key not valid. Please pass a valid API key.",
        "status": "INVALID_ARGUMENT",
        "details": [
          {
            "@type": "type.googleapis.com/google.rpc.Help",
            "links": [
              {
                "description": "Google developers console",
                "url": "https://console.developers.google.com"
              }
            ]
          }
        ]
      }
    })
    httpGetStub.yields(null, { statusCode: 400 }, bodyResponse)

    db.getAll(sheetName, callback)

    await delay(0)
    assert.calledOnce(callback)
    assert.calledWith(callback, bodyResponse)
  })

})
