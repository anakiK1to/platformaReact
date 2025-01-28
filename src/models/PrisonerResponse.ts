import {Prisoner} from "./Prisoner";

export interface PrisonersResponse {
    content: Prisoner[];
    totalCount: number;
    page: number;
    size: number;
}