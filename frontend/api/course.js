import request from '~/utils/request';

export default {
    getCourseListPageByCondition(condition,page,size){
        return request.request({
            // baseURL: BASE_URL,
            url: `/edu/course/condition/${page}/${size}`,
            method: "post",
            data: condition
        });
    },

    getSubjectTree(){
        return request.request({
            // baseURL: BASE_URL,
            url: "/edu/subject/tree",
            method: "get"
        });
    },
    getCourseById(id){
        return request.request({
            // baseURL: BASE_URL,
            url: `/edu/course/${id}`,
            method: "get"
        });
    },
    incrementViewCountByCourseId(courseId){
        return request({
            url: `/edu/course/viewCount/${courseId}`,
            method: "post"
        });
    }
}