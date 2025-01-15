const appConfig = {
    // apiPrefix: 'http://localhost:8000/apis/admin',
   
    apiPrefix: 'http://localhost:4000/apis/admin/auth/',
    // apiPrefix: 'https://portalapi.kingpool.app/api/',
    authenticatedEntryPath: '/app/project/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: false,
}

export default appConfig
