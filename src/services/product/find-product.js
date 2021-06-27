import request from './request';

export function findProduct(id) {
	return request.get(`/products/${id}`);
}