/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Create Product', () => {
	beforeEach(() => {
		cy.visit('/products/new');
	});

	it('valid request', () => {
		cy.intercept('POST', `${Cypress.env('apiUrl')}/products`).as('createUser');

		cy.get('.el-form > :nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('Product Test Name');
		cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('Product Description Name');
		cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('123123');
		cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('123123');
		cy.get(':nth-child(1) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner').type('1000');
		cy.get('.el-input-number > .el-input > .el-input__inner').type('10');

		cy.get('.el-button--primary').click();

		cy.wait('@createUser').its('response.statusCode').should('be.oneOf', [201]);

		cy.get('.el-notification__title').should('contain', 'Success');
	});

	it('empty form validation', () => {
		cy.get('.el-button--primary').click();

		cy.get(':nth-child(1) > .el-form-item__content > .el-form-item__error').should('contain', 'This field is required');
		cy.get(':nth-child(2) > .el-form-item__content > .el-form-item__error').should('contain', 'This field is required');
	});

	it('invalid barcode length', () => {
		cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('11111111111111');

		cy.get('.el-form-item__error').should('contain', 'Length should not be greater than 13 characters');
	});

	it('negative price', () => {
		cy.intercept('POST', `${Cypress.env('apiUrl')}/products`).as('createUser');

		cy.get('.el-form > :nth-child(1) > .el-form-item__content > .el-input > .el-input__inner').type('Product Test Name');
		cy.get(':nth-child(2) > .el-form-item__content > .el-input > .el-input__inner').type('Product Description Name');
		cy.get(':nth-child(3) > .el-form-item__content > .el-input > .el-input__inner').type('123123');
		cy.get(':nth-child(4) > .el-form-item__content > .el-input > .el-input__inner').type('123123');
		cy.get(':nth-child(1) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner').type('-1000');
		cy.get('.el-input-number > .el-input > .el-input__inner').type('10');

		cy.get('.el-button--primary').click();

		cy.wait('@createUser').its('response.statusCode').should('be.oneOf', [422]);

		cy.get('.el-notification__title').should('contain', 'Error');
		cy.get('p').should('contain', 'The price must be at least 0.01.');
	});
});
