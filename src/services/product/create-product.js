import request from '../request';

export function createProduct(data) {
	return request.post('/products', data);
}