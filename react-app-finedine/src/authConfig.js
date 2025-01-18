import { LogLevel } from "@azure/msal-browser";

/**
 * Enter here the user flows and custom policies for your B2C application.
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_SignUpSignIn'
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://finedineProd.b2clogin.com/finedineProd.onmicrosoft.com/B2C_1_SignUpSignIn',
        },
        resetPassword: {
            authority: 'https://finedineProd.b2clogin.com/finedineProd.onmicrosoft.com/B2C_1_ResetPassword',
        },
        editProfile: {
            authority: 'https://finedineProd.b2clogin.com/finedineProd.onmicrosoft.com/B2C_1_EditProfile',
        },
    },
    authorityDomain: 'finedineProd.b2clogin.com'
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 */
export const msalConfig = {
    auth: {
        clientId: '31b06106-6c7d-45e5-94a2-6749d18f108d', // Verified client ID
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Verified authority
        knownAuthorities: [b2cPolicies.authorityDomain], // Verified known authorities
        redirectUri: 'http://localhost:3000', // Ensure this is registered in Azure Portal
        postLogoutRedirectUri: '/', // Redirect after logout
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs.
 */
export const protectedResources = {
    apiTodoList: {
        endpoint: 'http://localhost:5000/api/todolist',
        scopes: {
            read: ['https://finedineProd.onmicrosoft.com/TodoList/ToDoList.Read'],
            write: ['https://finedineProd.onmicrosoft.com/TodoList/ToDoList.ReadWrite'],
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 */
export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write],
};