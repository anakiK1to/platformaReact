import {FavoriteDish} from "./FavouriteDish";
export interface Prisoner {
    id: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    weight: number;
    passport: string;
    birthDate: string;
    favoriteDish: FavoriteDish;
    rating: number;
    isAlive: boolean;
}