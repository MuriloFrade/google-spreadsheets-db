# Google Spreadsheet DB

Get data from Google spreadsheets as Javascript objects using this simple API and take the advantage of having a ready made CMS and readonly data store for your project.

## Installation

- In a browser: 

```HTML
<script src="./dist/google-spreadsheet-db.min.js"></script>
```

- Using npm:

```
$ npm i --save google-spreadsheet-db
```

- In Node.js:

```
const GoogleSpreadsheetDb = require('google-spreadsheet-db')
```

## Usage

- DB instance:

```javascript
const db = new GoogleSpreadsheetDb(
  'YOUR-API-KEY-HERE',
  'SPREADSHEET-ID-HERE'
)
```

- Retrieving all entries of a sheet:

```javascript
db.getAll('sheet-name', (err, entries) => {
/**
 * entries will be an array of objects
 * the object's keys are the column names of your sheet, ie:
 * [{ name: "First item", description: "some desc." },
 *  { name: "First item", description: "some desc." }]
 */
})
```

## Spreadsheet setup

### Table format

Use the first row for column names, like:

id | name | description | images
--- | --- | --- | ---
1	| First item|	some description goes here |	["https://somedomain.jpg"]
2	| Second item |	some description goes here | ["https://somedomain.jpg"]

See [example](https://docs.google.com/spreadsheets/d/1i0VCssIJFCMmWotcV1R_kqhLWszIUUZOrsZv0ZselOE/edit#gid=0)

### Spreadsheet ID and sheet names

The **spreadsheet ID** is the value between the "/d/" and the "/edit" in the URL of your spreadsheet. Use it to instanciate GoogleSpreadsheetDb. 

`https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`

Setup the sheets names by clicking in the tabs at the bottom of the spreadsheet. By default the first sheet is named Sheet1.

### API key and authorization

Follow this [wizard](https://console.developers.google.com/start/api?id=sheets.googleapis.com) in order to generate an API key.

You will also need to update permissions in your spreadsheet:

1. Click the Share link in the upper right-hand corner
2. Change access to "On - Anyone with a link"

