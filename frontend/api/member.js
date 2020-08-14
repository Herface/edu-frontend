import request from '~/utils/request';
// const BASE_URL = "http://192.168.1.3:8150/member";

export default {
    login(member){
        return request({
            // baseURL: BASE_URL,
            method: "POST",
            url: "/ucenter/member/login",
            data: member
        });        
    },
    register(member){
        return request({
            // baseURL: BASE_URL,
            method: "POST",
            url: "/ucenter/member/register",
            data: member
        });
    },
    getCode(mobile){
        return request({
            // baseURL: "http://192.168.1.3:82",
            method: "POST",
            url: `/ucenter/member/reg/sms/${mobile}`,
        });

    },
    getUserInfoByToken(token){
        return request({
            // baseURL: BASE_URL,
            url: `/ucenter/member/token/${token}`,
            method: "get"
        });

    },
    updateUserInfo(userInfo){
        return request({
            // baseURL: BASE_URL,
            url: `/ucenter/member/${userInfo.id}`,
            method: "put",
            data: userInfo,
        });
    },
    updatePsw(id,body){
        return request({
            // baseURL: BASE_URL,
            url: `/ucenter/member/password/${id}`,
            method: "PUT",
            data: body,
        });
    }
}
