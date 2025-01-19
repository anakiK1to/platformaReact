import { WebDriver } from "selenium-webdriver";

const { Builder, By, Key, until } = require("selenium-webdriver");

describe("AIS 'Platform' Business Cycle Test", () => {
    let driver: WebDriver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it("should complete the full business cycle", async () => {
        // **ШАГ 1: Аутентификация администратора и назначение прав**
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("login")).sendKeys("user");
        await driver.findElement(By.id("password")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(), 'Войти')]")).click();
        await driver.wait(until.urlIs("http://localhost:3000/main"), 5000);

        // Сохраняем информацию в LocalStorage
        await driver.executeScript('window.localStorage.setItem("userRole", "admin");');

        // Назначение прав пользователям
        await driver.wait(until.urlIs("http://localhost:3000/main/пользователи"), 5000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Назначить права')]")).click();

        // Проверка, что кнопка нажата
        const userRoleAssigned = await driver.findElement(By.xpath("//span[contains(text(), 'Роль назначена')]")).isDisplayed();
        expect(userRoleAssigned).toBe(true);

        // **ШАГ 2: Регистрация нового заключенного регистратором**
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("login")).sendKeys("registrar");
        await driver.findElement(By.id("password")).sendKeys("registrar_password");
        await driver.findElement(By.xpath("//button[contains(text(), 'Войти')]")).click();
        await driver.wait(until.urlIs("http://localhost:3000/main"), 5000);

        // Сохраняем информацию о регистраторе в LocalStorage
        await driver.executeScript('window.localStorage.setItem("registrar", "registrar_password");');

        // Переход на страницу регистрации
        await driver.get("http://localhost:3000/main/регистрация");
        await driver.findElement(By.id("lastName")).sendKeys("Иванов");
        await driver.findElement(By.id("firstName")).sendKeys("Иван");
        await driver.findElement(By.id("passport")).sendKeys("1234567890");
        await driver.findElement(By.id("birthDate")).sendKeys("2000-01-01");
        await driver.findElement(By.id("height")).sendKeys("180");
        await driver.findElement(By.id("weight")).sendKeys("75");
        await driver.findElement(By.id("favoriteDish")).click();
        await driver.findElement(By.xpath("//li[contains(text(), 'Борщ')]")).click();
        await driver.findElement(By.xpath("//button[contains(text(), 'Подтвердить регистрацию')]")).click();

        // Проверка успешной регистрации
        const registrationSuccess = await driver.findElement(By.xpath("//div[contains(text(), 'Регистрация успешна')]")).isDisplayed();
        expect(registrationSuccess).toBe(true);

        // **ШАГ 3: Авторизация заключенного и выбор блюда**
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("login")).sendKeys("prisoner");
        await driver.findElement(By.id("password")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(), 'Войти')]")).click();
        await driver.wait(until.urlIs("http://localhost:3000/main"), 5000);

        // Сохраняем информацию о заключенном в LocalStorage
        await driver.executeScript('window.localStorage.setItem("prisoner", "password");');

        // Выбор блюда
        await driver.get("http://localhost:3000/main/выбор-блюда");
        await driver.findElement(By.id("favoriteDish")).click();
        await driver.findElement(By.xpath("//li[contains(text(), 'Суп')]")).click();

        // **ШАГ 4: Обновление меню шеф-поваром**
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("login")).sendKeys("chef");
        await driver.findElement(By.id("password")).sendKeys("chef_password");
        await driver.findElement(By.xpath("//button[contains(text(), 'Войти')]")).click();
        await driver.wait(until.urlIs("http://localhost:3000/main"), 5000);

        // Переход к обновлению меню
        await driver.get("http://localhost:3000/main/обновление-меню");
        await driver.findElement(By.xpath("//button[contains(text(), 'Обновить меню')]")).click();

        // **ШАГ 5: Аналитик распределяет этажи**
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("login")).sendKeys("analyst");
        await driver.findElement(By.id("password")).sendKeys("analyst_password");
        await driver.findElement(By.xpath("//button[contains(text(), 'Войти')]")).click();
        await driver.wait(until.urlIs("http://localhost:3000/main"), 5000);

        // Назначение этажей заключенным
        await driver.get("http://localhost:3000/main/распределение-этажей");
        await driver.findElement(By.xpath("//button[contains(text(), 'Назначить этажи')]")).click();

        // **ШАГ 6: Эмуляция "Платформы"**
        await driver.get("http://localhost:3000/main/платформа");
        await driver.findElement(By.xpath("//button[contains(text(), 'Старт')]")).click();
        await driver.wait(until.urlIs("http://localhost:3000/main/платформа/завершение"), 20000);

        // Проверка возврата на 0 этаж
        const currentFloor = await driver.findElement(By.id("currentFloor")).getText();
        expect(currentFloor).toBe("0");

        // **ШАГ 7: Обновление баллов аналитиком**
        await driver.get("http://localhost:3000/main/обновление-баллов");
        await driver.findElement(By.xpath("//button[contains(text(), 'Обновить баллы')]")).click();

        // **ШАГ 8: Перераспределение заключенных**
        await driver.get("http://localhost:3000/main/перераспределение");
        await driver.findElement(By.xpath("//button[contains(text(), 'Перераспределить')]")).click();
    });
});
