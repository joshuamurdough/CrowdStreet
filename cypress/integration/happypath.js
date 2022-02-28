/// <reference types='Cypress' />

describe('Happy path for CrowdStreet', function () {
    this.beforeEach(function() {
        cy.visit('https://test.crowdstreet.com/')  //go to home page
        cy.title().should('eq', 'Marketplace | CrowdStreet')  // page title is correctfor the desired page

    })

    it('Run basic flow', function() {
        cy.get('.join-button').contains('Create An Account').click({force: true})  //Click on Create An Account button  Force used because button is covered
        cy.title().should('eq', 'Create Account | CrowdStreet')  // page title is correctfor the desired page

        //cy.intercept('POST', '/create-account', { fixture: 'create-account.json'}).as('create-account')

/*  Complete Form */

        cy.get('.text-sm').contains("First name").click({force:true}) // forced click to trigger the script
        cy.get('[id^=firstName]').type('Joe')  // type first name
        cy.get('.text-sm').contains("Last name").click({force:true}) // forced click to trigger the script
        cy.get('[id^=lastName]').type('Jones')  // type last name
        cy.get('.text-sm').contains("Email address").click({force:true}) // forced click to trigger the script
        cy.get('[id^=email]').type('joe@jones4.com')  //type email
        cy.get('.text-sm').contains("Password").eq(0).click({force:true}) // forced click to trigger the script
        cy.get('[id^=password]').type('G4rbl3d!')  // type password
        cy.get('.text-sm').contains("Confirm Password").click({force:true}) // forced click to trigger the script
        cy.get('[id^=confirmPassword]').type('G4rbl3d!') // type confirmation
        cy.get('[id^=accreditedNo]').click()  // click not accredited
        cy.get('[id^=hasAgreedTos]').click() // agree to Tos

        /* simulated submission to get around recaptcha. Cypress does not handle iframes well.  Will yeild a 500 response if email exists*/

        cy.request('POST', 'https://test.crowdstreet.com/invexp/investorexperience-unauth/auth/create-account?', {
            "firstName": "Joe",
            "lastName": "Jones",
            "email": "joe@jones.net",
            "password": "G4rbl3d!",
            "isAccredited": false,
            "hasAgreedTos": true,
            "recaptchaResponse": "03AGdBq24Xpd3S_tt7lzycn9DqDNrr5YA6VVkVoagsJGtb0uUoQ2ZTwAeQt8OgB7fRZxmnOtg8w8TvRhgrDGIRaqRIezLV5UvTpOCva7TTSMKQzdetheLFLaePH2NLmZdE1_N9MhMik3H0bnjIWZw2tmBAioECLjBcWbgBAZHI0rWpDE4XFhTOf7L-9gJI4uU9pXY95-uAvOp1vXbzxnFQ-hlgd072-koWTV0ZIWHGsqZFhFy8EiDoNoDZVn-xXW0G6p0_ORpCS3G5iPrX98Pqaes8HqQ_X5r9wiDRYdZ3p9XqbAdkZGkDYhgtRxlsKlAREQIyu-FdQl5Jn9pr4BbbSHndLr6mrbI0SW2NkKVfJc1s1XXnlgqlSf9xag-B0V_C-_x_JUvywkJR2cEwim9gEwXhEjQiDiIhbJtRoscvcnMjay79hn2qHYU"
        })
        cy.visit('https://test.crowdstreet.com/invexp/properties/all')

        /* end of simulated click on submit */

        cy.get('.head-link').should('exist').and('be.visible').contains('Hi Joe')  //Ensure Joe is logged in

    })
})