// A class for Auth0
import auth0 from 'auth0-js'; 
import { authConfig } from '../config'; 

// Reference: https://auth0.com/docs/libraries/auth0js/v9

export default class Auth {
    // class's properties: 
    accessToken; 
    idToken; 
    expiresAt; 

    // initialize new instance of auth0
    auth0 = new auth0.WebAuth({
        domain: authConfig.domain, 
        clientID: authConfig.clientId, 
        redirectUri: authConfig.callbackUrl, 
        responseType: 'token id_token', 
        scope: 'openid'
    }); 

    constructor(history) {
        this.history = history

        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this); 
        this.handleAuthentication = this.handleAuthentication.bind(this); 
        this.isAuthenticated = this.isAuthenticated.bind(this); 
        this.getAccessToken = this.getAccessToken.bind(this); 
        this.getIdToken = this.getIdToken.bind(this); 
        this.renewSession = this.renewSession.bind(this); 
    }

    // class's methods: 
    login() {
        this.auth0.authorize(); 
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('Access token: ', authResult.accessToken); 
                console.log('id token: ', authResult.idToken); 
                this.setSession(authResult); 
            } else if (err) {
                // navigate to home route: 
                this.history.replace('/'); 
                console.log(err); 
                alert(`Error: ${err.error}. Check the console for further details.`); 
            }
        });
    }

    setSession(authResult) {
        // set key 'isLoggedIn' flag in localStorage
        localStorage.setItem('isLoggedIn', 'true'); 

        // set time that the access token will expire at: 
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime(); 
        this.accessToken = authResult.accessToken; 
        this.idToken = authResult.idToken; 
        this.expiresAt = expiresAt; 

        // navigate to home route: 
        this.history.replace('/'); 
    }

    getAccessToken() {
        return this.accessToken; 
    }

    getIdToken() {
        return this.idToken; 
    }

    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult); 
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    logout() {
        // remove tokens and expiry time: 
        this.accessToken = null;
        this.idToken = null; 
        this.expiresAt = 0;

        // remove the key 'isLoggedIn' flag from localStorage: 
        localStorage.removeItem('isLoggedIn');

        this.auth0.logout({
            return_to: window.location.origin,
        }); 

        // return back to home route: 
        this.history.replace('/'); 
    }

    // check whether the current time is past the access token's expired time: 
    isAuthenticated() {
        let expiresAt = this.expiresAt; 
        return new Date().getTime() < expiresAt; 
    }
}