import axios from "axios";
import authHeader from "./auth-header";

export default class ExpenseApi {
    static async getExpenses() {
        let response = await axios.get('http://localhost:3001/api/expenses', { headers: authHeader() });
        console.log(response.data)
        return response.data
    };

    static async removeExpense(_id) {
        return await axios.delete(`http://localhost:3001/api/expenses/${_id}`, { headers: authHeader() });
    }
}