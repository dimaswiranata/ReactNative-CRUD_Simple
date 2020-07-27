import SERVICES from "../../services";

const getContactData = () => {
  return new Promise((resolve,reject) => {
    return SERVICES.contact.getContactData()
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const updateContactData = (data) => {
  return new Promise((resolve,reject) => {
    return SERVICES.contact.updateContactData(data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const saveContactData = (data) => {
  return new Promise((resolve,reject) => {
    return SERVICES.contact.saveContactData(data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const deleteContactData = (data) => {
  return new Promise((resolve,reject) => {
    return SERVICES.contact.deleteContactData(data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export default {
  getContactData,
  updateContactData,
  saveContactData,
  deleteContactData
}