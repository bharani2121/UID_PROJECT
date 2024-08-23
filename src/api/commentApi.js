import apiInstance from "./apiInstance";

let subMainRoutePath = '/comments';

export const addComment = (commentObj) => apiInstance.post(subMainRoutePath, commentObj);
export const getComments = (questionId) => apiInstance.get(subMainRoutePath + `/${questionId}`);
export const deleteComment = (commentId) => apiInstance.delete(subMainRoutePath + `/${commentId}`);