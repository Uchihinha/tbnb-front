/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Update Product', () => {
	beforeEach(() => {
		cy.intercept('GET', `${Cypress.env('apiUrl')}/products?page=1&paginate=15&order=asc&order_field=id&search=`).as('getProducts');
		cy.intercept('GET', `${Cypress.env('apiUrl')}/products/*`).as('findProduct');

		cy.visit('/products');

		cy.wait('@getProducts').its('response.statusCode').should('be.oneOf', [200]);
		cy.get(':nth-child(1) > .el-table_1_column_7 > .cell > :nth-child(2)').click();

		cy.wait('@findProduct').its('response.statusCode').should('be.oneOf', [200]);
	});

	it('update name', () => {
		cy.url().then(urlString => {
			cy.intercept('PUT', `${Cypress.env('apiUrl')}/products/${urlString.split('/')[4]}`).as('updateUser');
		});

		cy.get('.el-form > :nth-child(1) > .el-form-item__content > .el-input > input').clear().type('Updated Name');

		cy.get('.el-form-item__content > .el-button--primary').click();

		cy.wait('@updateUser').its('response.statusCode').should('be.oneOf', [200]);

		cy.get('.el-notification__title').should('contain', 'Success');
	});

	it('invalid name length', () => {
		cy.get('.el-form > :nth-child(1) > .el-form-item__content > .el-input > input').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper libero neque, vel molestie metus venenatis nec. Cras vehicula massa ex, eu molestie dolor pharetra at. Etiam posuere blandit tortor, eu tempus mi aliquet vel. Donec ultrices diam a ultrices commodo. Phasellus egestas posuere purus, scelerisque lacinia mauris tempor ac. Praesent id lacinia nisl. Aenean a nunc in augue porttitor fringilla quis id velit. Proin id elit felis.');

		cy.get('.el-form-item__error').should('contain', 'Length should be 3 to 50');
	});

	it('empty name', () => {
		cy.get('.el-form > :nth-child(1) > .el-form-item__content > .el-input > input').clear();

		cy.get('.el-form-item__error').should('contain', 'This field is required');
	});

	it('get stock history', () => {
		cy.url().then(urlString => {
			cy.intercept('GET', `${Cypress.env('apiUrl')}/products/${urlString.split('/')[4]}/history`).as('getHistory');
		});

		cy.get('.product-container__title--icon > .el-button').click();

		cy.wait('@getHistory').its('response.statusCode').should('be.oneOf', [200]);

		cy.get('.el-dialog__header').should('contain', 'Stock History');
	});
});
