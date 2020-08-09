import request from '~/utils/request';

export default {
    listCommentPageByCourseId(courseId,page,limit){
        return request({
            // baseURL: BASE_URL,
            url: `/edu/comment/course/${courseId}/page/${page}/${limit}`,
            method: "GET"
        });

    },
    addComment(comment){
        return request({
            // baseURL: BASE_URL,
            url: `/edu/comment`,
            method: "POST",
            data: comment,
        });

    }
}