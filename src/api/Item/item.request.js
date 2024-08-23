import apiInstance from "../apiInstance";

const getItems = () => {
  return apiInstance
    .get(`/item`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const addItem = (item) => {
  return apiInstance
    .post(`/item`, item)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const getOneItem = (itemId) => {
  return apiInstance
    .get(`/item/${itemId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const updateItem = (item, itemId) => {
  return apiInstance
    .put(`/item/${itemId}`, item)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const deleteItem = (itemId) => {
  return apiInstance
    .delete(`/item/${itemId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const itemRequest = {
    getItems,
    addItem,
    getOneItem,
    updateItem,
    deleteItem,
};
export default itemRequest;
