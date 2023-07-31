import axios from 'axios'

axios.defaults.withCredentials = true

const http ={
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete
}

export default http;