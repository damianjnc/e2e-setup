describe('Login', () => {
  it.only('lets up to log in', () => {
    cy.server()

    cy.route({
      method: 'POST',
      url: '/login',
      response: '{"result": "login success"}',
      status: 200,
    })

    cy.fixture('foods').as('foodlist')

    cy.route({
      method: 'GET',
      url: '/food/list',
      response: '@foodlist',
      status: 200,
    })

    cy.visit('http://localhost:3000')
      .get('#username')
      .should('exist')
      .type('cow')

    cy.get('#password').type('moo')

    cy.get('[data-cy-login-button]').click()

    cy.get('[data-cy-food-name="Avacado"]').should('exist')
  })

  it('it should fail', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: '/login',
      response: '',
      status: 401,
    })
    cy.visit('http://localhost:3000')
      .get('#username')
      .should('exist')
      .type('cow')

    cy.get('#password').type('ddsmoo')

    cy.get('[data-cy-login-button]').click()

    cy.contains('Login Failed')
  })
})
