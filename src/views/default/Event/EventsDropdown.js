import React, { useState, useEffect } from 'react';

import { APP_PREFIX_PATH } from 'constants/route.constant';
// import { NAV_ITEM_TYPE_ITEM, ADMIN } from 'constants/navigation.constant';
import { ADMIN } from 'constants/roles.constant';
import { NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant';
import { useSelector } from 'react-redux';

const Value = () => { 
    const responsePromise = useSelector(state => state.appEvents.data.getEvent);
    return responsePromise; // Return the responsePromise from the Value component
}

function EventsDropdown(navData) { // Pass responsePromise as an argument
    const responsePromise = <Value>{(response) => response}</Value>;
    console.log(responsePromise,'responsePromise')
    const result = responsePromise?.data?.data?.map(event => ({
        key: `appEvent.poolevents.${event.id}`,
        path: `${APP_PREFIX_PATH}/apps/poolevents/${event.id}`,
        title: event.name,
        translateKey: 'nav.app.poolevents',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: []
    })) || [];

    navData.forEach(item => {
        item.subMenu.forEach(subItem => {
            if (subItem.key === 'app.events') {
                subItem.subMenu.push(...result);
            }
        });
    });

    // Do something with the 'result' array if needed
    console.log(navData, 'navData after modification');

    // Return navData after modification
    return navData;
}


export default EventsDropdown;

