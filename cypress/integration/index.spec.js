/// <reference types="cypress" />

const URL = "http://192.168.0.10:8080";

describe("Test de memotest", () => {
    before(() => {
        cy.visit(URL);
    });

    it ("apreta el boton", () => {
        cy.get("button").click();
    });
});