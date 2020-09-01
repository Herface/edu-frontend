import request from '~/utils/request';


export default {
    listSeckills(){
        return request({
            url: "/order/seckill",
            method: "get"
        });
    },
    doSeckill(seckillId){
        return request({
            url: `/order/seckill/${seckillId}`,
            method: "post"
        });
    }
}