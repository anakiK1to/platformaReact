module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Подключение тестов с расширением .ts
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Укажите путь к вашему tsconfig.json
        },
    },
};
