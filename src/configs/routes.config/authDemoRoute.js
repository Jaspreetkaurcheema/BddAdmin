import React from 'react'
import { AUTH_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const authDemoRoute = [
    {
        key: 'authentication.signInSide',
        path: `${AUTH_PREFIX_PATH}/sign-in-side`,
        component: React.lazy(() =>
            import('views/auth-demo/SignIn/SignInSide')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.signUpSide',
        path: `${AUTH_PREFIX_PATH}/sign-up-side`,
        component: React.lazy(() =>
            import('views/auth-demo/SignUp/SignUpSide')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.forgotPasswordSimple',
        path: `${AUTH_PREFIX_PATH}/forgot-password-simple`,
        component: React.lazy(() =>
            import('views/auth-demo/ForgotPassword/ForgotPasswordSimple')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.forgotPasswordSide',
        path: `${AUTH_PREFIX_PATH}/forgot-password-side`,
        component: React.lazy(() =>
            import('views/auth-demo/ForgotPassword/ForgotPasswordSide')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.forgotPasswordCover',
        path: `${AUTH_PREFIX_PATH}/forgot-password-cover`,
        component: React.lazy(() =>
            import('views/auth-demo/ForgotPassword/ForgotPasswordCover')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.resetPasswordSimple',
        path: `${AUTH_PREFIX_PATH}/reset-password-simple`,
        component: React.lazy(() =>
            import('views/auth-demo/ResetPassword/ResetPasswordSimple')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.resetPasswordSide',
        path: `${AUTH_PREFIX_PATH}/reset-password-side`,
        component: React.lazy(() =>
            import('views/auth-demo/ResetPassword/ResetPasswordSide')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'authentication.resetPasswordCover',
        path: `${AUTH_PREFIX_PATH}/reset-password-cover`,
        component: React.lazy(() =>
            import('views/auth-demo/ResetPassword/ResetPasswordCover')
        ),
        authority: [ADMIN],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
]

export default authDemoRoute
