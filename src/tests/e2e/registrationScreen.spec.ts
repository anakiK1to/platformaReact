import {WebDriver} from "selenium-webdriver";

const {Builder, By, Key, until} = require("selenium-webdriver");

// Увеличиваем тайм-аут для всех тестов до 30 секунд
jest.setTimeout(30000);

describe("AIS 'Platform' Business Cycle Test", () => {
    let driver: WebDriver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    it("should complete the full registration cycle", async () => {
        // **ШАГ 1: Аутентификация администратора**
        await driver.get("http://localhost:3001/login");

        // Ожидание появления поля логина
        await driver.wait(until.elementLocated(By.id("login")), 10000);
        await driver.findElement(By.id("login")).sendKeys("admin");

        // Ожидание появления поля пароля
        await driver.wait(until.elementLocated(By.id("password")), 10000);
        await driver.findElement(By.id("password")).sendKeys("admin");

        // Ожидание появления кнопки входа
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Войти')]")), 10000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Войти')]")).click();

        // Ожидание перехода на главную страницу
        await driver.wait(until.urlIs("http://localhost:3001/main"));

        // **ШАГ 2: Регистрация нового заключенного**
        await driver.get("http://localhost:3001/main/регистрация");

        // Ожидание появления заголовка страницы
        await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Регистрация нового заключенного')]")), 10000);

        // Ожидание появления полей формы регистрации
        await driver.wait(until.elementLocated(By.id("lastName")), 10000);
        await driver.findElement(By.id("lastName")).sendKeys("Иванов");

        await driver.wait(until.elementLocated(By.id("firstName")), 10000);
        await driver.findElement(By.id("firstName")).sendKeys("Иван");

        await driver.wait(until.elementLocated(By.id("patronymic")), 10000);
        await driver.findElement(By.id("patronymic")).sendKeys("Иванович");

        await driver.wait(until.elementLocated(By.id("passport")), 10000);
        await driver.findElement(By.id("passport")).sendKeys("1234567890");

        await driver.wait(until.elementLocated(By.id("birthDate")), 10000);
        await driver.findElement(By.id("birthDate")).sendKeys("2000-01-01");

        await driver.wait(until.elementLocated(By.id("height")), 10000);
        await driver.findElement(By.id("height")).sendKeys("180");

        await driver.wait(until.elementLocated(By.id("weight")), 10000);
        await driver.findElement(By.id("weight")).sendKeys("75");

        await driver.wait(until.elementLocated(By.id("password")), 10000);
        await driver.findElement(By.id("password")).sendKeys("password123");

        await driver.wait(until.elementLocated(By.css('div[role="combobox"]')), 10000);

// Найти контейнер выпадающего списка и кликнуть, чтобы открыть список
        const selectContainer = await driver.findElement(By.css('div[role="combobox"]'));
        await selectContainer.click();

// Ожидание появления элементов списка
        await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'Борщ')]")), 10000);

// Выбрать блюдо "Борщ"
        const menuItem = await driver.findElement(By.xpath("//li[contains(text(), 'Борщ')]"));
        await menuItem.click();

        await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'Борщ')]")), 10000);
        await driver.findElement(By.xpath("//li[contains(text(), 'Борщ')]")).click();

        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Подтвердить регистрацию')]")), 10000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Подтвердить регистрацию')]")).click();

        // Проверка успешной регистрации
        // const registrationSuccess = await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Ошибка при регистрации заключенного')]")), 10000);
        // expect(await registrationSuccess.isDisplayed()).toBe(false);
    });
});

describe("Dish Management Test", () => {
    let driver: WebDriver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    it("should edit an existing dish", async () => {
        // **ШАГ 1: Переход на страницу управления блюдами**
        await driver.get("http://localhost:3001/main/Обновление меню");

        // Ожидание появления заголовка страницы
        await driver.wait(until.elementLocated(By.xpath("//h4[contains(text(), 'Управление блюдами')]")), 10000);

        // **ШАГ 2: Выбор блюда для редактирования**
        // Ожидание появления кнопки редактирования первого блюда
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Редактировать')]")), 10000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Редактировать')]")).click();

        // **ШАГ 3: Изменение данных блюда**
        // Ожидание появления поля для названия блюда
        await driver.wait(until.elementLocated(By.id("dish-name")), 10000);
        const dishNameField = await driver.findElement(By.id("dish-name"));
        await dishNameField.clear();
        await dishNameField.sendKeys("Обновленное блюдо");

        // Ожидание появления кнопки обновления блюда
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Обновить блюдо')]")), 10000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Обновить блюдо')]")).click();

        // Проверка успешного обновления блюда
        // const updateSuccess = await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Блюдо успешно обновлено')]")), 10000);
        // expect(await updateSuccess.isDisplayed()).toBe(true);
    });
});

describe("Update Inmate Points Test", () => {
    let driver: WebDriver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    }, 30000);

    it("should update inmate points", async () => {
        // **ШАГ 1: Переход на страницу пользователей**
        await driver.get("http://localhost:3001/main/пользователи");

        // Ожидание появления заголовка "Заключенные"
        await driver.wait(until.elementLocated(By.xpath("//h4[contains(text(), 'Заключенные')]")), 10000);

        // **ШАГ 2: Находим таблицу заключенных**
        // Ожидание появления таблицы заключенных
        await driver.wait(until.elementLocated(By.xpath("//h4[contains(text(), 'Заключенные')]/following-sibling::table")), 10000);

        // Находим таблицу заключенных
        const inmatesTable = await driver.findElement(By.xpath("//h4[contains(text(), 'Заключенные')]/following-sibling::table"));

        // Находим первую строку в таблице заключенных
        const firstInmateRow = await inmatesTable.findElement(By.xpath(".//tbody/tr[1]"));

        // **ШАГ 3: Выбор нарушения для заключенного**
        // Находим выпадающий список для выбора нарушения
        const violationSelect = await firstInmateRow.findElement(By.xpath(".//div[@role='combobox']"));
        await violationSelect.click();

        // Ожидание появления элементов списка нарушений
        await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'Пропуск приема пищи (-5)')]")), 10000);

        // Выбираем нарушение "Нарушение 1"
        const violationMenuItem = await driver.findElement(By.xpath("//li[contains(text(), 'Нарушение 1')]"));
        await violationMenuItem.click();

        // **ШАГ 4: Списание баллов за нарушение**
        // Находим кнопку "Списать" для первого заключенного
        const subtractButton = await firstInmateRow.findElement(By.xpath(".//button[contains(text(), 'Списать')]"));
        await subtractButton.click();

        // Проверка успешного списания баллов
        const successMessage = await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Баллы успешно списаны')]")), 10000);
        expect(await successMessage.isDisplayed()).toBe(true);
    });
});