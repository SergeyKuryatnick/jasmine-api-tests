/// <reference types="cypress" />
/// <reference types="@bahmutov/cy-api" />

import Chainable = Cypress.Chainable;
import Response = Cypress.Response;


export class LoggedInRequest {
    private userToken = null;
    private deviceToken = null;

    getDeviceToken(): Chainable<Response> {
        return cy.api({
            method: 'GET',
            url: 'DEVICE_TOKEN_URL'
        }).then((response: Response) => {
            const {body} = response;
            this.deviceToken = body.result.token;
            return;
        })
    }
    login(): Chainable<Response> {
        if (this.deviceToken === null){
            this.getDeviceToken()
        }

        return cy.api({
            method: 'POST',
            url: 'LOGIN_URL',
            form: true,
            body: {
                'device_token': this.deviceToken,
                'password': 'USER_PASS',
                'user': 'USER_EMAIL'
            }
        }).then((response: Response) => {
            const {body} = response;
            this.userToken = body.result.token;
            return;
        })
    }
}