import request from '~/utils/request';

export default {
    getBannerList(){
        return request.get("/banner");
    }
}