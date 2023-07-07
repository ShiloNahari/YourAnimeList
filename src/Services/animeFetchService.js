import http from "./httpService";

const options = {
  method: 'GET',
  url: 'https://animes5.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': 'e1ed178cdfmsh174fa0b9b8b943dp189617jsn968d7df47454',
    'X-RapidAPI-Host': 'animes5.p.rapidapi.com'
  }
}

export const getAllAnimes = async () => {
  try {
    const hi = await http.get('https://animes5.p.rapidapi.com/',options)
    console.log(hi)
    return hi.data.animes
  } catch (err) {
    return 'error'
  }
}

export const register = async (username,email, password,check) => {

}
