import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

const insertUser = payload => api.post('/user', payload)
const getAllUsers = () => api.get('/user')

const apis = {
    insertUser,
    getAllUsers
}

export default apis