import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";

const SimpleTaskInfoModal = (props) => {
    return (
        <Modal
            show={props.show}
            size={"lg"}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" style={{overflow: 'auto'}}>
                    {props.task.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        {/*<Form.Label>Description</Form.Label>*/}
                        <Form.Control
                            as="textarea"
                            rows={7}
                            type="text"
                            placeholder="Title"
                            value={props.task.description}
                            readOnly
                            disabled
                            className={"bg-light"}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SimpleTaskInfoModal;
