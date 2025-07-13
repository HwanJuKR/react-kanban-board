/* global cy */
describe("칸반보드 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("제목이 표시되는지 확인", () => {
    cy.contains("칸반보드").should("be.visible");
  });

  it("추가하기 버튼 클릭", () => {
    cy.get("[data-testid='addButton']").click();
    cy.get("[data-testid='addInput']").type("테스트");
    cy.get("[data-testid='addPopupButton']").click();
    cy.get("[data-testid='toDo-column']").should("contain", "테스트");
  });

  it("toDo 확인 및 삭제 테스트", () => {
    cy.get("[data-testid='addButton']").click();
    cy.get("[data-testid='addInput']").type("테스트");
    cy.get("[data-testid='addPopupButton']").click();
    cy.get("[data-testid='toDo-column']").should("contain", "테스트");

    cy.get("[data-testid='toDo-column']")
      .contains("테스트")
      .parent()
      .find("button")
      .contains("삭제")
      .click();

    cy.get("[data-testid='toDo-column']").should("not.contain", "테스트");
  });

  it("초기화 버튼 테스트", () => {
    cy.get("[data-testid='allDelButton']").click();
  
    cy.get("[data-testid='toDo-column'] [data-testid='card']").should("not.exist");
    cy.get("[data-testid='inProgress-column'] [data-testid='card']").should("not.exist");
    cy.get("[data-testid='done-column'] [data-testid='card']").should("not.exist");
  });
});