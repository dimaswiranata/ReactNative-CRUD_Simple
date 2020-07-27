import { SERVER } from '../index';

const getContactData = () => {
  return SERVER.get('/contact')
}

const updateContactData = ({ id, payload }) => {
  return SERVER.put(`/contact/${id}`, payload);
}

const saveContactData = ( payload ) => {
  return SERVER.post(`/contact`, payload);
}

const deleteContactData = ( id ) => {
  return SERVER.delete(`/contact/${id}`);
}

export default {
  getContactData,
  updateContactData,
  saveContactData,
  deleteContactData
}