export class DummyService {
    static BASE_URL = 'https://dummyjson.com/auth/';

    async retrieveProductsByCategory(token, categoryId, skip=0, limit=10) {
        const url = `${DummyService.BASE_URL}products/category/${categoryId}?skip=${skip}&limit=${limit}`;

        let response;
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            response = await fetch(url, {
                method: 'get',
                headers
            });
        } catch (error) {
            throw new Error(`Cannot retrieve products: ${error}`);
        }

        if (!response.ok) {
            throw new Error(`Cannot retrieve products: [${response.status} ${response.statusText}]`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot retrieve series: ${error}`);
        }

        return data.products;
    }
}