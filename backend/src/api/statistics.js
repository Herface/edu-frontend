import request from '@/utils/request';

// const BASE_URL = "http://192.168.1.3:8001"

export default {
    getStatisticsBetween(begin,end){

        return request({
            // baseURL: BASE_URL,
            url: `/statistics/stat/${begin}/${end}`,
            method: "get"
        });

    }
}