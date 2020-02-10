//
//
// declare global {
//   namespace Cypress {
//     interface Chainable<Response> {
//       /**
//        * Login using /api/auth/login request to get access_token
//        *
//        * @example
//        * cy.login(Credentials);
//        */
//       login(): Chainable<Response>;
//
//       /**
//        * Logout: remove access token
//        *
//        * @example
//        * cy.logout();
//        */
//       logout(): Chainable<Response>;
//
//       /**
//        * Takes user body. Could be used for creating meetings
//        * @example
//        * cy.getUser(1);
//        */
//       getUser(userID: number): Chainable<Response>;
//
//       /**
//        * Takes all users on organization, allocate by appropriate groups(admin, manager, user)
//        * after that logged as random user from specified group
//        * @example
//        * cy.loginWithRole('admin');
//        */
//
//       loginWithRole(role: string): Chainable<Response>;
//
//     }
//   }
// }
//
// const loggedInRequest = new LoggedInRequest();
// Cypress.Commands.overwrite('request', loggedInRequest.loggedInRequest.bind(loggedInRequest));
// Cypress.Commands.add('login', loggedInRequest.login.bind(loggedInRequest));
// Cypress.Commands.add('logout', loggedInRequest.logout.bind(loggedInRequest));
// Cypress.Commands.add('getUser', loggedInRequest.getUser.bind(loggedInRequest));
// Cypress.Commands.add('loginWithRole', loggedInRequest.loginWithRole.bind(loggedInRequest));
