import request from '~/utils/request';
// const BASE_URL = "http://192.168.1.3:84";

export default {
    createOrderByCourseId(courseId){
        return request.request({
            method: "POST",
            url: `/order/order/course/${courseId}`,
            // baseURL: BASE_URL,
        });
    },
    getOrderById(id){
        return request.request({
            method: "get",
            url: `/order/order/${id}`,
            // baseURL: BASE_URL,
        });
    },
    getQRCodeByOrderId(orderId){
        return request.request({
            // baseURL: BASE_URL,
            url: `/order/order/qrcode/${orderId}`,
            method: "GET"
        });
    },
    getOrderStatusByOrderNo(orderNo){
        return request.request({
            // baseURL: BASE_URL,
            url: `/order/order/status/${orderNo}`,
            method: "get"
        });
    },
    getOrderListByUserId(userId){
        return request({
            // baseURL: BASE_URL,
            url: `/order/order/user/${userId}`,
            method: "GET"
        });
    },
    deleteOrderById(id){
        return request({
            url: `/order/order/${id}`,
            method: "DELETE"
        });
    }
}