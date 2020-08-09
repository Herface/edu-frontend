import memberApi from '~/api/member';

export const state = ()=> ({
    userInfo: null
})

export const mutations = {
    setUser(state, userInfo){
        state.userInfo = userInfo;
    }
}
export const getters = {
    userInfo(state){
        return state.userInfo;
    }
}

export const actions = {
    getUserInfoByToken({commit}, token){
        return memberApi.getUserInfoByToken(token).then(res=>{
            commit("setUser",res.data.userInfo);
            return Promise.resolve();
        });

    },
    logout({commit}){
        commit("setUser",null);
    },

}