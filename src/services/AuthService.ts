

export const authenticateUser = async (username: string, password: string) => {
    // Пример запроса на сервер для аутентификации
    const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Ошибка аутентификации');
    }

    return response.json();
};

