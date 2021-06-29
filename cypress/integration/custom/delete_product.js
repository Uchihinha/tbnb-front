/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Delete Product', () => {
	beforeEach(() => {
		cy.intercept('GET', `${Cypress.env('apiUrl')}/products?page=1&paginate=15&order=asc&order_field=id&search=`).as('getProducts');

		cy.visit('/products');

		cy.wait('@getProducts').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('delete product', () => {
		cy.get('tbody > :nth-child(1) > .el-table_1_column_2 > .cell').then(res => {
			cy.intercept('DELETE', `${Cypress.env('apiUrl')}/products/${res.text()}`).as('deleteProduct');

			cy.get(':nth-child(1) > .el-table_1_column_7 > .cell > .el-button--danger').click();
			cy.get('.el-message-box__btns > .el-button--primary').click();

			cy.wait('@deleteProduct').its('response.statusCode').should('be.oneOf', [200]);

			cy.get('.el-notification__title').should('contain', 'Success');

			cy.get('tbody > :nth-child(1) > .el-table_1_column_2 > .cell').contains(res.text()).should('not.exist');
		});
	});
});
