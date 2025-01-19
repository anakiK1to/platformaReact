// import axios from "axios";
//
//
// interface Product {
//     id: number;
//     name: string;
// }
//
// interface Ingredient {
//     amount: number;
//     productId: number;
// }
//
// interface AddDishModel {
//     name: string;
//     description: string;
//     receipt: string;
//     ingredients: Ingredient[];
// }
//
// export const fetchIngredientsFromServer = async (): Promise<Product[]> => {
//     try {
//         const response = await axios.get('/api/ingredients'); // Укажите правильный путь к API
//         return response.data;
//     } catch (error) {
//         console.error('Ошибка при загрузке ингредиентов:', error);
//         return [];
//     }
// };
//
// export const addDish = async (data: AddDishModel): Promise<any> => {
//     try {
//         const response = await axios.post('/api/add-dish', data);
//         return response.data;
//     } catch (error) {
//         console.error('Ошибка при добавлении блюда:', error);
//         return null;
//     }
// };
