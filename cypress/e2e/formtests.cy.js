describe('form test', () => {
  beforeEach(()=>{
    cy.visit("http://localhost:3000")
    cy.get(`a[id=order-pizza]`).click()
  })
  const nameInput=()=>cy.get(`input[id=name-input]`)
  const sizeInput=()=>cy.get(`select[id=size-dropdown]`)
  const pepperoniCheckbox=()=>cy.get("input[value=pepperoni]")
  const sausageCheckbox=()=>cy.get("input[value=sausage]")
  const pineappleCheckbox=()=> cy.get("input[value=pineapple]")
  const submitBtn = ()=> cy.get(`button[id=order-button]`)

  it("sanity check for test software", ()=>{
    expect(true).to.equal(true)
    expect(1+1).to.equal(2)
  })

  it("tests to check if elements exist", ()=>{
    nameInput().should("exist");
    sizeInput().should("exist");
    pepperoniCheckbox().should("exist");
    sausageCheckbox().should("exist");
    pineappleCheckbox().should("exist");
    submitBtn().should("exist");
})

  it("form filling test", ()=>{
    nameInput()
    .should("have.value","")
    .type("John Abdou")
    .should("have.value","John Abdou")
  sizeInput()
    .should("have.value", "")
    .select("Large")
    .should("have.value", "L")
  pepperoniCheckbox()
    .should('not.be.checked')
    .check()
    .should('be.checked')
  pineappleCheckbox()
    .should('not.be.checked')
    .check()
    .should('be.checked')    
  sausageCheckbox()
    .should('not.be.checked')
    .check()
    .should('be.checked') 
  })

  it("form submission test", ()=> {
    submitBtn()
    .should("be.disabled")
    nameInput()
      .type("John Abdou")
    sizeInput()
      .select("Large")
    pepperoniCheckbox()
      .check()
    pineappleCheckbox()
      .check()
    sausageCheckbox()
      .check()
    submitBtn()
      .should("not.be.disabled")
    submitBtn()
      .click()
    nameInput()
      .should("have.value", "")
    sizeInput()
      .should("have.value", "")
    sausageCheckbox()
      .should('not.be.checked')
  })

})
