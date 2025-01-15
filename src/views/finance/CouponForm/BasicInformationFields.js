import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { apiGetFaqIdList } from 'services/SalesService'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from 'views/Event/Games/store/dataSlice'
import * as getOrganizer from 'views/crm/Customers/store/dataSlice'
import { apiGetCrmGames, apiGetCrmOrganizer } from 'services/CrmService'
export const categories = [
    { label: 'Percentage', value: 'Percentage' },
    { label: 'Fixed Amount', value: 'Fixed Amount' },
   
]

const BasicInformationFields = ({ values, touched, errors }) => {


    const [faqs, setFaqs] = useState(null);
    const dispatch = useDispatch()
   const [data1,setData1]=useState(null)
   const [data,setData]=useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetCrmOrganizer();
                const response1 = await apiGetCrmGames();
                setData1(response.data.data);
                setData(response1.data.data)
            } catch (error) {
                console.error('Error fetching faqs:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);
   

    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
            <FormItem
                label="Coupon Name"
                invalid={errors.coupon_name &&   touched.coupon_name}
                errorMessage={errors.coupon_name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_name"
                    placeholder="Coupon Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Code"
                invalid={errors.coupon_code  && touched.coupon_code}
                errorMessage={errors.coupon_code}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_code"
                    placeholder="Code"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={errors.coupon_description  && touched.coupon_description}
                errorMessage={errors.coupon_description}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_description"
                    placeholder="description"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Type"
                invalid={errors.coupon_type  && touched.coupon_type}
                errorMessage={errors.coupon_type}
            >
                      <Field name="coupon_type">
                                    {({ field, form }) => (
                                        <Select
                                            placeholder="Type"
                                            field={field}
                                            form={form}
                                            options={categories}
                                            value={categories.filter(
                                                (category) =>
                                                    category.value ===
                                                    values.coupon_type
                                            )}
                                            onChange={(category) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    category.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
           
            </FormItem>
            <FormItem
                label="Amount/Percentage"
                invalid={errors.coupon_off  && touched.coupon_off}
                errorMessage={errors.coupon_off}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="coupon_off"
                    placeholder="Amount"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Maximum number of usage"
                invalid={errors.max_number_of_usage  && touched.max_number_of_usage}
                errorMessage={errors.max_number_of_usage}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="max_number_of_usage"
                    placeholder="Maximum number of usage"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Per user coupon limit"
                invalid={errors.max_per_user_usage  && touched.max_per_user_usage}
                errorMessage={errors.max_per_user_usage}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="max_per_user_usage"
                    placeholder="Per user coupon limit"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Minimum order amount"
                invalid={errors.min_order_amount  && touched.min_order_amount}
                errorMessage={errors.min_order_amount}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="min_order_amount"
                    placeholder="coupon off"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Expiry date"
                invalid={errors.coupon_expiry_date  && touched.coupon_expiry_date}
                errorMessage={errors.coupon_expiry_date}
            >
                <Field
                    type="date"
                    autoComplete="off"
                    name="coupon_expiry_date"
                    placeholder="coupon off"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Event Name"
                invalid={errors.valid_to_event_id  && touched.valid_to_event_id}
                errorMessage={errors.valid_to_event_id}
            >
                <Field name="valid_to_event_id">
                    {({ field, form }) => (
                        <Select
                            isMulti
                            className="min-w-[120px]"
                            // components={{
                            //     Option: CustomSelectOption,
                            //     MultiValueLabel: CustomControlMulti,
                            // }}
                            isDisabled={!!values.valid_to_organizer_user_id.length}
                            field={field}
                            form={form}
                            options={data?.map(item => ({ value: item.id.toString(), label: item.game_title }))}

                            value={values.valid_to_event_id}
                            onChange={(member) => {
                                form.setFieldValue(
                                    field.name,
                                    member
                                )
                            }}
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Organizer Name"
                invalid={errors.valid_to_organizer_user_id  && touched.valid_to_organizer_user_id}
                errorMessage={errors.valid_to_organizer_user_id}
            >
              <Field name="valid_to_organizer_user_id">
                    {({ field, form }) => (
                        <Select
                            isMulti
                            className="min-w-[120px]"
                            // components={{
                            //     Option: CustomSelectOption,
                            //     MultiValueLabel: CustomControlMulti,
                            // }}
                            isDisabled={!!values.valid_to_event_id.length}
                            field={field}
                            form={form}
                            options={data1?.map(item => ({ value: item.id.toString(), label: item.organizer_name}))}

                            value={values.valid_to_organizer_user_id}
                            onChange={(member) => {
                                form.setFieldValue(
                                    field.name,
                                    member
                                )
                            }}
                        />
                    )}
                </Field>
            </FormItem>

            
        </AdaptableCard>
    )
}

export default BasicInformationFields
