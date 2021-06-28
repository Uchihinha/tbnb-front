import request from '../request';

export function getProducts({ currentPage = 1, paginate = 20, order = 'asc', orderField = 'id', search = '' }) {
	return request.get(`/products?page=${currentPage}&paginate=${paginate}&order=${order}&order_field=${orderField}&search=${search}`);
}