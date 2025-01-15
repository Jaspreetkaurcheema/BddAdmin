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
const BasicInformationFields = ({ values, touched, errors, selectedFile, setSelectedFile }) => {


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
        const videoElement = document.getElementById('videoPlayer'); // Get the video element
        if (videoElement) {
            const sourceElement = videoElement.querySelector('source'); // Get the source element inside the video
            if (sourceElement) {
                sourceElement.src = URL.createObjectURL(file); // Update the src attribute of the source element
                videoElement.load(); // Reload the video element to apply the changes
            }
        }
    };
    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
            <FormItem
                label="Title"
                invalid={errors.title}
                errorMessage={errors.title}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder="TItle"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Type"
                invalid={errors.type}
                errorMessage={errors.type}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="type"
                    placeholder="Type"
                    component={Input}
                />
            </FormItem>
          
            <FormItem
                label="Email"
                invalid={errors.support_email}
                errorMessage={errors.support_email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="support_email"
                    placeholder="Email"
                    component={Input}
                />
            </FormItem>
          
            <FormItem
                label="Video File"
                labelClass="!justify-start"
                invalid={errors.video_link}
                errorMessage={errors.video_link}
            >
                <div>
                    {selectedFile && selectedFile instanceof File && (
                        <video  id="videoPlayer" controls>
                            <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <input
                        type="file"
                        name="video_link"
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        placeholder={selectedFile ? selectedFile.name : 'Choose Video File'}
                        component={Input}
                    />
                    <button onClick={() => document.getElementsByName('video_link')[0].click()}>
                        Choose File
                    </button>
                </div>
            </FormItem>


            <FormItem
                label="Phone"
                labelClass="!justify-start"
                invalid={errors.support_phone}
                errorMessage={errors.support_phone}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="support_phone"
                    placeholder="Phone"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
