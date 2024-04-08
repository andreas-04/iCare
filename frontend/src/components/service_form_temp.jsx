import { useState } from 'react';
import { Typography, Card, Input, Button, Divider,Select, Option, selectClasses, Textarea } from "@mui/joy";
import PropTypes from 'prop-types';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import api from '../api'; // Adjust the import path as necessary

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const Service_Plan_Form = ({form_type}) => {
    // form_type = "phone";
    const userId = getCookie('user_id');
    const [formData, setFormData] = useState({
        service_name: "",
        service_description: "",
        cost: null,
        business: null,
        frequency: form_type === "lawn" || form_type === "interior" ? "" : undefined,
        users: form_type === "internet" || form_type === "phone" ? "" : undefined,
        speed: form_type === "internet" ? "" : undefined,
        preferred_plan_type: form_type === "phone" ? "" : undefined,
    });
    const [errors, setErrors] = useState({});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Name: ${name}, Value: ${value}`); // Debugging line
        setFormData({ ...formData, [name]: value });
    };
    const validateForm = () => {
        let tempErrors = {};
        if (formData.service_name === "") {
            tempErrors.service_name = "Service name is required.";
        }
        if (formData.cost === null || formData.cost <= 0) {
            tempErrors.cost = "Cost must be a positive number.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                formData.business = userId;
                const response = await api.postPlan(formData, form_type);
                console.log(response);
                // Handle successful submission, e.g., show a success message or redirect
            } catch (error) {
                console.error('Error submitting form:', error);
                // Handle errors, e.g., show an error message
            }
        }
    };
    const handleSelectChange = (event, newValue) => {
        setFormData(prevState => ({
            ...prevState,
            preferred_plan_type: newValue
        }));
    };
    return(
        <>
            <Card sx = {{width:"250px"}}>
                <Typography level="h3" align="left">Create New {form_type} Service Plan</Typography>
                <Divider></Divider>
                <Input placeholder="Service Title" onChange={handleInputChange} name='service_name' error={!!errors.service_name} ></Input>
                <Textarea 
                    placeholder="Service Description"
                    minRows={3}
                    name="service_description"
                    onChange={handleInputChange}
                ></Textarea>
                <Input
                    name="cost"
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="Cost:"
                    slotProps={{
                        input:{
                            min: 0,

                        }
                    }}
                    endDecorator={
                        <Typography variant="body2">$</Typography>
                    }
                    error={!!errors.cost}

                />
                {form_type === ("lawn" || "interior")
                    ?
                        <>
                        <Input
                            variant="outlined"
                            name='frequency'
                            onChange={handleInputChange}
                            slotProps={{
                                input:{
                                    min: 0,

                                }
                            }}
                            placeholder="Plan Frequency"
                            endDecorator={
                                <Typography variant="body2">per month</Typography>
                            }
                        />
                        </>
                    :
                    <></>
                }
                {form_type === "internet" 
                    ?
                    <>
         
                            <Input
                                name='users'
                                onChange={handleInputChange}
                                variant="outlined"
                                placeholder='Users:'
                                slotProps={{
                                    input:{
                                        min: 0,

                                    }
                                }}
                                error={errors.cost}
                            />
                            <Input
                                variant="outlined"
                                placeholder='Speed:'
                                name="speed"
                                onChange={handleInputChange}
                                slotProps={{
                                    input:{
                                        min: 0,

                                    }
                                }}
                                endDecorator={
                                    <Typography >mbs +/-</Typography>
                                }
                            />
                
                    </>
                    :
                    <></>
                }
                {form_type === "phone" 
                    ?
                    <>
                            <Input
                                name="users"

                                variant="outlined"
                                slotProps={{
                                    input:{
                                        min: 0,

                                    }
                                }}
                                placeholder='Users:'
                                onChange={handleInputChange}

                            />
                            <Select
                                name="preferred_plan_type"
                                onChange={(event) => handleSelectChange(event, "preferred_plan_type")}
                                placeholder="Select Plan Type"
                                indicator={<KeyboardArrowDown />}
                                sx={{
                                    [`& .${selectClasses.indicator}`]: {
                                    transition: '0.2s',
                                    [`&.${selectClasses.expanded}`]: {
                                        transform: 'rotate(-180deg)',
                                    },
                                    },
                                }}
                                >
                                    <Option value="prepaid">Prepaid</Option>
                                    <Option value="postpaid">Postpaid</Option>
                                    <Option value="unlimited">Unlimited</Option>
                            </Select>                    
                    </>
                    :
                    <></>
                }
                <Divider></Divider>
                <Button onClick={handleSubmit}>Create</Button>
            </Card>
        </>
    )
}
export default Service_Plan_Form;
Service_Plan_Form.propTypes = {
    form_type: PropTypes.string.isRequired,
};