import request from '@/utils/request'

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
    },
    deleteById(seckillId){
        return request({
            url: `/order/seckill/${seckillId}`,
            method: "delete"
        });
    },

    update(seckill){
        return request({
            url: `/order/seckill/${seckill.seckillId}`,
            method: "put",
            data: seckill
        });
    },
    add(seckill){
        return request({
            url: `/order/seckill`,
            method: "post",
            data: seckill
        });
    },

    getById(id){
        return request({
            url: `/order/seckill/${id}`,
            method: "get"
        });
    }


}