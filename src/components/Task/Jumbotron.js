import {Button, Container, Row} from "react-bootstrap";

const Jumbotron = (props) => {
    const loggedIn = props.loggedIn;
    return (
        <Container fluid className="text-center mb-4">
            <Row>
                <div className="h-100 p-5 bg-secondary">
                    <h2>The best task managing App</h2>
                    <p>Manage your tasks fast and easily</p>
                    {loggedIn && <Button
                        variant="dark"
                        size="lg"
                        onClick={props.onShowModal}
                    >
                        New Task
                    </Button>}
                </div>
            </Row>
        </Container>
    );
};

export default Jumbotron;
