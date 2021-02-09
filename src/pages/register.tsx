import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button, propNames } from "@chakra-ui/react";
import { useMutation } from "urql";

interface registerProps {}

// have to learn how to do the loading on the button?
//isLoading={isSubmitting}

// next js will always make it a route in next JS in pages

const REGISTER_MUT = `
    mutation Register($username: String!, $password: String!) {
        register(options: {username: $username, password: $password}) {
            errors {
                field
                message
            }
        
            user {
            id
            username
            }
        }
    }
`;

export const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useMutation(REGISTER_MUT);

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => {
                    return register(values)
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button mt={4} type="submit" color="teal">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
