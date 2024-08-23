import apiInstance from "./apiInstance";

let subMainRoutePath = '/questions';

export const createQuestion = (questionObj) => apiInstance.post(subMainRoutePath, questionObj);
export const getAllQuestions = () => apiInstance.get(subMainRoutePath);
export const getQuestionById = (id) => apiInstance.get(subMainRoutePath + `/${id}`);
export const updateQuestionById = (id, questionObj) => apiInstance.put(subMainRoutePath + `/${id}`, questionObj);
export const deleteQuestionById = (id) => apiInstance.delete(subMainRoutePath + `/${id}`);
export const getTags = (dateRange) => apiInstance.post('/tags', dateRange);