import {useContext, useEffect, useState} from "react";
import {Card, Button, Container, ToastContainer, Toast, Col, Row} from "react-bootstrap";
import UserContext from "../../store/user-context";
import LoginUserForm from "../User/login/LoginUserForm";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Home = () => {
    const [taskCount, setTaskCount] = useState({
        activeCount: 0,
        finishedCount: 0
    })
    const userCtx = useContext(UserContext);
    const loginUserHandler = (enteredUsername, enteredPassword) => {
        const credentials = {
            username: enteredUsername,
            password: enteredPassword
        }
        ApiService.loginUser(credentials)
            .then((response) => {
                toast.success('User logged successfully!');
                const token = response.data.accessToken;
                const username = response.data.username;
                userCtx.onLogin(username, token)
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
    };

    useEffect(() => {
        if (userCtx.isLoggedIn) {
            ApiService.getUserTaskCount()
                .then((response) => {
                    console.log(response);
                    setTaskCount({
                        activeCount: response.data.activeCount,
                        finishedCount: response.data.finishedCount
                    })
                })
        }
    }, [userCtx.isLoggedIn]);

    return (
        <>
            {userCtx.isLoggedIn ? <Container>
                        <Card>
                            <Card.Header className={"text-center"}>User's task summary</Card.Header>
                            <Card.Body>
                                <Row className={"align-items-center"}>
                                    <Col>
                                        <PieChart
                                            activeCount={taskCount.activeCount}
                                            finishedCount={taskCount.finishedCount}
                                        />
                                    </Col>
                                    <Col>
                                        <BarChart
                                            activeCount={taskCount.activeCount}
                                            finishedCount={taskCount.finishedCount}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        {/*<Col></Col>*/}
                </Container> :
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                        <Card>
                            <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="profile-img"
                                className="profile-img-card"
                            />
                            <Card.Body>
                                <LoginUserForm
                                    onSubmit={loginUserHandler}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            }
        </>
    );
};

export default Home;
