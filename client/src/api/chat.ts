import request from '../utils/request';

// Get Chat Node
export function getNode(data: any) {
  return request({
    url: '/navigateNode',
    method: 'POST',
    data,
  });
}
