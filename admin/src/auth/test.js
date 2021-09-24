import request from '../utils/request';

//Create User
export function getInfo(options) {
  return request({
    url: '/test',
    method: 'GET',
    ...options
  });
}
