import { APP_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'
import { useEffect, useState } from 'react';
import { apiGetProgramed } from 'services/SalesService';
import EventsDropdown from 'views/default/Event/EventsDropdown';

const appsNavigationConfig = [

    {
        key: 'appsProject.dashboard',
        path: `${APP_PREFIX_PATH}/project/dashboard`,
        title: 'Dashboard',
        translateKey: 'nav.appsProject.dashboard',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
                

    {
        key: 'app',
        path: '',
        title: 'APP',
        
        translateKey: 'app',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN],
        subMenu: [
            // {
            //     key: 'apps.project',
            //     path: '',
            //     title: 'Project',
            //     translateKey: 'nav.appsProject.project',
            //     icon: 'project',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appsProject.dashboard',
            //             path: `${APP_PREFIX_PATH}/project/dashboard`,
            //             title: 'Dashboard',
            //             translateKey: 'nav.appsProject.dashboard',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsProject.projectList',
            //             path: `${APP_PREFIX_PATH}/project/project-list`,
            //             title: 'Project List',
            //             translateKey: 'nav.appsProject.projectList',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsProject.scrumBoard',
            //             path: `${APP_PREFIX_PATH}/project/scrum-board`,
            //             title: 'Scrum Board',
            //             translateKey: 'nav.appsProject.scrumBoard',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsProject.issue',
            //             path: `${APP_PREFIX_PATH}/project/issue`,
            //             title: 'Issue',
            //             translateKey: 'nav.appsProject.issue',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //     ],
            // },
            {
                key: 'apps.crm',
                path: '',
                title: 'CRM',
                translateKey: 'nav.appsCrm.crm',
                icon: 'crm',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN],
                subMenu: [
                    // {
                    //     key: 'appsCrm.dashboard',
                    //     path: `${APP_PREFIX_PATH}/crm/dashboard`,
                    //     title: 'Dashboard',
                    //     translateKey: 'nav.appsCrm.dashboard',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'appsProject.dashboard',
                    //     path: `${APP_PREFIX_PATH}/project/dashboard`,
                    //     title: 'Dashboard',
                    //     translateKey: 'nav.appsProject.dashboard',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    {
                        key: 'appsCrm.customers',
                        path: `${APP_PREFIX_PATH}/crm/users`,
                        title: 'Users',
                        translateKey: 'nav.appsCrm.customers',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                    // {
                    //     key: 'appsCrm.customerDetails',
                    //     path: `${APP_PREFIX_PATH}/crm/customer-details?id=1`,
                    //     title: 'Users Details',
                    //     translateKey: 'nav.appsCrm.customerDetails',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },

              
                    // {
                    //     key: 'appsCrm.pool',
                    //     path: `${APP_PREFIX_PATH}/crm/pool`,
                    //     title: 'Pools',
                    //     translateKey: 'nav.appsCrm.pool',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'appsCrm.promo',
                    //     path: `${APP_PREFIX_PATH}/crm/promo`,
                    //     title: 'Promo Code',
                    //     translateKey: 'nav.appsCrm.promo',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'appsCrm.faqs',
                    //     path: `${APP_PREFIX_PATH}/crm/faqs`,
                    //     title: 'Faqs',
                    //     translateKey: 'nav.appsCrm.faqs',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'appsCrm.bisfaqs',
                    //     path: `${APP_PREFIX_PATH}/crm/bisfaqs`,
                    //     title: 'Business Faqs',
                    //     translateKey: 'nav.appsCrm.bisfaqs',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                ],
            },
            {
                key: 'apps.finance',
                path: '',
                title: 'FINANCE',
                translateKey: 'nav.appsfinance.app',
                icon: 'sales',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN],
                subMenu: [
                 
                   
                    {
                        key: 'appsFinance.marketPlace',
                        path: `${APP_PREFIX_PATH}/finance/marketPlace`,
                        title: 'MarketPlace',
                        translateKey: 'nav.appsFinance.subscriptions',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                    // {
                    //     key: 'appsFinance.payments',
                    //     path: `${APP_PREFIX_PATH}/finance/payments`,
                    //     title: 'Payments',
                    //     translateKey: 'nav.appsFinance.payments',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'appsFinance.growth',
                    //     path: `${APP_PREFIX_PATH}/finance/growth`,
                    //     title: 'Growth Donation',
                    //     translateKey: 'nav.appsFinance.growth',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'appsFinance.addpromo',
                    //     path: `${APP_PREFIX_PATH}/finance/addpromo`,
                    //     title: 'Add Promo Code',
                    //     translateKey: 'nav.appsFinance.addpromo',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },

                    // {
                    //     key: 'appsFinance.promo',
                    //     path: `${APP_PREFIX_PATH}/finance/promo`,
                    //     title: 'Promo Code',
                    //     translateKey: 'nav.appsFinance.promo',
                    //     icon: '',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN],
                    //     subMenu: [],
                    // },



                ],
            },
            // {
            //     key: 'apps.app',
            //     path: '',
            //     title: 'APP',
            //     translateKey: 'nav.appsCrm.app',
            //     icon: 'crm',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         // {
            //         //     key: 'appsApp.dashboard',
            //         //     path: `${APP_PREFIX_PATH}/crm/dashboard`,
            //         //     title: 'Dashboard',
            //         //     translateKey: 'nav.appsCrm.dashboard',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_ITEM,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },
            //         {
            //             key: 'appsProject.dashboard',
            //             path: `${APP_PREFIX_PATH}/project/dashboard`,
            //             title: 'Dashboard',
            //             translateKey: 'nav.appsProject.dashboard',
            //             icon: '',
            //             disabled: true,
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },


            //         {

            //             key: 'appsApp.sports',
            //             path: `${APP_PREFIX_PATH}/apps/poolevents`,
            //             title: 'Sports',
            //             translateKey: 'nav.apps.sports',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_COLLAPSE,
            //             authority: [ADMIN],
            //             subMenu: [
            //                 {
            //                     key: 'appsApp.sports.poolevents',
            //                     path: `${APP_PREFIX_PATH}/apps/poolevents`,
            //                     title: 'Pool Events',
            //                     translateKey: 'nav.apps.poolevents',
            //                     icon: '',
            //                     type: NAV_ITEM_TYPE_ITEM,
            //                     authority: [ADMIN],
            //                     subMenu: [],
            //                 }
            //             ],
            //         },

            //         {
            //             key: 'appsApp.poolgames',
            //             path: `${APP_PREFIX_PATH}/apps/poolgames`,
            //             title: 'Pool Games',
            //             translateKey: 'nav.apps.poolgames',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },


            //     ],
            // },
            // {
            //     key: 'app.events', // Unique key for the 'Events' section
            //     path: '', // The path for the 'Events' section
            //     title: 'Events',
            //     translateKey: 'nav.appCrm.events',
            //     icon: 'crm',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appEvent.poolevents.4', // Unique key for NCAA Men's Basketball
            //             path: `${APP_PREFIX_PATH}/apps/poolevents/4`, // Corrected path
            //             title: 'NCAA Men\'s Basketball',
            //             translateKey: 'nav.app.poolevents',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM, // Changed to ITEM type as it's a leaf item
            //             authority: [ADMIN],
            //             subMenu: [] // No need for submenu as it's already a leaf item
            //         },
            //         {
            //             key: 'appEvent.poolevents.6', // Unique key for NCAA Men's Lacrosse
            //             path: `${APP_PREFIX_PATH}/apps/poolevents/6`, // Corrected path
            //             title: 'NCAA Men\'s Lacrosse',
            //             translateKey: 'nav.app.poolevents',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM, // Changed to ITEM type as it's a leaf item
            //             authority: [ADMIN],
            //             subMenu: [] // No need for submenu as it's already a leaf item
            //         },
            //         {
            //             key: 'appEvent.poolevents.2', // Unique key for NFL Football
            //             path: `${APP_PREFIX_PATH}/apps/poolevents/2`, // Corrected path
            //             title: 'NFL Football',
            //             translateKey: 'nav.app.poolevents',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM, // Changed to ITEM type as it's a leaf item
            //             authority: [ADMIN],
            //             subMenu: [] // No need for submenu as it's already a leaf item
            //         },
            //     ]
            // },
            // {
            //     key: 'appsApp.pool',
            //     path: `${APP_PREFIX_PATH}/apps/pool`,
            //     title: 'Pools',
            //     translateKey: 'nav.apps.pool',
            //     icon: 'crm',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appsApp.pool',
            //             path: `${APP_PREFIX_PATH}/apps/pool`,
            //             title: 'Pools List',
            //             translateKey: 'nav.apps.pool',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_COLLAPSE,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         // {
            //         //     key: 'appsApp.poolEntries',
            //         //     path: `${APP_PREFIX_PATH}/apps/poolEntries`,
            //         //     title: 'Pool Entries',
            //         //     translateKey: 'nav.apps.poolEntries',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_COLLAPSE,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },
            //         // {
            //         //     key: 'appsApp.poolMembers',
            //         //     path: `${APP_PREFIX_PATH}/apps/poolMembers`,
            //         //     title: 'Pool Members',
            //         //     translateKey: 'nav.apps.poolEntries',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_COLLAPSE,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },
            //         // {
            //         //     key: 'appsApp.poolRequests',
            //         //     path: `${APP_PREFIX_PATH}/apps/poolRequests`,
            //         //     title: 'Pool Requests',
            //         //     translateKey: 'nav.apps.poolRequests',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_COLLAPSE,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // }

            //     ],
            // },
            // {
            //     key: 'appsApp.sports',
            //     path: `${APP_PREFIX_PATH}/apps/sports`,
            //     title: 'Sports',
            //     translateKey: 'nav.apps.sports',
            //     icon: 'crm',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appsApp.sports.3',
            //             path: `${APP_PREFIX_PATH}/apps/sports/3`,
            //             title: 'Basket Ball',
            //             translateKey: 'nav.apps.pool',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_COLLAPSE,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsApp.sports.5',
            //             path: `${APP_PREFIX_PATH}/apps/sports/5`,
            //             title: 'Lacrosse',
            //             translateKey: 'nav.apps.sports',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_COLLAPSE,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsApp.sports.2',
            //             path: `${APP_PREFIX_PATH}/apps/sports/2`,
            //             title: 'Football',
            //             translateKey: 'nav.apps.sports',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_COLLAPSE,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },


            //         // {
            //         //     key: 'appsApp.poolEntries',
            //         //     path: `${APP_PREFIX_PATH}/apps/poolEntries`,
            //         //     title: 'Pool Entries',
            //         //     translateKey: 'nav.apps.poolEntries',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_COLLAPSE,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },
            //         // {
            //         //     key: 'appsApp.poolMembers',
            //         //     path: `${APP_PREFIX_PATH}/apps/poolMembers`,
            //         //     title: 'Pool Members',
            //         //     translateKey: 'nav.apps.poolEntries',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_COLLAPSE,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },
            //         // {
            //         //     key: 'appsApp.poolRequests',
            //         //     path: `${APP_PREFIX_PATH}/apps/poolRequests`,
            //         //     title: 'Pool Requests',
            //         //     translateKey: 'nav.apps.poolRequests',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_COLLAPSE,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // }

            //     ],
            // },
            // {
            //     key: 'apps.cms',
            //     path: '',
            //     title: 'CMS',
            //     translateKey: 'nav.appsCms.app',
            //     icon: 'crm',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         // {
            //         //     key: 'appsApp.dashboard',
            //         //     path: `${APP_PREFIX_PATH}/crm/dashboard`,
            //         //     title: 'Dashboard',
            //         //     translateKey: 'nav.appsCrm.dashboard',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_ITEM,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },

            //         {
            //             key: 'appsProject.dashboard',
            //             path: `${APP_PREFIX_PATH}/project/dashboard`,
            //             title: 'Dashboard',
            //             translateKey: 'nav.appsProject.dashboard',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },

            //         {
            //             key: 'appsCms.faqs',
            //             path: `${APP_PREFIX_PATH}/cms/faqs`,
            //             title: 'Faqs',
            //             translateKey: 'nav.appsCms.faqs',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsCms.page',
            //             path: `${APP_PREFIX_PATH}/cms/page`,
            //             title: 'Page',
            //             translateKey: 'nav.appsCms.page',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },

            //     ],
            // },
            // {
            //     key: 'apps.finance',
            //     path: '',
            //     title: 'FINANCE',
            //     translateKey: 'nav.appsfinance.app',
            //     icon: 'sales',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         // {
            //         //     key: 'appsApp.dashboard',
            //         //     path: `${APP_PREFIX_PATH}/crm/dashboard`,
            //         //     title: 'Dashboard',
            //         //     translateKey: 'nav.appsCrm.dashboard',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_ITEM,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },
            //         {
            //             key: 'appsProject.dashboard',
            //             path: `${APP_PREFIX_PATH}/project/dashboard`,
            //             title: 'Dashboard',
            //             translateKey: 'nav.appsProject.dashboard',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsFinance.subscriptions',
            //             path: `${APP_PREFIX_PATH}/finance/subscriptions`,
            //             title: 'Subscription',
            //             translateKey: 'nav.appsFinance.subscriptions',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsFinance.payments',
            //             path: `${APP_PREFIX_PATH}/finance/payments`,
            //             title: 'Payments',
            //             translateKey: 'nav.appsFinance.payments',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         // {
            //         //     key: 'appsFinance.addpromo',
            //         //     path: `${APP_PREFIX_PATH}/finance/addpromo`,
            //         //     title: 'Add Promo Code',
            //         //     translateKey: 'nav.appsFinance.addpromo',
            //         //     icon: '',
            //         //     type: NAV_ITEM_TYPE_ITEM,
            //         //     authority: [ADMIN],
            //         //     subMenu: [],
            //         // },

            //         {
            //             key: 'appsFinance.promo',
            //             path: `${APP_PREFIX_PATH}/finance/promo`,
            //             title: 'Promo Code',
            //             translateKey: 'nav.appsFinance.promo',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },



            //     ],
            // },
            // {
            //     key: 'apps.support',
            //     path: '',
            //     title: 'Support',
            //     translateKey: 'nav.appsupport.app',
            //     icon: 'feedback',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appsSupport.notifications',
            //             path: `${APP_PREFIX_PATH}/support/notifications`,
            //             title: 'Notifications',
            //             translateKey: 'nav.appsSupport.notifications',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsSupport.inquiries',
            //             path: `${APP_PREFIX_PATH}/support/inquiries`,
            //             title: 'Inquiries',
            //             translateKey: 'nav.appsSupport.inquiries',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },



            //     ],
            // },
            // {
            //     key: 'apps.maintenance',
            //     path: '',
            //     title: 'Maintenance',
            //     translateKey: 'nav.appmaintenance.app',
            //     icon: 'sales',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appsMaintenance.logs',
            //             path: `${APP_PREFIX_PATH}/maintenance/logs`,
            //             title: 'Logs',
            //             translateKey: 'nav.appsMaintenance.logs',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsMaintenance.archive',
            //             path: `${APP_PREFIX_PATH}/maintenance/archive`,
            //             title: 'Archive',
            //             translateKey: 'nav.appsMaintenance.archive',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },
            //         {
            //             key: 'appsMaintenance.deployment',
            //             path: `${APP_PREFIX_PATH}/maintenance/deployment`,
            //             title: 'Deployment',
            //             translateKey: 'nav.appsMaintenance.deployment',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },


            //     ],
            // },
            // // {
            // //     key: 'apps.setting',
            // //     path: '',
            // //     title: 'Settings',
            // //     translateKey: 'nav.appsetting.app',
            // //     icon: 'account',
            // //     type: NAV_ITEM_TYPE_COLLAPSE,
            // //     authority: [ADMIN],
            // //     subMenu: [

            // //         {
            // //             key: 'appsSetting.profile',
            // //             path: `${APP_PREFIX_PATH}/cms/profile`,
            // //             title: 'Profile',
            // //             translateKey: 'nav.appsSetting.profile',
            // //             icon: '',
            // //             type: NAV_ITEM_TYPE_ITEM,
            // //             authority: [ADMIN],
            // //             subMenu: [],
            // //         },

            // //     ],
            // // },
            // // {
            // //     key: 'apps.setting',
            // //     path: '',
            // //     title: 'Settings',
            // //     translateKey: 'nav.appsetting.app',
            // //     icon: 'account',
            // //     type: NAV_ITEM_TYPE_COLLAPSE,
            // //     authority: [ADMIN],
            // //     subMenu: [

            // //         {
            // //                 key: 'appsSetting.profile',
            // //                 path: `${APP_PREFIX_PATH}/cms/profile`,
            // //                 title: 'Profile',
            // //                 translateKey: 'nav.appsSetting.profile',
            // //                 icon: '',
            // //                 type: NAV_ITEM_TYPE_ITEM,
            // //                 authority: [ADMIN],
            // //                 subMenu: [],
            // //             },

            // //     ],
            // // },


            // // {
            // //     key: 'apps.sales',
            // //     path: '',
            // //     title: 'Sales',
            // //     translateKey: 'nav.appsSales.sales',
            // //     icon: 'sales',
            // //     type: NAV_ITEM_TYPE_COLLAPSE,
            // //     authority: [ADMIN],
            // //     subMenu: [
            // //         {
            // //             key: 'appsSales.dashboard',
            // //             path: `${APP_PREFIX_PATH}/sales/dashboard`,
            // //             title: 'Dashboard',
            // //             translateKey: 'nav.appsSales.dashboard',
            // //             icon: '',
            // //             type: NAV_ITEM_TYPE_ITEM,
            // //             authority: [ADMIN],
            // //             subMenu: [],
            // //         },
            // //         {
            // //             key: 'appsSales.orderList',
            // //             path: `${APP_PREFIX_PATH}/sales/order-list`,
            // //             title: 'Order List',
            // //             translateKey: 'nav.appsSales.orderList',
            // //             icon: '',
            // //             type: NAV_ITEM_TYPE_ITEM,
            // //             authority: [ADMIN],
            // //             subMenu: [],
            // //         },
            // //         {
            // //             key: 'appsSales.orderDetails',
            // //             path: `${APP_PREFIX_PATH}/sales/order-details/95954`,
            // //             title: 'Order Details',
            // //             translateKey: 'nav.appsSales.orderDetails',
            // //             icon: '',
            // //             type: NAV_ITEM_TYPE_ITEM,
            // //             authority: [ADMIN],
            // //             subMenu: [],
            // //         },
            // //     ],
            // // },
            // {
            //     key: 'apps.setting',
            //     path: '',
            //     title: 'Settings',
            //     translateKey: 'nav.apps.setting',
            //     icon: 'account',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN],
            //     subMenu: [
            //         {
            //             key: 'appsSetting.profile',
            //             path: `${APP_PREFIX_PATH}/account/settings/profile`,
            //             title: 'Profile',
            //             translateKey: 'nav.appsSetting.profile',
            //             icon: '',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN],
            //             subMenu: [],
            //         },

            //     ],
            // },
        ],
    },

]

export default appsNavigationConfig

// export default EventsDropdown(appsNavigationConfig)
