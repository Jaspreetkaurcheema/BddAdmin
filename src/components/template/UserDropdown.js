import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { FiActivity } from 'react-icons/fi'

const dropdownItemList = [
    // {
    //     label: 'Profile',
    //     path: '/app/account/settings/profile',
    //     icon: <HiOutlineUser />,
    // },
    {
        label: 'Account Setting',
        path: '/app/account/settings/profile',
        icon: <HiOutlineCog />,
    },
    // {
    //     label: 'Activity Log',
    //     path: '/app/account/activity-log',
    //     icon: <FiActivity />,
    // },
]

export function generateImage(text, fontSize = 30, fontFamily = 'Arial') {
    const initials = (text?.split(' ').map(word => word.charAt(0).toUpperCase()).join(''))?.slice(0, 2);
    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <!-- Background rectangle -->
            <rect width="100%" height="100%" fill="#6c757d"/>
            
            <!-- Text element -->
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
                font-size="${fontSize}" font-family="${fontFamily}" fill="white">
                ${initials}
            </text>
        </svg>
    `;
  
    // Encode SVG string to data URL
    const encodedData = window.btoa(unescape(encodeURIComponent(svgString)));
    const dataURL = `data:image/svg+xml;base64,${encodedData}`;
    
    return dataURL;
  }
export const UserDropdown = ({ className }) => {
    const { avatar, userName, authority, email , full_name } = useSelector(
        (state) => state.auth.user
    )
    console.log(authority,'authorityauthority')

    const { signOut } = useAuth()

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
				{/* <img src={generateImage(userData?.username ? userData?.username :''   )} alt='team_logo' width='100'  /> */}

            <Avatar size={32} shape="circle"
           src =  {avatar ? {avatar} :  generateImage(full_name)

            }
           
             />
            <div className="hidden md:block">
                <div className="text-xs capitalize">
                    {authority || 'guest'}
                </div>
                <div className="font-bold">{userName}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" src={avatar} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {userName}
                            </div>
                            <div className="text-xs">{email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link 
                            className="flex h-full w-full px-2" 
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    onClick={signOut}
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default withHeaderItem(UserDropdown)
