describe('Formulário de Login', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  const login = (username, password) => {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
  };

  const assertErrorMessage = (expectedMessage) => {
    cy.get('#flash').should('contain', expectedMessage);
  };

  it('deve exibir mensagem de erro ao não informar o username', () => {
    login(' ', 'senhaqualquer');
    assertErrorMessage('Your username is invalid!');
  });

  it('deve exibir mensagem de erro ao não informar a senha', () => {
    login('nicknamequalquer', ' ');
    assertErrorMessage('Your username is invalid!');
  });

  it('deve realizar login com sucesso', () => {
    login('tomsmith', 'SuperSecretPassword!');
    cy.get('#flash').should('contain', 'You logged into a secure area!');
  });

  it('deve exibir mensagem de erro ao informar credenciais incorretas', () => {
    login('nicknameincorreto', 'senhaincorreta');
    assertErrorMessage('Your username is invalid!');
  });

  it('deve exibir mensagem de erro ao tentar acessar URL de área logada diretamente', () => {
    cy.visit('https://the-internet.herokuapp.com/secure');
    cy.get('#flash').should('contain', 'You must login to view the secure area!');
  });
});
