describe('Upload de arquivos', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/upload');
  });

  it('Upload de arquivo usando o botão "Choose File"', () => {
    const filePath = 'imagens/teste.jfif'; 
    cy.get('#file-upload').selectFile(filePath);
    cy.get('#file-submit').click();
    cy.get('h3').should('contain', 'File Uploaded!');
  });

  it('Upload de arquivo arrastando e soltando', () => {
    const filePath = 'imagens/teste.jfif'; 
    cy.get('#drag-drop-upload').selectFile(filePath , {action: 'drag-drop',});
    cy.get('#file-submit').click()
    cy.get('h3').should('contain', 'File Uploaded!');
  });

  it('Upload de uma sequência de arquivos', () => {
    const filePaths = ['imagens/teste.jfif', 'imagens/teste1.jfif'];
    cy.get('#drag-drop-upload').selectFile(filePaths , {action: 'drag-drop',});
    cy.get('#file-submit').click()
    cy.get('h3').should('contain', 'File Uploaded!');
  });
});