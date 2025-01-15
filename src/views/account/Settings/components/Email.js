import React from 'react'
import classNames from 'classnames'
import {
    Input,
    Button,
    Tag,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import isLastChild from 'utils/isLastChild'
import {
    HiOutlineDesktopComputer,
    HiOutlineDeviceMobile,
    HiOutlineDeviceTablet,
} from 'react-icons/hi'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import { apiPutAdminEmailData, apiPutAdminpasswordData } from 'services/AccountServices'

const LoginHistoryIcon = ({ type }) => {
    switch (type) {
        case 'Desktop':
            return <HiOutlineDesktopComputer />
        case 'Mobile':
            return <HiOutlineDeviceMobile />
        case 'Tablet':
            return <HiOutlineDeviceTablet />
        default:
            return <HiOutlineDesktopComputer />
    }
}

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password Required'),
    newEmail: Yup.string().email()
        .required('Enter your new Email'),
    
    currentEmail: Yup.string().email().required('Current Email is required')
})

const Email = ({ data , onSubmit}) => {
    console.log(data,'dadadaada')
    const onFormSubmit = async (values, setSubmitting) => {
        setSubmitting(false)
        
        const response = await apiPutAdminEmailData(values);
        console.log(response.data.status,'ddddd')

        if (response.data.status == true) {
            toast.push(<Notification title={'Email Updated'} type="success" />, {
                placement: 'top-center',
            })
          
        }else{
            toast.push(<Notification title={response.data.message} type="danger" />, {
                placement: 'top-center',
            })
    }
        setSubmitting(false)
    }

    return (
        <>
            <Formik
                initialValues={{
                    password: '',
                    newEmail: '',
                    confirmNewEmail: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {

                    console.log(values,'ccdfdfd')
                    // setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="Email"
                                    desc="Enter your email and password to reset your email"
                                />
                               <FormRow
                                    name="currentEmail"
                                    label="Current Email"
                                    {...validatorProps}
                                >
                                    <Field
                                        // type="email"
                                        autoComplete="off"
                                        name="currentEmail"
                                        placeholder="Current Email"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="newEmail"
                                    label="New Email"
                                    {...validatorProps}
                                >
                                    <Field
                                        // type="email"
                                        autoComplete="off"
                                        name="newEmail"
                                        placeholder="New Email"
                                        component={Input}
                                    />
                                </FormRow>
                        
                                <FormRow
                                    name="password"
                                    label="Password"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Password"
                                        component={Input}
                                    />
                                </FormRow>
                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Updating'
                                            : 'Update Email'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            {/* <div className="mt-6">
                <FormDesription
                    title="Where you're signed in"
                    desc="You're signed in to your account on these devices."
                />
                {/* {data && (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600 mt-6">
                      
                            <div
                                // key={log.deviceName}
                                // className={classNames(
                                //     'flex items-center px-4 py-6',
                                //     !isLastChild(data, index) &&
                                //         'border-b border-gray-200 dark:border-gray-600'
                                // )}
                            >
                                <div className="flex items-center">
                                    <div className="text-3xl">
                                        <LoginHistoryIcon type={log.type} />
                                    </div>
                                    <div className="ml-3 rtl:mr-3">
                                        <div className="flex items-center">
                                            <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                {log.deviceName}
                                            </div>
                                            {index === 0 && (
                                                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 rounded-md border-0 mx-2">
                                                    <span className="capitalize">
                                                        {' '}
                                                        Current{' '}
                                                    </span>
                                                </Tag>
                                            )}
                                        </div>
                                        <span>
                                            {log.location} •{' '}
                                            {dayjs
                                                .unix(log.time)
                                                .format('DD-MMM-YYYY, hh:mm A')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                       
                    </div>
                )} */}
            {/* </div> */} 
        </>
    )
}

export default Email
