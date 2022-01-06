import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const FullTaskInfoModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/*<Modal.Header closeButton>*/}
            {/*    <Modal.Title id="contained-modal-title-vcenter">*/}
            {/*        Full task info*/}
            {/*    </Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={props.task.title}
                            readOnly
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            type="text"
                            placeholder="Title"
                            value={props.task.description}
                            readOnly
                            disabled
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Created on</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={props.task.createdOn}
                                    readOnly
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Finished on</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={props.task.finishedOn}
                                    readOnly
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FullTaskInfoModal;
