import axios from "axios";
import authHeader from "./auth-header";

export default class ExpenseApi {
    static async getExpenses() {
        let response = await axios.get('http://localhost:3001/api/expenses', { headers: authHeader() });
        console.log(response.data)
    }
}