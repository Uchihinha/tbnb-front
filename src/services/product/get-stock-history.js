import request from '../request';

export function getStockHistory(id) {
	return request.get(`/products/${id}/history`);
}