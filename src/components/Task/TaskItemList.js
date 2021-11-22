import {Col, Container, Row} from "react-bootstrap";
import TaskItem from "./TaskItem";

const TaskItemList = (props) => {
    return (
        <Container fluid className={'mb-4'} style={{
            backgroundColor: '#817f7f'
        }}>
            <Row xs={3} className="g-4 ">
                {props.tasks.map((task) => (
                    <Col key={task.id}>
                        <TaskItem
                            title={task.title}
                            description={task.description}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TaskItemList;
