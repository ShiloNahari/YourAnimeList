import http from "./httpService";

const options = {
  method: 'GET',
  url: process.env.REACT_APP_URL,
  headers: process.env.REACT_APP_HEADERS
}

export const getAllAnimes = async () => {
  try {
    console.log('hi');
    const hi = await http.get(process.env.REACT_APP_URL, options)
    console.log('hi');
    console.log(hi)
    return hi.data.animes
  } catch (err) {
    return 'error'
  }
}

export const register = async (username,email, password,check) => {

}
