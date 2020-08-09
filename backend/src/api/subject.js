import request from '@/utils/request';

export function getSubjectList(){
    return request({
        url: "/edu/subject/tree",
        method: "get"
    });
}