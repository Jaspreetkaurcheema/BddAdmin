import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    Select,
    Avatar,
    FormItem,
    FormContainer,
    hooks,
    ScrollBar,
} from 'components/ui'
import dayjs from 'dayjs'
// import NewTaskField from './NewTaskField'
import { Field, Form, Formik } from 'formik'
import { HiCheck, HiOutlineFlag, HiPaperClip, HiStar } from 'react-icons/hi'
import { components } from 'react-select'

import { useSelector, useDispatch } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'
import { setDrawerClose, setReplyDialog } from '../store/stateSlice'
import { getReply, replyInquiry, setReplyData } from '../store/dataSlice'
import { Loading } from 'components/shared'

const { MultiValueLabel } = components

const { useUniqueId } = hooks

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${isSelected
                ? 'bg-gray-100 dark:bg-gray-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControlMulti = ({ children, data, ...props }) => {
    const { img } = data
    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

// {
//     "user_id": 0,
//     "email": "string",
//     "inquiry_id": 0,
//     "username": "string",
//     "description": "string",
//     "message": "string",
//     "created_at": "2024-04-30T09:35:31.340Z"
//   }

const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message required'),
    // content: Yup.string().required('Title required'),
    // assignees: Yup.array().min(1, 'Assignee required'),
    // rememberMe: Yup.bool(),
})
const htmlReg = /(<([^>]+)>)/gi

const NewReplyForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    // const members = useSelector((state) => state.projectList.data.allMembers)

    const newId = useUniqueId('project-')

    const [taskCount, setTaskCount] = useState({})
    const customer = useSelector(
        (state) => state.supportInquiries.state.selectedCustomer
    )


    useEffect(() => {
        dispatch(getReply({ id: customer.inquiry_id }))


    }, [dispatch])
    let selector = useSelector((state) => state.supportInquiries.data.replyList)
    useEffect(() => {
        setData(selector.data)
    }, [selector])

    console.log(data, 'cusddf')
    const handleAddNewTask = (count) => {
        setTaskCount(count)
    }

    const parseHtml = (content) => {
        if (!content) {
            return ''
        }
        const text = content.replace(htmlReg, '')
        return text.length > 60 ? text.substring(0, 57) + '...' : text
    }

    const onSubmit = (formValue, setSubmitting) => {
        console.log(formValue, 'formValueformValue')
        setSubmitting(true)
        dispatch(getReply({ id: customer.inquiry_id }))
        // const { title, content, assignees } = formValue

        // const { totalTask, completedTask } = taskCount

        // const member = cloneDeep(assignees).map((assignee) => {
        //     assignee.name = assignee.label
        //     return assignee
        // })
        const values = {
            user_id: customer.user_id,
            email: customer.email,
            inquiry_id: parseInt(customer.inquiry_id),
            username: customer.username,
            description: formValue.description,
            message: formValue.message,
            created_at: new Date()
        }


   
        // const values = {
        //     id: newId,
        //     name: title,
        //     desc: content,
        //     totalTask,
        //     completedTask,
        //     progression: (completedTask / totalTask) * 100 || 0,
        //     member,
        // }
        dispatch(replyInquiry(values))
        dispatch(setReplyData(values))
        formValue.message= ''
        
    }
    // const customer = useSelector(
    //     (state) => state.supportInquiries.state.selectedCustomer
    // )


    return (
        <div>
            <Formik
                initialValues={{
                    InquaryId: "#" + customer.inquiry_id,
                    inquiryType: customer.inquiryType,
                    description: customer.description,
                    message: ''

                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {

                    console.log(values, 'valuesvalues')
                    onSubmit(values, setSubmitting)
                }}
            >
                {({ touched, errors, values, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <div className='parent_field flex-direction-row'>
                                <FormItem
                                    label="Inquiry Id"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="InquaryId"
                                        value={values.InquaryId}
                                        placeholder="Enter title"
                                        // component={Input}
                                        disabled={true}
                                    />
                                </FormItem>
                            </div>
                            {/* <div className='parent_field'>
                        <FormItem
                            label="Inquiry  Type"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="inquiryType"
                                value={values.inquiryType}
                                placeholder="Enter title"
                                // component={Input}
                                disabled={true}
                            />
                        </FormItem>
                        </div>
                        <div className='parent_field'>
                        <FormItem
                            label="Inquiry"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="description"
                                value={values.description}
                                placeholder="Enter title"
                                // component={Input}
                                disabled={true}
                            />
                        </FormItem>
                        </div>
                        <div className='parent_field'>
                        <FormItem
                            label="Email"
                            invalid={errors.email && touched.email}
                            errorMessage={errors.email}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="email"
                                value={customer.email}
                                // placeholder="Enter title"
                                // component={Input}
                                disabled={true}
                            />
                        </FormItem>
                        </div> */}
                            <FormItem
                                label="message"
                                invalid={errors.message && touched.message}
                                errorMessage={errors.message}
                            >
                                <Field
                                    textArea
                                    type="text"
                                    autoComplete="off"
                                    name="message"
                                    placeholder="Enter message"
                                    component={Input}
                                />
                            </FormItem>
                            {/* <NewTaskField onAddNewTask={handleAddNewTask} /> */}
                            <Button block variant="solid" type="submit">
                                Submit
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
            <div>

            </div>
            {/* <ScrollBar autoHide > */}
            <Loading
                type={data?.length > 0 ? 'cover' : 'default'}
                spinnerClass={data?.length > 0 ? 'hidden' : ''}
            // loading={loading}
            >
                {data?.map((mail) => (
                    <div className='relative flex border-b border-gray-200 dark:border-gray-600 last:border-0 hover:bg-hover'>
                        <div className=' w-full py-6 pr-4 pl-5 cursor-pointer select-none hover:bg-gray-50 hover:dark:bg-gray-700 '>
                            <div className="ltr:mr-2 rtl:ml-2">
                                {/* <Avatar
                                    shape="circle"
                                    size={25}
                                    src={mail.personal_profile}
                                /> */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-between">
                                        <Avatar size={28} shape="circle" src={mail?.personal_profile} />
                                        <div className=' ml-2 rtl:mr-2 font-semibold'>
                                            {mail.username}
                                        </div>
                                    </div>
                                    <div className="ltr:ml-2 rtl:mr-20">
                                        <span className="whitespace-nowrap">
                                            {dayjs(mail.created_at).format('MM/DD/YYYY')}
                                        </span>
                                    </div>
                                </div>

                                {/* </div> */}
                                <div className="w-full">
                                    <div className="flex items-center justify-between mb-2">

                                        {/* <div className="flex items-center text-lg">
                       {mail.message[0].attachment.length >
                           0 && <HiPaperClip />}
                       {mail.starred && (
                           <HiStar className="text-amber-500 ltr:ml-1 rtl:mr-1" />
                       )}
                   </div> */}
                                    </div>
                                    <div className="flex flex-auto w-full justify-between">

                                        <b> {(mail.message)}</b>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Loading>

        </div>
    )
}

export default NewReplyForm
