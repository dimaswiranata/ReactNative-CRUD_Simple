import axios from 'axios';
import contact from './contact';

export const SERVER = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com',
})

axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

export default {
  contact
}