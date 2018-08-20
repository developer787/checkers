import axios from 'axios'

// Implemented here so that we don't have to repeat this code everywhere.
const BASE_URL = 'https://sumrun-db.herokuapp.com/'
const API = {
  get() {
    return axios.get(`${BASE_URL}`)
            .then( (res) => { return res})
            .catch( (error) => { return error})
  },

  post(params) {
    return axios.post(`${BASE_URL}`, params)
      .then( (res) => { return res})
      .catch( (error) => { return error})
  }
}

export default API;