import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import {
  apiDeleteTask,
  apiGetTask,
  apiPostTask,
  apiPutTask,
} from "./../utils/api";
import TodoBoard from "../components/TodoBoard";
import { useNavigate } from "react-router-dom";

function TodoPage({ setUser }) {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await apiGetTask();
      console.log("rrr", res.data.data);
      setTodoList(res.data.data);
    } catch (err) {
      console.error("Err fetchTasks fail", err.message);
    }
  };

  const handleCreateTask = async () => {
    try {
      const res = await apiPostTask(todoValue);
      if (res.status === 200) {
        console.log("Success");
        setTodoValue("");
        fetchTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log("Err handleCreateTask fail", err.message);
    }
  };

  const toggleIsComplete = async (id) => {
    try {
      const data = todoList.find((item) => item._id === id._id);

      const { task, isComplete } = data;

      const res = await apiPutTask(id._id, task, isComplete);

      if (res.status === 200) {
        console.log("put Success");
        fetchTasks();
      }
    } catch (err) {
      console.log("Err putTask fail");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await apiDeleteTask(id._id);
      if (res.status === 200) {
        console.log("Success");
        fetchTasks();
      }
    } catch (err) {
      console.log("Err delete fail ", err.message);
    }
  };

  const handleWithLogOut = () => {
    sessionStorage.clear("token");
    setUser(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={handleCreateTask}>
            추가
          </button>
        </Col>
      </Row>
      <TodoBoard
        handleWithLogOut={handleWithLogOut}
        todoList={todoList}
        handleDeleteTask={handleDeleteTask}
        toggleIsComplete={toggleIsComplete}
      />
    </Container>
  );
}

export default TodoPage;
