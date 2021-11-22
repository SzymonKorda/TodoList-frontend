import {Button, Card} from "react-bootstrap";

const TaskItem = (props) => {
    return (
        <Card style={{
            backgroundColor: '#b0abab'
        }}>
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Button variant={"success"}>Done</Button> {' '}
                <Button variant={"warning"}>Update</Button> {' '}
                <Button variant={"danger"}>Delete</Button> {' '}
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
