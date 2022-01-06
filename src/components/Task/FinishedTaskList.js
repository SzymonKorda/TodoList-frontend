import React, {useState, useEffect} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
    PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import AddTaskModal from "./AddTaskModal";
import FullTaskInfoModal from "./FullTaskInfoModal";


const FinishedTaskList = () => {
    const [fullTaskInfoModalShow, setFullTaskInfoModalShow] = useState({
        show: false,
        task: {}
    });

    const handleFullTaskInfoModalShow = (task) => {
        setFullTaskInfoModalShow({
            show: true,
            task: task
        });
    };

    const handleFullTaskInfoModalClose = () => {
        setFullTaskInfoModalShow({
            show: false,
            task: null
        });
    }

    const {SearchBar} = Search;
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
            sort: true,
            style: {
                overflow: 'hidden',
                textOverflow: "ellipsis"
            },
            // headerStyle:{minWidth: '200px'}
        }, {
            dataField: 'description',
            text: 'Description',
            sort: true,
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
            text: 'Created On',
            sort: true,
        }, {
            dataField: 'finishedOn',
            text: 'Finished On',
            sort: true,
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
        custom: true,
        sizePerPageList: [
            {
                text: '5', value: 5
            },
            {
                text: '10', value: 10
            },
            {
                text: '15', value: 15
            }
        ]

    });

    const getFullTaskInfo = (id) => {
        ApiService.get(`task/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response.data);
                handleFullTaskInfoModalShow(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            getFullTaskInfo(row.id);
        }
    };

    return (
        <>
            <ToolkitProvider
                keyField='id'
                data={userFinishedTasks}
                columns={columns}
                search

            >
                {
                    props => (
                        <PaginationProvider pagination={pagination}>
                            {
                                (
                                    {
                                        paginationProps,
                                        paginationTableProps
                                    }
                                ) => (
                                    <Container className={'mt-5'}>
                                        <Row>
                                            <Col>
                                                <SearchBar  {...props.searchProps} srText={null}/>
                                            </Col>
                                            <Col>
                                            </Col>
                                            <Col>
                                                <PaginationListStandalone className={"bg-black"} {...paginationProps}/>
                                            </Col>
                                        </Row>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            classes={"table-dark mt-1"}
                                            bordered
                                            hover
                                            striped
                                            bootstrap4
                                            rowEvents={rowEvents}
                                            {...paginationTableProps}
                                        />
                                        <SizePerPageDropdownStandalone
                                            {...paginationProps}
                                        />
                                        <PaginationTotalStandalone {...paginationProps}/>
                                    </Container>
                                )
                            }
                        </PaginationProvider>
                    )
                }
            </ToolkitProvider>

            {fullTaskInfoModalShow.show && <FullTaskInfoModal
                show={fullTaskInfoModalShow.show}
                onHide={handleFullTaskInfoModalClose}
                task={fullTaskInfoModalShow.task}
            />}
        </>

        // <BootstrapTable
        // classes={"table-dark"}
        // keyField='id'
        // data={userFinishedTasks}
        // columns={columns}
        // bordered
        // hover
        // pagination={pagination}
        // striped
        // search
        // />}
    );
};

export default FinishedTaskList;
