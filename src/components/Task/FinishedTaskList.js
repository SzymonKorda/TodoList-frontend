import {useState, useEffect} from "react";
import {Button, Container, Table} from "react-bootstrap";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const FinishedTaskList = () => {
    const buttonFormatter = (id) => {
        return (
            <Button
                variant={"danger"}
                size={"sm"}
                onClick={removeTaskHandler.bind(null, id)}>
                Delete
            </Button>
        );
    }

    const columns = [
        {
            dataField: 'id',
            text: 'id',
            hidden: true
        },
        {
            dataField: 'title',
            text: 'Title',
            style: {
                overflow: 'hidden',
                textOverflow: "ellipsis"
            }
            // headerStyle:{minWidth: '200px'}
        }, {
            dataField: 'description',
            text: 'Description',
            headerStyle: {
                overflow: 'hidden',
                textOverflow: "ellipsis"
            },
            style: {
                // backgroundColor: '#c8e6c9',
                overflow: 'hidden',
                textOverflow: "ellipsis"
            }
        }, {
            dataField: 'createdOn',
            text: 'Created On'
        }, {
            dataField: 'finishedOn',
            text: 'Finished On'
        }, {
            dataField: 'action',
            text: 'Action',
            style: {
                textAlign: "center"
            },
            // classes: "d-flex justify-content-center",
            formatter: (cellContent, row) => {
                return (
                    <Button
                        variant={"danger"}
                        size={"sm"}
                        onClick={removeTaskHandler.bind(null, row.id)}>
                        Delete
                    </Button>
                );
            }
        }];

    const [userFinishedTasks, setUserFinishedTasks] = useState([]);

    useEffect(() => {
        getUserActiveTasks();
    }, []);

    const getUserActiveTasks = () => {
        ApiService.get('task', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                //TODO why active instead of isActive => check getUserTasks on backend
                let taskList = response.data;
                taskList = taskList.filter((task) => {
                    return !task.active
                })
                console.log(taskList);
                setUserFinishedTasks(taskList);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const removeTaskHandler = (id) => {
        ApiService.delete(`task/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                toast.error(response.data);
                getUserActiveTasks();
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    };

    const pagination = paginationFactory({
        page: 2,
        sizePerPage: 5
    });

    return (
        <Container className={'mt-5'}>
            <BootstrapTable
                classes={"table-dark"}
                keyField='id'
                data={userFinishedTasks}
                columns={columns}
                bordered
                hover
                pagination={pagination}
                striped/>
        </Container>
    );
};

export default FinishedTaskList;
