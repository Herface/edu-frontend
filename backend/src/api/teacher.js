import request from '@/utils/request';
export default {
    getList(page,size){
        return request({
            url: `/edu/admin/teacher/${page}/${size}`,
            method: "get"
        });
    },
    getAllList(){
        return request({
            url: `/edu/admin/teacher`,
            method: "get"
        });
    },
    getById(id){
        return request({
            url:`/edu/admin/teacher/${id}`,
            method: "get"
        })
    },
    add(teacher){
        return request({
            url: "/edu/admin/teacher",
            method: "post",
            data: teacher,
        });
    },
    update(teacher){
        return request({
            url: `/edu/admin/teacher/${teacher.id}`,
            method: "put",
            data: teacher
        });
    },
    deleteById(id){
        return request({
            url: `/edu/admin/teacher/${id}`,
            method: "delete"
        });
    },
    getListByCondition(condition,page,size){
        return request({
            url: `/edu/admin/teacher/condition/${page}/${size}`,
            method: "post",
            data: condition,
        });

    }
}
