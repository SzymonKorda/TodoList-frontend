import {Button, Modal, Form} from "react-bootstrap";
import {useRef} from "react";
import {Formik} from "formik";
import * as Yup from 'yup';

const RegisterUserForm = (props) => {
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 6 characters")
            .max(20, "Username must not exceed 20 characters"),
        email: Yup.string()
            .required("Email is required")
            .max(50, "Email must not exceed 20 characters")
            .email("Email is invalid"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Email must not exceed 40 characters"),
        confirmPassword: Yup.string()
            .required("Password confirmation is required")
            .oneOf([Yup.ref("password"), null], "Confirm password does not match")
    });

    // const formik = useFormik({
    //     initialValues: {
    //         username: "",
    //         email: "",
    //         password: "",
    //         confirmPassword: ""
    //     },
    //     validationSchema,
    //     validateOnChange: true,
    //     validateOnBlur: true,
    //     onSubmit: (event) => {
    //         console.log('wchodzi?')
    //         const enteredUsername = usernameInputRef.current.value;
    //         const enteredEmail = emailInputRef.current.value;
    //         const enteredPassword = passwordInputRef.current.value;
    //         props.onSubmit(enteredUsername, enteredEmail, enteredPassword);
    //     }
    // })

    return (
        <Formik
            // validateOnBlur={true}
            // validateOnChange={true}
            initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // console.log(values.username);
                const enteredUsername = usernameInputRef.current.value;
                const enteredEmail = emailInputRef.current.value;
                const enteredPassword = passwordInputRef.current.value;
                props.onSubmit(enteredUsername, enteredEmail, enteredPassword);
            }}
        >
            {({handleChange, handleBlur, values, handleSubmit, errors, touched, setFieldTouched }) => (
                <Form noValidate autoComplete={"off"} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            onBlurCapture={handleBlur}
                            type="text"
                            placeholder="username"
                            ref={usernameInputRef}
                            onClick={handleBlur}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            isInvalid={touched.username && errors.username}
                            isValid={touched.username && !errors.username}
                        />
                        <Form.Control.Feedback type={'invalid'}>{errors.username}</Form.Control.Feedback>
                        <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@gmail.com"
                            ref={emailInputRef}
                            onChange={handleChange}
                            onClick={handleBlur}
                            onBlur={handleBlur}
                            value={values.email}
                            isInvalid={touched.email && errors.email}
                            isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback type={'invalid'}>{errors.email}</Form.Control.Feedback>
                        <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            ref={passwordInputRef}
                            onChange={handleChange}
                            onClick={handleBlur}
                            onBlur={handleBlur}
                            value={values.password}
                            isInvalid={touched.password && errors.password}
                            isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback type={'invalid'}>{errors.password}</Form.Control.Feedback>
                        <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            onChange={handleChange}
                            onClick={handleBlur}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            isInvalid={touched.confirmPassword && errors.confirmPassword}
                            isValid={touched.confirmPassword && !errors.confirmPassword}
                        />
                        <Form.Control.Feedback type={'invalid'}>{errors.confirmPassword}</Form.Control.Feedback>
                        <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Cancel</Button>
                        <Button type={'submit'}>Submit</Button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterUserForm;

