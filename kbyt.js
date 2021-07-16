const puppeteer = require('puppeteer');
const { google } = require("googleapis");
const path = require('path');
const moment = require('moment');


const fs = require('fs');
const { factchecktools } = require('googleapis/build/src/apis/factchecktools');
const keyFile = path.join(__dirname, 'credentials.json');

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

async function updateDataGoogleSheet(value, row) {
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
    let range = String("Class Data!F" + row);
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
async function printData() {
    // await getDataFromGoogleSheet();
    let result = false;
    let check = true;
    while (result == false) {
        var x = await getDataFromGoogleSheet();
        //console.log(x)
        for (let i = 0; i < x.length; i++) {
            check = x[i][5]*check;
            console.log(check)
            result = check;
            await addData(x[i][0], x[i][1], x[i][2], x[i][3], x[i][4], i + 2, x[i][5]);
        }
        check = true;
    }
    // let i = 0;
    // let check = await addData(x[i][0], x[i][1], x[i][2], x[i][3], x[i][4], i + 2, x[i][5]);
    // console.log(check)
}
printData();

async function addData(name, address, phone, date, note, row, check) {
    if (check == 0) {
        const browser = await puppeteer.launch({ headless: true });
        try {
            const page = await browser.newPage();
            await page.setViewport({ width: 720, height: 500 })
            await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSf7grRkTwlyb67DFIkTZdvP_2VvMKUcRYbtgEoUr4dZd5OeXQ/viewform', { timeout: 10000 });
            await page.waitForSelector("input[jsname=YPqjbf]");
            await page.waitForTimeout(1000)
            await page.focus("input[jsname=YPqjbf]");
            await page.keyboard.type(name); //type full name
            console.log(name)
            await page.waitForTimeout(1000)
            await page.focus("textarea[jsname=YPqjbf]");
            await page.keyboard.type(address); //type address
            console.log(address)
            await page.waitForTimeout(1000)
            await page.waitForSelector('input[aria-labelledby=i11]');

            await page.focus("input[aria-labelledby=i11]");
            await page.keyboard.type(phone); //type phone number
            console.log(phone)
            await page.waitForTimeout(1000)
            await page.click("label[for=i43]"); // select PVPS Ca Mau
            await page.waitForTimeout(1000)
            await page.click("label[for=i43]"); // select PVPS Ca Mau
            await page.waitForTimeout(1000)
            await page.click("div[role=button]");
            console.log('p1')
            await page.waitForSelector('div[aria-label="Không có các triệu chứng nêu trên"]');
            await page.click('div[aria-label="Không có các triệu chứng nêu trên"]'); // select khong co cac trieu chung neu tren
            await page.waitForTimeout(1000)
            // await page.click('div[aria-label="Không có các triệu chứng nêu trên"]'); // select khong co cac trieu chung neu tren
            // await page.waitForTimeout(1000)

            await page.click('div[jsname=OCpkoe')
            console.log('p2')
            await page.waitForSelector('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('div[jsname=OCpkoe')
            console.log('p3')
            await page.waitForSelector('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('div[jsname=OCpkoe')
            console.log('p3')
            await page.waitForSelector('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('div[jsname=OCpkoe')
            console.log('p4')
            await page.waitForSelector('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i8]');
            await page.waitForTimeout(1000)
            await page.click('div[jsname=OCpkoe')
            console.log('p5')
            await page.waitForSelector('input[type=date]');
            await page.waitForTimeout(1000)
            await page.type('input[type=date]', date)

            await page.waitForTimeout(1000)
            await page.focus("textarea[jsname=YPqjbf]");
            await page.keyboard.type(note); //type address
            await page.waitForTimeout(1000)

            //Check đồng ý
            await page.waitForSelector('label[for=i15]');
            await page.waitForTimeout(1000)
            await page.click('label[for=i15]');
            await page.waitForTimeout(1000)
            //submit
            await page.waitForTimeout(1000)
            await page.click('div[jsname=M2UYVd')

            await page.waitForTimeout(3000)

            let div = await page.evaluate(() => {
                const div = Array.from(document.querySelectorAll("div"))
                return div.map(content => content.innerText);
            })
            //console.log(div)
            for (let i = 0; i < div.length; i++) {
                if (div[i] === 'Chúc mừng bạn đã thực hiện khai báo y tế và gửi tờ khai y tế thành công !\nTrân trọng cảm ơn!') {
                    await updateDataGoogleSheet(1, row);
                    await updateTimeGoogleSheet(row);
                    await browser.close();
                    console.log(name);
                    return true;
                }
            }
        } catch (e) {
            console.error(e.message);
            return false;
        } finally {
            await browser.close();
            return false;
        }
    } else if (check == 1) {
        console.log("Da khai bao y te")
        return true;
    }
};

//getDataFromGoogleSheet();