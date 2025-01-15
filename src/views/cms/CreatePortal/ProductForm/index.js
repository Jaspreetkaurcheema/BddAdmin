import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import axios from 'axios';
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title Required'),
    support_email: Yup.string().required('Email Required'),
    
    type: Yup.string().required('Type Required'),
  

    video_link: Yup.string(),
    support_phone: Yup.string()
    .required('Phone Required').matches(
        /^[0-9]{10}$/,
        'Phone number must be exactly 10 digits'
    ),

})

const DeleteProductButton = ({ onDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                type="danger"
                title="Delete product"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props
    const [selectedFile, setSelectedFile] = useState({});
    const [source, setSource] = useState(null)
    const newId = useUniqueId('product-')



    const uploadFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('video_link', file);
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            let accessToken = persistData.auth.session.token
            const response = await axios.post('http://localhost:8000/apis/admin/upload-video', formData, {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }

            });

            // Include link in the response data
            const responseDataWithLink = {
                ...response.data,
                link: 'https://' + response.data.fileName // Replace this with your actual link format
            };

            return responseDataWithLink;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    // const checkUrlExists = async (url) => {
    //     try {
    //       const response = await fetch(url, { method: 'HEAD' });
    //       return response.ok;
    //     } catch (error) {
    //       console.error('Error checking URL existence:', error);
    //       return false;
    //     }
    //   };
    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                            label: value,
                            value,
                        }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, errors }) => {
                    const formData = cloneDeep(values)
                    formData.tags = formData.tags.map((tag) => tag.value)
                
                
                 
                    // Upload the file and get the FileSystem_url
                    const fileData = await uploadFile(selectedFile);
                    const FileSystem_url = fileData.data.FileSystem_url;

                    // Check if the FileSystem_url exists
                    if (!FileSystem_url.length  ) {
                        // If the URL does not exist, set an error message
                      errors ({"video_link": 'The video URL does not exist.'});
    
                    }
                       formData.video_link = FileSystem_url;
                    onFormSubmit?.(formData, setSubmitting)
                  
                
                    // Append FileSystem_url to formData
                 //   formData.video_link = FileSystem_url;
                    // console.log(formData, 'kkkkkk')
                    // if (type === 'new') {
                    //     formData.id = newId
                    //     if (formData.imgList.length > 0) {
                    //         formData.img = formData.imgList[0].img
                    //     }
                    // }
                   
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    values = { ...values, selectedFile }

                    


                    return <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        setSelectedFile={setSelectedFile}
                                        selectedFile={selectedFile}
                                    />
                                    {/* <PricingFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> */}
                                </div>
                                <div className="lg:col-span-1">
                                    {/* <ProductImages
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> */}
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        type="button"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                }}
            </Formik>
        </>
    )
})

ProductForm.defaultProps = {
    type: 'edit',
    initialData: {
        id: '',
        name: '',
        productCode: '',
        img: '',
        imgList: [],
        category: '',
        price: 0,
        stock: 0,
        status: 0,
        costPerItem: 0,
        bulkDiscountPrice: 0,
        taxRate: 6,
        tags: [],
        brand: '',
        vendor: '',
        description: '',
    },
}

export default ProductForm
