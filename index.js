const wdio = require('webdriverio')
const assert = require('assert')
const path = require('path')

const appPath = path.resolve(__dirname, 'demo-apps')

// javascript
const opts = {
    path: '/wd/hub',
    port: 4723,
    // capabilities: {
    //     platformName: 'Android',
    //     platformVersion: '10',
    //     deviceName: 'Android Emulator',
    // app: path.resolve(appPath, 'ApiDemos-debug.apk'),
    //     appPackage: 'io.appium.android.apis',
    //     appActivity: '.view.TextFields',
    //     automationName: 'UiAutomator2',
    // },
    capabilities: {
        platformName: 'iOS',
        platformVersion: '14.2',
        deviceName: 'iPhone 12 Pro Max',
        automationName: 'XCUITest',
        app: path.resolve(appPath, 'TestApp.app.zip'),
    },
}

// android
// async function main() {
//     const client = await wdio.remote(opts)

//     const field = await client.$('android.widget.EditText')
//     await field.setValue('Hello World!')
//     const value = await field.getText()
//     assert.strictEqual(value, 'Hello World!')

//     await client.deleteSession()
// }

// ios
async function main() {
    const client = await wdio.remote(opts)
    const elementId = await client.findElement('accessibility id', 'TextField1')
    client.elementSendKeys(elementId.ELEMENT, 'Hello World!')

    const elementValue = await client.findElement(
        'accessibility id',
        'TextField1'
    )
    await client
        .getElementAttribute(elementValue.ELEMENT, 'value')
        .then((attr) => {
            assert.strictEqual(attr, 'Hello World!')
        })
    await client.deleteSession()
}

main()
