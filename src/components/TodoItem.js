import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, handleDeleteTask, toggleIsComplete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "complete" : ""}`}>
          <div className="todo-content">{item.task}</div>
          <div>by {item.author.name ? item.author.name : null}</div>
          <div>
            <button
              className="button-delete"
              onClick={() => handleDeleteTask(item)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => toggleIsComplete(item)}
            >
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
