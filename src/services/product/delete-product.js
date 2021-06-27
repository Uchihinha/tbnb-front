import request from '../request';

export function deleteProduct(id) {
	return request.delete(`/products/${id}`);
}