import request from '@/utils/request';

export function getChapterByCourseId(chapterId){
    return request({
        url: `/edu/admin/chapter/tree/${chapterId}`,
        method: "get",
    })
}

export function getChapterById(id){
    return request({
        url: `/edu/admin/chapter/${id}`,
        method: "get"
    });
}
export function saveChapter(chapter){

    return request({
        url: `/edu/admin/chapter`,
        method: "post",
        data: chapter,
    });
}

export function updateChapter(chapter){
    return request({
        url: `/edu/admin/chapter/${chapter.id}`,
        method: "put",
        data: chapter,
    });
}

export function deleteChapterById(id){
    return request({
        url: `/edu/admin/chapter/${id}`,
        method: "delete",
    });
}