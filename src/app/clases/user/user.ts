import { Role } from "../role/role";

export class User {
    user_id: any | null = null;
    user_dni: string | null = null;
    user_surnames: string | null = null;
    user_names: string | null = null;
    user_phone_number: string | null = null;
    user_email: string | null = null;
    user_password: string | null = null;
    user_status: string | null = null;
    user_token: string | null = null;
    role: Role;
}
