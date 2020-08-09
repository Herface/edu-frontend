import request from '@/utils/request';

export function saveCourseInfo(courseInfo){
    return request({
        url: "/edu/admin/course",
        method: "post",
        data: courseInfo,
    });
}


export function updateCourseInfo(courseInfo){
    return request({
        url: `/edu/admin/course/${courseInfo.id}`,
        method: "put",
        data: courseInfom
    });
}
export function getCourseInfoById(id){
    return request({
        url: `/edu/admin/course/${id}`,
        method: "get"
    });
}

export function getCoursePage(page,size){
    return request({
        url: `/edu/admin/course/page/${page}/${size}`,
        method: "get"
    });
}
export function getCoursePageByCondition(page,size,condition){
    return request({
        url: `/edu/admin/course/condition/${page}/${size}`,
        method: "post",
        data: condition,
    });
}

export function deleteCourseById(id){
    return request({
        url: `/edu/admin/course/${id}`,
        method: "delete"
    })
}
export function publishCourseById(id){
    return request({
        url: `/edu/admin/course/publish/${id}`,
        method: "post"
    });
}

export function getPublishCourseById(id){
    return request({
        url: `/edu/admin/course/publish/${id}`,
        method: "get"
    });
}