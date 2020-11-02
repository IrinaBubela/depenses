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

    async getHistoryData(roomId) {
        const response = await axios.get(`${this.apiUrl}room/${roomId}/history/`,
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            });
        return response;
    }

    async getActualUserName(roomId) {
        const response = await axios.get(`${this.apiUrl}room/${roomId}/me/`,
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

    async getResponseMembers(roomId) {
        const responseMembers = await axios.get(`${this.apiUrl}room/${roomId}/members/`,
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            })
        return responseMembers;
    }

    async getResponseState(roomId) {
        const responseState = await axios.get(`${this.apiUrl}room/${roomId}/state/`,
            {
                headers: {
                    Authorization: `Token ${this.getToken()}`
                }
            })
        return responseState;
    }
}
export default DepensesApi
