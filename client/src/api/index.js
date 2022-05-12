import axios from 'axios';

async function getUser() {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}