export class Constant {
    public static email = new RegExp('^[a-z0-9._+-]+@[a-z0-9.-]+(\.[a-z]{2,4}){0,3}$');
    public static alphabet_space = '^[A-Za-z ]{1,}$';
    public static passwordPattern =
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/);
    public static phone = "^[0-9]{10}";
    public static server_url = "http://localhost:5000";
    public static api = {
        register: "/register",
        login: "/login",
        users: "/users"
    };
}