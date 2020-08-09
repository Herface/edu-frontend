import request from '~/utils/request';
// const BASE_URL = "http://192.168.1.3";

export default {
    getIndexData(){
        return request({
            method: "get",
            url: "/edu/index",
            // baseURL: BASE_URL,
        });
    }
}