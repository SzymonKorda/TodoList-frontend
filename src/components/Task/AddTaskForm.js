import {Button, Form, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";

const AddTaskForm = (props) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required("Title is required")
            .max(50, "Title must not exceed 50 characters"),
        description: Yup.string()
            .required("Description is required")
            .max(200, "Description must not exceed 200 characters")
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema,
        onSubmit: (event) => {
            const enteredTitle= formik.values.title;
            const enteredDescription = formik.values.description;
            props.onSubmit(enteredTitle, enteredDescription)
        }
    })

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    onChange={formik.handleChange}
                    onFocus={formik.handleBlur}
                    value={formik.values.title}
                    isInvalid={formik.touched.title && formik.errors.title}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                    onChange={formik.handleChange}
                    onFocus={formik.handleBlur}
                    value={formik.values.description}
                    isInvalid={formik.touched.description && formik.errors.description}
                />
                <Form.Control.Feedback type={'invalid'}>{formik.errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
                <Button type={'submit'}>Submit</Button>
            </Modal.Footer>
        </Form>
    );
};

export default AddTaskForm;
