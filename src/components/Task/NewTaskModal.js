import {useRef} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const NewTaskModal = (props) => {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        props.onAdd(enteredTitle, enteredDescription)
    };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adding new task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" ref={titleInputRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" ref={descriptionInputRef}/>
                    </Form.Group>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Cancel</Button>
                        <Button type={'submit'}>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewTaskModal;
