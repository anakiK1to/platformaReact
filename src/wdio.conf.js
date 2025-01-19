exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--headless', '--disable-gpu']
            }
        }
    ],
    framework: 'mocha',
    reporters: ['dot'],
    services: ['selenium-standalone'],
    mochaOpts: {
        timeout: 60000
    }
};
