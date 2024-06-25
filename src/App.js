import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTodoList(res.data.data);
    } catch (err) {
      console.error("getTasks error", err.message);
    }
  };

  const addTask = async () => {
    try {
      const res = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (res.status === 200) {
        console.log("Success");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const putTask = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id._id);

      const updatedTask = {
        task: task.task,
        isComplete: !task.isComplete,
      };

      const res = await api.put(`/tasks/${id._id}`, updatedTask);
      if (res.status === 200) {
        console.log("put Success");
        getTasks();
      }
    } catch (err) {
      console.log("put fail");
    }
  };

  const deleteTask = async (item) => {
    try {
      const res = await api.delete(`/tasks/${item._id}`);
      if (res.status === 200) {
        console.log("Success");
        getTasks();
      }
    } catch (err) {
      console.log("delete to error ", err.message);
    }
  };

  useEffect(() => {
    getTasks();
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
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteTask={deleteTask}
        putTask={putTask}
      />
    </Container>
  );
}

export default App;
