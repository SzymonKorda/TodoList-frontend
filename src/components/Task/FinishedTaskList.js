import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import ApiService from "../../utils/ApiService";
import {toast} from "react-toastify";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import FullTaskInfoModal from "./FullTaskInfoModal";
import DeleteTaskWarningModal from "./DeleteTaskWarningModal";


const FinishedTaskList = () => {
    const [deleteTaskModalShow, setDeleteTaskModalShow] = useState({
        show: false,
        id: -1
    });
    const [fullTaskInfoModalShow, setFullTaskInfoModalShow] = useState({
        show: false,
        task: {}
    });

    const handleDeleteTaskModalShow = (id) => {
        setDeleteTaskModalShow({
            show: true,
            id: id
        });
    };

    const handleDeleteTaskModalClose = () => {
        setDeleteTaskModalShow({
            show: false,
            id: -1
        });
    }

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
            // style: {
            //     textAlign: "center"
            // },
            // classes: "d-flex justify-content-center",
            formatter: (cellContent, row) => {
                return (
                    <>
                        <Button
                            variant={"success"}
                            size={"sm"}
                            onClick={getFullTaskInfo.bind(null, row.id)}>
                            Show
                        </Button> {' '}
                        <Button
                            variant={"danger"}
                            size={"sm"}
                            onClick={handleDeleteTaskModalShow.bind(null, row.id)}>
                            Delete
                        </Button>
                    </>
                )
                    ;
            }
        }];

    const [userFinishedTasks, setUserFinishedTasks] = useState([]);

    useEffect(() => {
        getUserFinishedTasks();
    }, []);

    const getUserFinishedTasks = () => {
        ApiService.getUserFinishedTasks()
            .then((response) => {
                console.log(response.data);
                setUserFinishedTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const removeTaskHandler = () => {
        ApiService.deleteTask(deleteTaskModalShow.id)
            .then((response) => {
                handleDeleteTaskModalClose();
                toast.error(response.data);
                getUserFinishedTasks();
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
        ApiService.getTask(id)
            .then((response) => {
                console.log(response.data);
                handleFullTaskInfoModalShow(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    // const rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         getFullTaskInfo(row.id);
    //     }
    // };

    return (
        <div>
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
            {deleteTaskModalShow.show && <DeleteTaskWarningModal
                show={deleteTaskModalShow}
                onHide={handleDeleteTaskModalClose}
                onConfirm={removeTaskHandler}
            />}
        </div>

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
