import axios from 'axios';

export default class UserApi {
    static async register(values) {
        let response = await axios.post('http://localhost:3001/api/users', values)
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data))
    };

    static async login(values) {
        let response = await axios.post('http://localhost:3001/api/users/login', values)
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data))
    };

    static async logout() {
        localStorage.removeItem("user");
    };

    static async getCurrentUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user)
        return user
    };
}