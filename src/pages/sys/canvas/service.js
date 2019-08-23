import {request} from '@utils';

export function fetch(payload) {
    return request(`/getCanvasContent`, {
        method: 'POST',
        body: JSON.stringify({
            ...payload
        }),
    });
}
export function getDefects(payload) {
    return request(`/getDefects`, {
        method: 'GET',
    });
}