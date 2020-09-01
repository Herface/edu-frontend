import request from '~/utils/request';

export default {

    globalSearch(kw){
        return request({
            url: "/edu/search?kw="+kw,
            method: "GET"
        });
    }
}