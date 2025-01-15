import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetAccountSettingData, apiGetAccountdetailsData,apiPutAdminprofilesData } from 'services/AccountServices'
import { update } from 'lodash'

const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))
const Email = lazy(() => import('./components/Email'))

const NotificationSetting = lazy(() =>
    import('./components/NotificationSetting')
)
const Integration = lazy(() => import('./components/Integration'))
const Billing = lazy(() => import('./components/Billing'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
    profile: { label: 'Profile', path: 'profile' },
    password: { label: 'Password', path: 'password' },
    email: { label: 'Email', path: 'email' },
    // integration: { label: 'Integration', path: 'integration' },
    // billing: { label: 'Billing', path: 'billing' },
}

const Settings = () => {
    const [currentTab, setCurrentTab] = useState('profile')
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()

    const location = useLocation()

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val) => {
        setCurrentTab(val)
        navigate(`/app/account/settings/${val}`)
    }

    const fetchData = async () => {
        const response = await apiGetAccountdetailsData()


        setData(response.data)
        setFormData(response.data.data);
    }

    useEffect(() => {
        setCurrentTab(path)
        if (isEmpty(data)) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSubmit = async () => {
        try {
            // Make API call to update profile data
            const response = await apiPutAdminprofilesData(formData);
            // Handle success
            console.log('Profile data updated:', response);
        } catch (error) {
            // Handle error
            console.error('Error updating profile data:', error);
        }
    };
    const handleUpdateSubmit = async () => {
        try {
            // Make API call to update profile data
            const response = await apiPutAdminprofilesData(formData);
            // Handle success
            console.log('Profile data updated:', response);
        } catch (error) {
            // Handle error
            console.error('Error updating profile data:', error);
        }
    };
    // Function to handle form data change
    const handleFormChange = (updatedData) => {
        setFormData({ ...formData, ...updatedData });
    };



    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'profile' && (
                           <Profile data={formData} onChange={handleFormChange} onSubmit={handleSubmit} />
                        )}
                        {currentTab === 'password' && (
                            <Password data={data} />
                        )}
                        {currentTab === 'email' && (
                            <Email data={data} />
                        )}
                        {/* {currentTab === 'notification' && (
                            <NotificationSetting data={data.notification} />
                        )} */}
                        {/* {currentTab === 'integration' && <Integration />} */}
                        {/* {currentTab === 'billing' && <Billing />} */}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings
