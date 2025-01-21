import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsRoute = [
    {
        key: 'appsProject.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(() => import('views/crm/project/ProjectDashboard')),
        authority: [ADMIN],
    },
    // {
    //     key: 'appsProject.projectList',
    //     path: `${APP_PREFIX_PATH}/project/project-list`,
    //     component: React.lazy(() => import('views/project/ProjectList')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsProject.scrumBoard',
    //     path: `${APP_PREFIX_PATH}/project/scrum-board`,
    //     component: React.lazy(() => import('views/project/ScrumBoard')),
    //     authority: [ADMIN],
    //     meta: {
    //         pageContainerType: 'gutterless',
    //     },
    // },
    // {
    //     key: 'appsProject.issue',
    //     path: `${APP_PREFIX_PATH}/project/issue`,
    //     component: React.lazy(() => import('views/project/Issue')),
    //     authority: [ADMIN],
    // },
    {
        key: 'appsCrm.dashboard',
        path: `${APP_PREFIX_PATH}/crm/dashboard`,
        component: React.lazy(() => import('views/crm/CrmDashboard')),
        authority: [ADMIN],
    },
   
    {
        key: 'appsCrm.customers',
        path: `${APP_PREFIX_PATH}/crm/users`,
        component: React.lazy(() => import('views/crm/Customers')),
        authority: [ADMIN],
        // meta: {
        //     header: 'Users',
        // },
    },
    // {
    //     key: 'appsCrm.biscustomers',
    //     path: `${APP_PREFIX_PATH}/crm/business-users`,
    //     component: React.lazy(() => import('views/crm/Business')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Business Users',
    //     },
    // },
    // {
    //     key: 'appsApp.pool',
    //     path: `${APP_PREFIX_PATH}/apps/pool`,
    //     component: React.lazy(() => import('views/crm/Pools')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Pools',
    //     },
    // },
   

   
   
    
    // {
    //     key: 'appEvent.poolevents.2',
    //     path: `${APP_PREFIX_PATH}/apps/poolevents/2`,
    //     component: React.lazy(() => import('views/app/Events')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Pool events',
    //     },
    // },
   
    // {
    //     key: 'appsApp.poolgames',
    //     path: `${APP_PREFIX_PATH}/apps/poolgames`,
    //     component: React.lazy(() => import('views/app/Poolgames')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Sports pool games',
    //     },
    // },
    // {
    //     key: 'appsCms.faqs',
    //     path: `${APP_PREFIX_PATH}/cms/faqs`,
    //     component: React.lazy(() => import('views/crm/Faqs')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Faqs',
    //     },
    // },
    // {
    //     key: 'appsCms.faqs',
    //     path: `${APP_PREFIX_PATH}/cms/addFaq`,
    //     component: React.lazy(() => import('views/cms/FaqAdd')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Add New Faq',
    //     },
    // },
    // {
    //     key: 'appsCms.page',
    //     path: `${APP_PREFIX_PATH}/cms/page`,
    //     component: React.lazy(() => import('views/cms/ListPage')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Manage Pages',
    //         extraHeader: React.lazy(() =>
    //             import(
    //                 'views/cms/ListPage/components/PanelHeader'
    //             )
    //         ),
    //         headerContainer: true,
    //     },
    // },
    // {
    //     key: 'appsCrm.bisfaqs',
    //     path: `${APP_PREFIX_PATH}/crm/bisfaqs`,
    //     component: React.lazy(() => import('views/crm/Bisfaqs')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Business Faqs',
    //     },
    // },
    // {
    //     key: 'appsFinance.marketPlace',
    //     path: `${APP_PREFIX_PATH}/finance/marketPlace`,
    //     component: React.lazy(() => import('views/crm/Subscriptions')),
    //     authority: [ADMIN],
    //     // meta: {
    //     //     header: 'Subscription',
    //     // },
    // },
    // {
    //     key: 'appsFinance.promo',
    //     path: `${APP_PREFIX_PATH}/finance/promo`,
    //     component: React.lazy(() => import('views/crm/Promocode')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Promo Code',
    //     },
    // },
    // {
    //  key: 'appsSupport.inquiries',
    //     path: `${APP_PREFIX_PATH}/support/inquiries`,
    //     component: React.lazy(() => import('views/support/Inquiries')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Inquiries',
    //     },
    // },
   
    {
        key: 'appsSupport.notifications',
        path: `${APP_PREFIX_PATH}/support/notifications`,
        component: React.lazy(() => import('views/default/default_file')),
        authority: [ADMIN],
        meta: {
            header: 'Notifications',
        },
    },

    {
        key: 'appsMaintenance.logs',
        path: `${APP_PREFIX_PATH}/maintenance/logs`,
        component: React.lazy(() => import('views/default/log_default_file')),
        authority: [ADMIN],
        meta: {
            header: 'Logs',
        },
    },
    {
        key: 'appsMaintenance.alert',
        path: `${APP_PREFIX_PATH}/maintenance/alert`,
        component: React.lazy(() => import('views/default/log_default_file')),
        authority: [ADMIN],
        meta: {
            header: 'Logs',
        },
    },
    {
        key: 'appsMaintenance.archive',
        path: `${APP_PREFIX_PATH}/maintenance/archive`,
        component: React.lazy(() => import('views/default/archive_default_file')),
        authority: [ADMIN],
        meta: {
            header: 'Archive',
        },
    },
    // {
    //     key: 'appsMaintenance.deployment',
    //     path: `${APP_PREFIX_PATH}/maintenance/deployment`,
    //     component: React.lazy(() => import('views/default/deployment_default_file')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Deployment',
    //     },
    // },
    // {
    //     key: 'appsFinance.payments',
    //     path: `${APP_PREFIX_PATH}/finance/payments`,
    //     component: React.lazy(() => import('views/finance/Payments')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Payments',
    //     },
    // },
    // {
    //     key: 'appsFinance.growth',
    //     path: `${APP_PREFIX_PATH}/finance/growth`,
    //     component: React.lazy(() => import('views/finance/Growth')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Growth Donation',
    //     },
    // },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/customer-details`,
        component: React.lazy(() => import('views/crm/CustomerDetail')),
        authority: [ADMIN],
        meta: {
            header: '',
            headerContainer: true,
        },
    },
    // {
    //     key: 'appsCrm.poolDetails',
    //     path: `${APP_PREFIX_PATH}/crm/pool-details`,
    //     component: React.lazy(() => import('views/crm/PoolDetail')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: '',
    //         headerContainer: true,
    //     },
    // },
    // {
    //     key: 'appsApp.pooleventdetails',
    //     path: `${APP_PREFIX_PATH}/apps/poolevent-details`,
    //     component: React.lazy(() => import('views/app/PoolEventDetails')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: '',
    //         headerContainer: true,
    //     },
    // },
    // {
    //     key: 'appsCrm.biscustomers',
    //     path: `${APP_PREFIX_PATH}/crm/business-users`,
    //     component: React.lazy(() => import('views/crm/Business')),
    //     authority: [ADMIN],
    //     meta: {
    //         pageContainerType: 'gutterless',
    //         footer: false,
    //     },
    // },
    // {
    //     key: 'appsCrm.mail',
    //     path: `${APP_PREFIX_PATH}/crm/mail/:category`,
    //     component: React.lazy(() => import('views/crm/Business')),
    //     authority: [ADMIN],
    //     meta: {
    //         pageContainerType: 'gutterless',
    //         footer: false,
    //     },
    // },
    // {
    //     key: 'appsSales.dashboard',
    //     path: `${APP_PREFIX_PATH}/sales/dashboard`,
    //     component: React.lazy(() => import('views/sales/SalesDashboard')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsSales.productList',
    //     path: `${APP_PREFIX_PATH}/sales/product-list`,
    //     component: React.lazy(() => import('views/sales/ProductList')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsSales.productEdit',
    //     path: `${APP_PREFIX_PATH}/sales/product-edit/:productId`,
    //     component: React.lazy(() => import('views/sales/ProductEdit')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Edit Product',
    //     },
    // },
    // {
    //     key: 'appsFinance.addpromo',
    //     path: `${APP_PREFIX_PATH}/finance/addpromo`,
    //     component: React.lazy(() => import('views/sales/ProductNew')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Add New Promo code',
    //     },
    // },
    // {
    //     key: 'appsSales.orderList',
    //     path: `${APP_PREFIX_PATH}/sales/order-list`,
    //     component: React.lazy(() => import('views/sales/OrderList')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsSales.orderDetails',
    //     path: `${APP_PREFIX_PATH}/sales/order-details/:orderId`,
    //     component: React.lazy(() => import('views/sales/OrderDetails')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsknowledgeBase.helpCenter',
    //     path: `${APP_PREFIX_PATH}/knowledge-base/help-center`,
    //     component: React.lazy(() => import('views/knowledge-base/HelpCenter')),
    //     authority: [ADMIN],
    //     meta: {
    //         pageContainerType: 'gutterless',
    //     },
    // },
    // {
    //     key: 'appsknowledgeBase.article',
    //     path: `${APP_PREFIX_PATH}/knowledge-base/article`,
    //     component: React.lazy(() => import('views/knowledge-base/Article')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsknowledgeBase.manageArticles',
    //     path: `${APP_PREFIX_PATH}/knowledge-base/manage-articles`,
    //     component: React.lazy(() =>
    //         import('views/knowledge-base/ManageArticles')
    //     ),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Manage Articles',
    //         extraHeader: React.lazy(() =>
    //             import(
    //                 'views/knowledge-base/ManageArticles/components/PanelHeader'
    //             )
    //         ),
    //         headerContainer: true,
    //     },
    // },
    // {
    //     key: 'appsknowledgeBase.editArticle',
    //     path: `${APP_PREFIX_PATH}/knowledge-base/edit-article`,
    //     component: React.lazy(() => import('views/cms/AddPage')),
    //     authority: [ADMIN],
    // },
    // {
    //     key: 'appsAccount.settings',
    //     path: `${APP_PREFIX_PATH}/account/settings/:tab`,
    //     component: React.lazy(() => import('views/account/Settings')),
    //     authority: [ADMIN],
    //     meta: {
    //         header: 'Settings',
    //         headerContainer: true,
    //     },
    // },
    {
        key: 'appsSetting.profile',
        path: `${APP_PREFIX_PATH}/account/settings/profile`,
        component: React.lazy(() => import('views/account/Settings')),
        authority: [ADMIN],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'appsSetting.profile',
        path: `${APP_PREFIX_PATH}/account/settings/password`,
        component: React.lazy(() => import('views/account/Settings')),
        authority: [ADMIN],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'appsSetting.email',
        path: `${APP_PREFIX_PATH}/account/settings/email`,
        component: React.lazy(() => import('views/account/Settings')),
        authority: [ADMIN],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'appsAccount.invoice',
        path: `${APP_PREFIX_PATH}/account/invoice/:id`,
        component: React.lazy(() => import('views/account/Invoice')),
        authority: [ADMIN],
    },
    {
        key: 'appsAccount.activityLog',
        path: `${APP_PREFIX_PATH}/account/activity-log`,
        component: React.lazy(() => import('views/account/ActivityLog')),
        authority: [ADMIN],
    },
    {
        key: 'appsAccount.kycForm',
        path: `${APP_PREFIX_PATH}/account/kyc-form`,
        component: React.lazy(() => import('views/account/KycForm')),
        authority: [ADMIN],
    },
]

export default appsRoute
