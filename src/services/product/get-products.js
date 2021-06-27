import request from './request';

export function getProducts(page = 1, paginate = 20) {
	return request.get(`/products?page=${page}&paginate=${paginate}`);
}