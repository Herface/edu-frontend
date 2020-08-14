import request from '~/utils/request';
const BASE_URL = "http://192.168.1.3:8089";


export default {
    getPlayAuthByVid(vid){
        return request.request({
            method: "GET",
            // baseURL: BASE_URL,
            url: `/edu/chapter/video/${vid}`,
        });
    }
}