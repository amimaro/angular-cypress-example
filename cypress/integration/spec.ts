describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('mat-form-field').contains('Search TODO');
    cy.get('mat-selection-list').should('be.empty');
  });
  it('Fetches Todos data', () => {
    cy.intercept('https://jsonplaceholder.typicode.com/todos').as('getTodos');
    cy.wait('@getTodos').then((todosIntercepted) => {
      const todoList = todosIntercepted.response?.body;
      expect(todoList).to.be.a('array');
      cy.get('mat-list-option').each((option, index) => {
        const todoMatches = option[0].innerText === todoList[index].title;
        expect(todoMatches).to.be.true;
      });
    });
  });
  it('Filter Todos', () => {
    const filter = 'delectus aut autem';
    cy.get('input').type(filter);
    cy.get('mat-list-option').each((option, index) => {
      const todoMatches = option[0].innerText.indexOf(filter) >= 0;
      expect(todoMatches).to.be.true;
    });
  });
  it('Navigate to about page', () => {
    cy.get('button').contains('About').click();
    cy.get('body').contains('about works!');
  });
});
