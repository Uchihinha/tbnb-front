/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Product List', () => {
	beforeEach(() => {
		cy.intercept('GET', `${Cypress.env('apiUrl')}/products?page=1&paginate=15&order=asc&order_field=id&search=`).as('getProducts');
		cy.visit('/products');
	});

	it('get list', () => {
		cy.wait('@getProducts').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('search', () => {
		cy.intercept('GET', `${Cypress.env('apiUrl')}/products?page=1&paginate=15&order=asc&order_field=id&search=Lorem`).as('getSearch');

		cy.get('.el-input__inner').type('Lorem');

		cy.wait('@getSearch').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('order by id', () => {
		cy.get('.has-gutter > tr > .el-table_1_column_2 > .cell').click();

		cy.wait('@getProducts').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('order by name', () => {
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=asc&order_field=name&search=').as('getOrderName');
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=desc&order_field=name&search=').as('getOrderNameDesc');

		cy.get('.has-gutter > tr > .el-table_1_column_3 > .cell').click();

		cy.wait('@getOrderName').its('response.statusCode').should('be.oneOf', [200]);

		cy.get('.has-gutter > tr > .el-table_1_column_3 > .cell').click();

		cy.wait('@getOrderNameDesc').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('order by created_at', () => {
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=asc&order_field=created_at&search=').as('getOrderCreateAt');
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=desc&order_field=created_at&search=').as('getOrderCreateAtDesc');

		cy.get('.has-gutter > tr > .el-table_1_column_4 > .cell').click();

		cy.wait('@getOrderCreateAt').its('response.statusCode').should('be.oneOf', [200]);

		cy.get('.has-gutter > tr > .el-table_1_column_4 > .cell').click();

		cy.wait('@getOrderCreateAtDesc').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('order by price', () => {
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=asc&order_field=price&search=').as('getOrderPrice');
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=desc&order_field=price&search=').as('getOrderPriceDesc');

		cy.get('.has-gutter > tr > .el-table_1_column_5 > .cell').click();

		cy.wait('@getOrderPrice').its('response.statusCode').should('be.oneOf', [200]);

		cy.get('.has-gutter > tr > .el-table_1_column_5 > .cell').click();

		cy.wait('@getOrderPriceDesc').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('order by stock_quantity', () => {
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=asc&order_field=stock_quantity&search=').as('getOrderStockQuantity');
		cy.intercept('GET', '/api/products?page=1&paginate=15&order=desc&order_field=stock_quantity&search=').as('getOrderStockQuantityDesc');

		cy.get('.has-gutter > tr > .el-table_1_column_6 > .cell').click();

		cy.wait('@getOrderStockQuantity').its('response.statusCode').should('be.oneOf', [200]);

		cy.get('.has-gutter > tr > .el-table_1_column_6 > .cell').click();

		cy.wait('@getOrderStockQuantityDesc').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('redirect to create product', () => {
		cy.get('.is-round').click();

		cy.url().should('eq', Cypress.config().baseUrl + '/products/new');
	});
});
