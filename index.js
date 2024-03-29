const CoinMarketCap = require('coinmarketcap-api')
const { google } = require("googleapis");
const path = require('path');
const keyFile = path.join(__dirname, 'credentials.json');

const apiKey = 'b1ebf46d-9505-4bfb-88a2-5ac152d3ae46'
const client = new CoinMarketCap(apiKey)

async function getPrice(symbol) {
    try {
        const data = await client.getQuotes({ symbol: symbol })
        // console.log(data.data.symbol.quote.USD.price)
        const name = data.data[Object.keys(data.data)[0]].name
        const price = data.data[Object.keys(data.data)[0]].quote.USD.price
        return price
        console.log(price)
    } catch (e) {
        console.log(e)
    }

}
//getPrice('BTC').then(console.log).catch(console.error)

//getPrice('BTC')
async function getDataFromGoogleSheet() {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    //create client instance for auth

    const client = await auth.getClient();
    //instance of google sheets API

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = '1boCL7lhYIpPISsvjcML5PatieEXY7xxYkPavnjSwP2g';
    //get metadata about spreadsheet 

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Class Data!A2:F"
    })
    return (getRows.data.values)
};

async function updateDataGoogleSheet(symbol, value, row) {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    //create client instance for auth

    const client = await auth.getClient();
    //instance of google sheets API

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = '1W8tJBVXTPKBxpthhiLCvQwi8DNgFIq3kHj7BWJfDQ-Y';
    //get metadata about spreadsheet 
    let range = String(`${symbol}!I` + row);
    await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[value]]
        }
    })
};

async function updateTimeGoogleSheet(row) {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    //create client instance for auth

    const client = await auth.getClient();
    //instance of google sheets API

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = '1boCL7lhYIpPISsvjcML5PatieEXY7xxYkPavnjSwP2g';
    //get metadata about spreadsheet 
    let range = String("Class Data!G" + row);
    await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[moment(new Date())]]
        }
    })
};

async function updatePrice(symbol) {
    try {
        const priceBTC = await getPrice(symbol)
        console.log(priceBTC)
        await updateDataGoogleSheet(symbol, priceBTC, 3);
    } catch (e) {
        console.log(e)
    }

}
symbol = ['BTC', 'ETH', 'BNB']

symbol.map(updatePrice);