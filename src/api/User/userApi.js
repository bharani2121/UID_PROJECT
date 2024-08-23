import apiInstance from "../apiInstance";

const subMainRoutePath = '/users';

export const loginUser = (authObj) => apiInstance.post(subMainRoutePath + '/login', authObj);
export const registerUser = (userObj) => apiInstance.post(subMainRoutePath + '/register', userObj);
export const findUsers = (queryParams) => apiInstance.get(subMainRoutePath + `?${queryParams}`);
export const fetchUser = (id, payload) => apiInstance.get(subMainRoutePath + `/${id}`, payload);
export const updateUser = (id, userObj) => apiInstance.put(subMainRoutePath + `/${id}`, userObj);
export const deleteUser = (id) => apiInstance.delete(subMainRoutePath + `/${id}`);