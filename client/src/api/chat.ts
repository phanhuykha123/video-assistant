import request from '../utils/request';

// Get Chat Node
export function getNode(data: any) {
  return request({
    url: '/navigateNode',
    method: 'POST',
    data,
  });
}

export function orderItem(data: any) {
  return request({
    url: '/order',
    method: 'POST',
    data,
  });
}

export function createNewUser(data: any) {
  return request({
    url: '/user',
    method: 'POST',
    data,
  });
}
