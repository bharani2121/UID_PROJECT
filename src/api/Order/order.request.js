import apiInstance from "../apiInstance";

const saveOrder = (payload) =>{
    return apiInstance
        .post(`/orders`, payload)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
};

const getUserOrders = (buyer) =>{
    return apiInstance
        .get(`/orders/users/${buyer}`)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
}

const getUserOrder = (id) =>{
    return apiInstance
        .get(`/orders/${id}`)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
}

const updateOrderDetails = (id, payload) =>{
    return apiInstance
        .put(`/orders/${id}`, payload)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
}

const deleteOrderDetails = (id) =>{
    return apiInstance
        .delete(`/orders/${id}`)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
}

const getOrderRequests = (seller) =>{
    return apiInstance
        .get(`/orders/requests/${seller}`)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
}

const getOrderReport = (dateRange) =>{
    return apiInstance
        .post(`/orders/report`, dateRange)
        .then((response) =>{
            return response;
        })
        .catch((error) =>{
            return error;
        })
}

const orderRequest = {
    saveOrder,
    getUserOrders,
    getUserOrder,
    updateOrderDetails,
    deleteOrderDetails,
    getOrderRequests,
    getOrderReport
}

export default orderRequest;