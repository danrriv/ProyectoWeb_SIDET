import { Category } from "../category/category";

export class Genre {
    genre_id: any | null = null;
    genre_name: string | null = null;
    category : Category | undefined;
}
