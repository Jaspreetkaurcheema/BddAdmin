import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem,  Select } from 'components/ui'
import { Field } from 'formik'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = (props) => {
    const { touched, errors , values } = props

    const Options = [
        { value: 1, label: 'Individual' },
        { value: 2, label: 'Team' },
       
    ]

    return (
        <AdaptableCard className="mb-4" divider>
            {/* <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p> */}
            <FormItem
                label="Sports Name"
                invalid={errors.sports_name}
                errorMessage={errors.sports_name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="sports_name"
                    placeholder="Sports Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Player Per Team"
                invalid={errors.players_per_team}
                errorMessage={errors.players_per_team}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="players_per_team"
                    placeholder="Player Per Team"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Sports Type"
                invalid={errors.sports_type}
                errorMessage={errors.sports_type}
            >
                  <Field
                    name="sports_type"
                    component={({ field, form }) => (
                     
                        <Select
                            field={field}
                            form={form}
                            options={Options}
                            value={Options.filter(
                                (category) =>
                                    category.value == values.sports_type
                            )}
                            onChange={(option) =>
                                form.setFieldValue(
                                    field.name,
                                    option.value
                                )
                            }
                        />
                      
                    )}
                />
                
            </FormItem>
            <FormItem
                label="Extra Members"
                invalid={errors.extra_members}
                errorMessage={errors.extra_members}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="extra_members"
                    placeholder="Extra Members"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Icon"
                invalid={errors.icon}
                errorMessage={errors.icon}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="icon"
                    placeholder="Icon"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Game Icon"
                invalid={errors.game_icon}
                errorMessage={errors.game_icon}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="game_icon"
                    placeholder="Game Icon"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
