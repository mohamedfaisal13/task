import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const Task = () => {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);

  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
  };
  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false);
  const handleEditShow = () => {
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    SetDeleteShow(true);
  };
  const hanldeDeleteClose = () => {
    SetDeleteShow(false);
  };
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
  };

  //Define here local state that store the form Data
  const [taskname, setTaskname] = useState("");
  const [startdate, setStartdate] = useState("");
  const [startTime, setStarttime] = useState("");
  const [enddate, setEnddate] = useState("");
  const [endTime, setEndtime] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [addedon, setAddedon] = useState("");

  const [Delete, setDelete] = useState(false);
  //Id for update record and Delete
  const [id, setId] = useState("");
  const GetEmployeeData = () => {
    //here we will get all employee data
    const url = "http://localhost:8000/employee";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setData(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmite = () => {
    const url = "http://localhost:8000/employee";
    const Credentials = {
      taskname,
      startdate,
      enddate,
      priority,
      // status,
      addedon,
    };
    axios
      .post(url, Credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = () => {
    const url = `http://localhost:8000/employee/${id}`;
    const Credentials = {
      taskname,
      startdate,
      enddate,
      priority,
      // status,
      addedon,
    };
    axios
      .put(url, Credentials)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //handle Delete Function
  const handleDelete = () => {
    const url = `http://localhost:8000/employee/${id}`;
    axios
      .delete(url)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //call this function in useEffect
  // console.log(ViewShow, RowData);
  useEffect(() => {
    GetEmployeeData();
  }, [currentPage,tasksPerPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // const filteredData = Data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  // const filteredTasks = taskname.filter((task) => {
  //   return task.taskname.toLowerCase().includes(searchTerm.toLowerCase());
  // });
  // const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  //fordate change
  function handleInputChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case "start-date":
        setStartdate(value);
        break;
      case "start-time":
        setStarttime(value);
        break;
      case "end-date":
        setEnddate(value);
        break;
      case "end-time":
        setEndtime(value);
        break;
      default:
        break;
    }
  }
  //determine status
  function determineStatus() {
    const now = new Date();
    const startDateObj = new Date(`${startdate}T${startTime}:00`);
    const endDateObj = new Date(`${enddate}T${endTime}:00`);

    if (now < startDateObj) {
      setStatus("Not yet");
    } else if (now >= startDateObj && now <= endDateObj) {
      setStatus("In progress");
    } else if (now > endDateObj) {
      setStatus("Completed");
    }
  }
  return (
    <div>
      <div className="row">
        <div className="mt-5 mb-4">
          <Button
            variant="primary"
            onClick={() => {
              handlePostShow();
            }}
          >
            <i className="fa fa-plu"></i>
            Task creation
          </Button>
        </div>
      </div>
      <div align="end">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
        />
        <Button variant="primary" value={searchTerm} onChange={handleSearch}>
          <i className="fa fa-plu"></i>
          Search
        </Button>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>sl.no</th>
                <th>Taskname</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Added On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index}</td>
                  <td>{item.taskname}</td>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.priority}</td>
                  <td>{status}</td>
                  <td>
                    {new Date(item.addedon).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td style={{ minWidth: 190 }}>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        handleViewShow(SetRowData(item));
                      }}
                    >
                      View
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        handleEditShow(SetRowData(item), setId(item._id));
                      }}
                    >
                      Edit
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        handleViewShow(
                          SetRowData(item),
                          setId(item._id),
                          setDelete(true)
                        );
                      }}
                    >
                      Delete
                    </Button>
                    |
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {10}
              {/* {totalPages} */}
            </span>
            <button
              type="button"
              disabled={currentPage === 10} //totalPages
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>


      {/* View Modal */}
      <div className="model-box-view">
        <Modal
          show={ViewShow}
          onHide={hanldeViewClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
              <label htmlFor="Taskname">Taskname</label>
                <input
                  type="text"
                  className="form-control"
                  value={RowData.taskname}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
              <label htmlFor="startdate">Start Date:</label>
                <input
                  className="form-control"
                  value={RowData.startdate}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
              <label htmlFor="enddate">End Date:</label>
                <input
                  className="form-control"
                  value={RowData.enddate}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
              <label htmlFor="priority">Priority:</label>
                <input
                  className="form-control"
                  value={RowData.priority}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  className="form-control"
                  value={RowData.status}
                  readOnly
                />
              </div>
              {Delete && (
                <Button
                  type="submit"
                  className="btn btn-danger mt-4"
                  onClick={handleDelete}
                >
                  Delete Employee
                </Button>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Modal for submit data to database */}
      <div className="model-box-view">
        <Modal
          show={ViewPost}
          onHide={hanldePostClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Task creation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label htmlFor="Taskname">Taskname</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setTaskname(e.target.value)}
                  placeholder="Please enter taskname"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="startdate">Start Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startdate"
                  onChange={(e) => {
                    setStartdate(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="enddate">End Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="enddate"
                  onChange={(e) => {
                    setEnddate(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  className="form-control"
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              {/* <div className="form-group mt-3">
                <select
                  id="status"
                  className="form-control"
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Not Yet">Not yet</option>
                  <option value="In Progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div> */}
              <div className="form-group mt-3">
                <label htmlFor="Added On">Added On:</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setAddedon(new Date().toLocaleString())}
                />
              </div>
              <Button
                type="submit"
                className="btn btn-success mt-4"
                onClick={() => {
                  handleSubmite();
                  determineStatus();
                }}
              >
                Add Task
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldePostClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Modal for Edit Task record */}
      <div className="model-box-view">
        <Modal
          show={ViewEdit}
          onHide={hanldeEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label htmlFor="taskname">Task Name:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setTaskname(e.target.value)}
                  placeholder="Please enter Taskname"
                  defaultValue={RowData.taskname}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="startdate">Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="startdate"
                  onChange={(e) => setStartdate(e.target.value)}
                  defaultValue={RowData.startdate}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="enddate">End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="enddate"
                  onChange={(e) => setEnddate(e.target.value)}
                  defaultValue={RowData.enddate}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  className="form-control"
                  onChange={(event) => setPriority(event.target.value)}
                  defaultValue={RowData.priority}
                >
                  <option value="">Select</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              {/* <div className="form-group mt-3">
                <label htmlFor="status">Status:</label>
                <select
                  className="form-control"
                  onChange={(event) => setStatus(event.target.value)}
                  defaultValue={RowData.Status}
                >
                  <option value="">Select</option>
                  <option value="Not Yet">Not yet</option>
                  <option value="In Progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div> */}
              <Button
                type="submit"
                className="btn btn-warning mt-4"
                onClick={handleEdit}
              >
                Edit Employee
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Task;
