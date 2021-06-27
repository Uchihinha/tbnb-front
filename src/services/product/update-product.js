import request from './request';

export function updateProduct(id, params) {
	return request.put(`/products/${id}`, params);
}