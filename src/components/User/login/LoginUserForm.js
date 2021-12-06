import {Button, Form, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";

const LoginUserForm = (props) => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must not exceed 20 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Email must not exceed 40 characters")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: (event) => {
            const enteredUsername = formik.values.username;
            const enteredPassword = formik.values.password;
            props.onSubmit(enteredUsername, enteredPassword);
        }
    })

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="username"
                    onFocus={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && formik.errors.username}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.username}</Form.Control.Feedback>
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
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button type={'submit'}>Submit</Button>
            </Modal.Footer>
        </Form>
    );
};

export default LoginUserForm;
