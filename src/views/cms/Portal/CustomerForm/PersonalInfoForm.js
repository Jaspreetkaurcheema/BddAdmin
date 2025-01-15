import React, { useEffect, useState } from 'react'
import { DatePicker, Input, FormItem, Avatar, Upload, Select } from 'components/ui'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field } from 'formik'
import {apiGetFaqIdList } from 'services/SalesService'
const PersonalInfoForm = (props) => {
    const {values, touched, errors } = props
  
    const [types, setTypes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetFaqIdList ();
                setTypes(response.data.data);
            } catch (error) {
                console.error('Error fetching faqs:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);
    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };
    return (
        <>
          
             <FormItem
                label="Type"
                invalid={errors.type && touched.type}
                errorMessage={errors.type}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="type"
                    placeholder="Type"
                    component={Input}
                    // prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem> 
        
            <FormItem
                label="Phone"
                invalid={errors.support_phone && touched.support_phone}
                errorMessage={errors.support_phone}
            > <Field
            type="text"
            autoComplete="off"
            name="support_phone"
            placeholder="Phone"
            component={Input}
            // prefix={<HiPhone className="text-xl" />}
        />
            </FormItem>
            <FormItem
                label="Email"
                invalid={errors.support_email && touched.support_email}
                errorMessage={errors.support_email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="support_email"
                    placeholder="Email"
                    component={Input}
                    // prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
          
        </>
    )
}

export default PersonalInfoForm
