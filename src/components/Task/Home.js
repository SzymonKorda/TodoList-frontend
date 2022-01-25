import {useContext, useEffect, useState} from "react";
import {Button, Card, CardGroup, Col, Container, Row} from "react-bootstrap";
import UserContext from "../../store/user-context";
import LoginUserForm from "../User/login/LoginUserForm";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import classes from "./Home.module.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

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

        // <Card>
        //     <Card.Header className={"text-center"}>User's task summary</Card.Header>
        //     <Card.Body>
        //         <Row className={"align-items-center"}>
        //             <Col>
        //                 <PieChart
        //                     activeCount={taskCount.activeCount}
        //                     finishedCount={taskCount.finishedCount}
        //                 />
        //             </Col>
        //             <Col>
        //                 <BarChart
        //                     activeCount={taskCount.activeCount}
        //                     finishedCount={taskCount.finishedCount}
        //                 />
        //             </Col>
        //         </Row>
        //     </Card.Body>
        // </Card>


        // <div className="col-md-10">
        //     <div className={}>
        //
        //     </div>
        //
        // </div>

        // <Card className="col-md-12">
        //     <img
        //         src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        //         alt="profile-img"
        //         className="profile-img-card"
        //     />
        //     <Card.Body className="card card-container">
        //         <LoginUserForm
        //             onSubmit={loginUserHandler}
        //         />
        //     </Card.Body>
        // </Card>

        // <div className="col-md-12">
        //     <div className="card card-container"></div>
        // </div>


        <>
            {userCtx.isLoggedIn ?
                <div className="col-md-12">
                    <div className={`${classes.card} ${classes['card-container-charts']}`}>
                        <Row>
                            {/*<Card.Header className={"text-center"}>User's task summary</Card.Header>*/}
                            <h2 className={"text-center mb-5"}>User's task summary</h2>
                        </Row>
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
                    </div>
                </div> :
                <div className="col-md-12">
                    <div className={`${classes.card} ${classes['card-container']}`}>
                        <h2 className={"text-center mb-3"}>Log in</h2>
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className={classes["profile-img-card"]}
                        />
                        <LoginUserForm
                            onSubmit={loginUserHandler}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default Home;
