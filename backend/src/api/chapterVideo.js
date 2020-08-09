import request from '@/utils/request';

export function getChapterVideoById(id){
    return request({
        url: `/edu/admin/chapter/video/${id}`,
        method: "get"
    })
}

export function saveChapterVideo(video){
    return request({
        url: `/edu/admin/chapter/video`,
        method: "post",
        data: video,
    });
}

export function updateChapterVideo(video){
    return request({
        url: `/edu/admin/chapter/video/${video.id}`,
        method: "put",
        data: video,
    });
}

export function deleteChapterVideoById(id){
    return request({
        url: `/edu/admin/chapter/video/${id}`,
        method: "delete",
    });
}

export function deleteVideoSourceById(id){
    return request({
        // baseURL: "http://192.168.1.3:8089",
        url: `/edu/admin/chapter/video/source/${id}`,
        method: "delete"
    });
}