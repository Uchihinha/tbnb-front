import request from '../request';

export function bulkUpdateProduct(params) {
	return request.put('/products/bulk', params);
}