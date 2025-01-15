import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { apiGetFaqIdList } from 'services/SalesService'
export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]
const BasicInformationFields = ({ values, touched, errors ,selectedFile, setSelectedFile}) => {

  
    const [types, setTypes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetFaqIdList();
                setTypes(response.data.data);
            } catch (error) {
                console.error('Error fetching faqs:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);
    


    // Function to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
           
        setSelectedFile(file);
      };

    return (
        <AdaptableCard className="mb-4" divider>
         
         <FormItem
                label="Team Charge"
                invalid={errors.team_charges}
                errorMessage={errors.team_charges}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="team_charges"
                    placeholder="Team Charge"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Tax"
                invalid={errors.tax}
                errorMessage={errors.tax}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tax"
                    placeholder="Tax"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Per Transaction Charge %"
                invalid={errors.transaction_charges}
                errorMessage={errors.type}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="transaction_charges"
                    placeholder="Per Transaction Charge %"
                    component={Input}
                />
            </FormItem>
           
        </AdaptableCard>
    )
}

export default BasicInformationFields
