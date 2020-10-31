import axios from 'axios';

class DepensesApi {
    constructor() {
        this.apiUrl = 'http://127.0.0.1:8000/api/v1/'
    }

    getToken() {
        return window.localStorage.getItem('x-auth-token')
    }

    makeEndpointUrl(endpoint) {
        return `${this.apiUrl}${endpoint}/`
    }

    async makeApiGetRequest(endpoint) {
        const response = await axios.get(this.makeEndpointUrl(),
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            });
        return response;
    }

    async getDataHistory(roomId) {
        const response = await axios.get(`http://localhost:8000/api/v1/room/${roomId}/history/`,
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            });
        return response;
    }

    async getActualUserName(roomId) {
        const response = await axios.get(`http://localhost:8000/api/v1/room/1/me/`,
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            });
        return response;
    }

    async makeApiPostRequest(endpoint, data) {
        const response = axios.post(this.makeEndpointUrl(endpoint), data,
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            }
        )
        return response;
    }
}
export default DepensesApi
