import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";

const FullTaskInfoModal = (props) => {
    return (
        <Modal
            show={props.show}
            size={"lg"}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{overflow: "auto"}}>
                    {props.task.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/*<Form.Group className="mb-3" controlId="title">*/}
                    {/*    <Form.Label>Title</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Title"*/}
                    {/*        value={props.task.title}*/}
                    {/*        readOnly*/}
                    {/*        disabled*/}
                    {/*    />*/}
                    {/*</Form.Group>*/}
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
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="title">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">Created on</InputGroup.Text>
                                    <Form.Control
                                        className={"bg-light"}
                                        type="text"
                                        placeholder="Title"
                                        value={props.task.createdOn}
                                        readOnly
                                        disabled
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={"auto"}>
                            <Form.Group className="mb-3" controlId="title">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">Finished on</InputGroup.Text>
                                    <Form.Control
                                        className={"bg-light"}
                                        type="text"
                                        placeholder="Title"
                                        value={props.task.finishedOn}
                                        readOnly
                                        disabled
                                    />
                                </InputGroup>
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
