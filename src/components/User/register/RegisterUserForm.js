import {Button, Form, Modal} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from 'yup';

const RegisterUserForm = (props) => {
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

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: (event) => {
            const enteredUsername = formik.values.username;
            const enteredEmail = formik.values.email;
            const enteredPassword = formik.values.password;
            props.onSubmit(enteredUsername, enteredEmail, enteredPassword);
        }
    })

    return (
        <Form noValidate autoComplete={"off"} onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="username"
                    onFocus={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && formik.errors.username}
                    isValid={formik.touched.username && !formik.errors.username}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.username}</Form.Control.Feedback>
                <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={formik.handleChange}
                    onFocus={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                    isValid={formik.touched.email && !formik.errors.email}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.email}</Form.Control.Feedback>
                <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onFocus={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password}
                    isValid={formik.touched.password && !formik.errors.password}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.password}</Form.Control.Feedback>
                <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onFocus={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.confirmPassword}</Form.Control.Feedback>
                <Form.Control.Feedback type={'valid'}>Correct!</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button type={'submit'}>Submit</Button>
            </Modal.Footer>
        </Form>
    );
};

export default RegisterUserForm;

