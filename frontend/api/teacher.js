import request from '~/utils/request';
const BASE_URL = "http://192.168.1.3";

export default {
    getTeacherListPage(page,size){
        return request.request({
            // baseURL: BASE_URL,
            url: `/edu/teacher/page/${page}/${size}`,
            method: "get"
        });
    },
    getTeacherById(id){
        return request.request({
            // baseURL: BASE_URL,
            url: `/edu/teacher/${id}`,
            method: "get"
        });
    }
}