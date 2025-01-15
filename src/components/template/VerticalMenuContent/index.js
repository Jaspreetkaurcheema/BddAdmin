import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'components/ui'
import { AuthorityCheck } from 'components/shared'
import VerticalSingleMenuItem from './VerticalSingleMenuItem'
import VerticalCollapsedMenuItem from './VerticalCollapsedMenuItem'
import { themeConfig } from 'configs/theme.config'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import useMenuActive from 'utils/hooks/useMenuActive'
import { useTranslation } from 'react-i18next'

const { MenuGroup } = Menu

const VerticalMenuContent = (props) => {
    console.log(props.navigationTree,"navigationTreenavigationTree")
    const {
        navMode = themeConfig.navMode,
        collapsed,
        routeKey,
        navigationTree = [],
        userAuthority = [],
        onMenuItemClick,
        direction = themeConfig.direction,
    } = props

    const { t } = useTranslation()

    const [defaulExpandKey, setDefaulExpandKey] = useState([])

    const { activedRoute } = useMenuActive(navigationTree, routeKey)

    useEffect(() => {
        if (defaulExpandKey.length === 0 && activedRoute?.parentKey) {
            setDefaulExpandKey([activedRoute?.parentKey])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activedRoute?.parentKey])

    const handleLinkClick = () => {
        onMenuItemClick?.()
    }

    // const getNavItem = (nav) => {
    //     if (nav.parentKey) {
    //         // If the current nav item has a parentKey, it's a child menu item
    //         return (
    //             <AuthorityCheck
    //                 key={nav.key}
    //                 userAuthority={userAuthority}
    //                 authority={nav.authority}
    //             >
    //                 <VerticalCollapsedMenuItem
    //                     nav={nav}
    //                     onLinkClick={onMenuItemClick}
    //                     sideCollapsed={collapsed}
    //                     userAuthority={userAuthority}
    //                     direction={direction}
    //                 />
    //             </AuthorityCheck>
    //         );
    //     }
    
    //     // If it's a parent menu item
    //     return (
    //         // <MenuGroup label={t(nav.translateKey) || nav.title}>
    //            nav.subMenu.map((subNav) => (
    //                 <AuthorityCheck
    //                     key={subNav.key}
    //                     userAuthority={userAuthority}
    //                     authority={subNav.authority}
    //                 >
    //                     {subNav.subMenu.length > 0 ? (
    //                         // <MenuGroup label={t(subNav.translateKey) || subNav.title}>
    //                           subNav.subMenu.map((childNav) => (
    //                                 <VerticalCollapsedMenuItem
    //                                     key={childNav.key}
    //                                     nav={childNav}
    //                                     onLinkClick={handleLinkClick}
    //                                     sideCollapsed={collapsed}
    //                                     userAuthority={userAuthority}
    //                                     direction={direction}
    //                                 />
    //                             ))
                          
    //                     ) : (
    //                         <VerticalCollapsedMenuItem
    //                             key={subNav.key}
    //                             nav={subNav}
    //                             onLinkClick={handleLinkClick}
    //                             sideCollapsed={collapsed}
    //                             userAuthority={userAuthority}
    //                             direction={direction}
    //                         />
    //                     )}
    //                 </AuthorityCheck>
    //             ))
    //         // </MenuGroup>
    //     );
    // };
    

    const getNavItem = (nav) => {


        if (nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
            return (
                <VerticalSingleMenuItem
                    key={nav.key}
                    nav={nav}
                    onLinkClick={handleLinkClick}
                    sideCollapsed={collapsed}
                    userAuthority={userAuthority}
                    direction={direction}
                />
            )
        }

        if (nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
            return (
                <VerticalCollapsedMenuItem
                    key={nav.key}
                    nav={nav}
                    onLinkClick={onMenuItemClick}
                    sideCollapsed={collapsed}
                    userAuthority={userAuthority}
                    direction={direction}
                />
            )
        }
        console.log(nav.subMenu, 'vvvvv')

        nav.subMenu.map(item => { console.log(item.subMenu, 'subMenu') })
        if (nav.type === NAV_ITEM_TYPE_TITLE) {
            // Inside the `getNavItem` function
            if (nav.subMenu.length > 0) {

                console.log('welcome')
                return (
                    <AuthorityCheck
                        key={nav.key}
                        userAuthority={userAuthority}
                        authority={nav.authority}
                    >
                        <MenuGroup label={t(nav.translateKey) || nav.title}>
                            {nav.subMenu.map((subNav) =>
                                subNav.subMenu.length > 0 ?
                                    (

                                        <VerticalCollapsedMenuItem
                                            key={subNav.key}
                                            nav={subNav}
                                            onLinkClick={onMenuItemClick}
                                            sideCollapsed={collapsed}
                                            userAuthority={userAuthority}
                                            direction={direction}
                                        />


                                    ) : (
                                        <VerticalSingleMenuItem
                                            key={subNav.key}
                                            nav={subNav}
                                            onLinkClick={onMenuItemClick}
                                            sideCollapsed={collapsed}
                                            userAuthority={userAuthority}
                                            direction={direction}
                                        />
                                    )
                                        (
                                            subNav.subMenu.map((subNav) => {
                                                subNav.subMenu.length > 0 ?
                                                    (

                                                        <VerticalCollapsedMenuItem
                                                            key={subNav.key}
                                                            nav={subNav}
                                                            onLinkClick={onMenuItemClick}
                                                            sideCollapsed={collapsed}
                                                            userAuthority={userAuthority}
                                                            direction={direction}
                                                        />


                                                    ) : (
                                                        <VerticalSingleMenuItem
                                                            key={subNav.key}
                                                            nav={subNav}
                                                            onLinkClick={onMenuItemClick}
                                                            sideCollapsed={collapsed}
                                                            userAuthority={userAuthority}
                                                            direction={direction}
                                                        />
                                                    )
                                            })
                                        )
                            )}
                        </MenuGroup>
                    </AuthorityCheck>
                )
            } else {
                ; <MenuGroup label={nav.title} />
            }
            // if (nav.subMenu.length > 0) {
            //     console.log('welcome')
            //     return (
            //         <AuthorityCheck
            //             key={nav.key}
            //             userAuthority={userAuthority}
            //             authority={nav.authority}
            //         >
            //             <MenuGroup label={t(nav.translateKey) || nav.title}>
            //                 {nav.subMenu.map((subNav) => {
                                
            //                     (

            //                         <VerticalCollapsedMenuItem
            //                             key={subNav.key}
            //                             nav={subNav}
            //                             onLinkClick={onMenuItemClick}
            //                             sideCollapsed={collapsed}
            //                             userAuthority={userAuthority}
            //                             direction={direction}
            //                         />


            //                     ) 
            //                     // Check if there's another level of submenu
            //                     // if (subNav.subMenu.length > 0) {
                                    
            //                     //     return (
            //                     //         <MenuGroup key={subNav.key} label={subNav.title}>
            //                     //             {subNav.subMenu.map((subSubMenu) => (
            //                     //                 subSubMenu.subMenu.length ?
            //                     //                     <VerticalCollapsedMenuItem
            //                     //                         key={subSubMenu.key}
            //                     //                         nav={subSubMenu}
            //                     //                         onLinkClick={onMenuItemClick}
            //                     //                         sideCollapsed={collapsed}
            //                     //                         userAuthority={userAuthority}
            //                     //                         direction={direction}
            //                     //                     />
            //                     //                     : <VerticalSingleMenuItem
            //                     //                         key={subSubMenu.key}
            //                     //                         nav={subSubMenu}
            //                     //                         onLinkClick={onMenuItemClick}
            //                     //                         sideCollapsed={collapsed}
            //                     //                         userAuthority={userAuthority}
            //                     //                         direction={direction}
            //                     //                     />
            //                     //             ))}
            //                     //         </MenuGroup>
            //                     //     );
            //                     // } else {
            //                     //     return (
            //                     //         <VerticalSingleMenuItem
            //                     //             key={subNav.key}
            //                     //             nav={subNav}
            //                     //             onLinkClick={onMenuItemClick}
            //                     //             sideCollapsed={collapsed}
            //                     //             userAuthority={userAuthority}
            //                     //             direction={direction}
            //                     //         />
            //                     //     );
            //                     // }
            //                 })}
            //             </MenuGroup>
            //         </AuthorityCheck>
            //     );
            // } else {
            //     return <MenuGroup label={nav.title} />;
            // }

            if (nav.subMenu.length > 0) {

                console.log('welcome')
                return (
                    <AuthorityCheck
                        key={nav.key}
                        userAuthority={userAuthority}
                        authority={nav.authority}
                    >
                        <MenuGroup label={t(nav.translateKey) || nav.title}>
                            {nav.subMenu.map((subNav) =>
                                subNav.subMenu.length > 0 ?
                                    (

                                        <VerticalCollapsedMenuItem
                                            key={subNav.key}
                                            nav={subNav}
                                            onLinkClick={onMenuItemClick}
                                            sideCollapsed={collapsed}
                                            userAuthority={userAuthority}
                                            direction={direction}
                                        />


                                    ) : (
                                        <VerticalSingleMenuItem
                                            key={subNav.key}
                                            nav={subNav}
                                            onLinkClick={onMenuItemClick}
                                            sideCollapsed={collapsed}
                                            userAuthority={userAuthority}
                                            direction={direction}
                                        />
                                    )
                                        (
                                            subNav.subMenu.map((subNav) => {
                                                subNav.subMenu.length > 0 ?
                                                    (

                                                        <VerticalCollapsedMenuItem
                                                            key={subNav.key}
                                                            nav={subNav}
                                                            onLinkClick={onMenuItemClick}
                                                            sideCollapsed={collapsed}
                                                            userAuthority={userAuthority}
                                                            direction={direction}
                                                        />


                                                    ) : (
                                                        <VerticalSingleMenuItem
                                                            key={subNav.key}
                                                            nav={subNav}
                                                            onLinkClick={onMenuItemClick}
                                                            sideCollapsed={collapsed}
                                                            userAuthority={userAuthority}
                                                            direction={direction}
                                                        />
                                                    )
                                            })
                                        )
                            )}
                        </MenuGroup>
                    </AuthorityCheck>
                )
            } else {
                ; <MenuGroup label={nav.title} />
            }
        }
    }
    // const getNavItem = (nav) => {
    //     if (nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
    //         return (
    //             <VerticalSingleMenuItem
    //                 key={nav.key}
    //                 nav={nav}
    //                 onLinkClick={handleLinkClick}
    //                 sideCollapsed={collapsed}
    //                 userAuthority={userAuthority}
    //                 direction={direction}
    //             />
    //         );
    //     }

    //     if (nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
    //         return (
    //             <VerticalCollapsedMenuItem
    //                 key={nav.key}
    //                 nav={nav}
    //                 onLinkClick={onMenuItemClick}
    //                 sideCollapsed={collapsed}
    //                 userAuthority={userAuthority}
    //                 direction={direction}
    //             />
    //         );
    //     }

    //     if (nav.type === NAV_ITEM_TYPE_TITLE) {
    //         if (nav.subMenu.length > 0) {
    //             return (
    //                 <AuthorityCheck
    //                     key={nav.key}
    //                     userAuthority={userAuthority}
    //                     authority={nav.authority}
    //                 >
    //                     <MenuGroup label={t(nav.translateKey) || nav.title}>
    //                         {nav.subMenu.map((subNav) => (
    //                             <React.Fragment key={subNav.key}>
    //                                 {subNav.subMenu.length > 0 ? (
    //                                     <VerticalMenuContent
    //                                         navMode={navMode}
    //                                         collapsed={collapsed}
    //                                         routeKey={routeKey}
    //                                         navigationTree={[subNav]}
    //                                         userAuthority={userAuthority}
    //                                         onMenuItemClick={onMenuItemClick}
    //                                         direction={direction}
    //                                     />
    //                                 ) : (
    //                                     <React.Fragment>
    //                                         <VerticalSingleMenuItem
    //                                             nav={subNav}
    //                                             onLinkClick={onMenuItemClick}
    //                                             sideCollapsed={collapsed}
    //                                             userAuthority={userAuthority}
    //                                             direction={direction}
    //                                         />
    //                                     </React.Fragment>
    //                                 )}
    //                             </React.Fragment>
    //                         ))}
    //                     </MenuGroup>
    //                 </AuthorityCheck>
    //             );
    //         } else {
    //             return <MenuGroup label={nav.title} />;
    //         }
    //     }
    // };


    return (
        <Menu
            className="px-4 pb-4"
            variant={navMode}
            sideCollapsed={collapsed}
            defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
            defaultExpandedKeys={defaulExpandKey}
        >
            {navigationTree.map((nav) => getNavItem(nav))}
        </Menu>
    )
}

VerticalMenuContent.propTypes = {
    navMode: PropTypes.oneOf(['light', 'dark', 'themed', 'transparent']),
    collapsed: PropTypes.bool,
    routeKey: PropTypes.string,
    navigationTree: PropTypes.array,
    userAuthority: PropTypes.array,
    direction: PropTypes.oneOf(['rtl', 'ltr']),
}

export default VerticalMenuContent
