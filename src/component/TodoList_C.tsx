import React from "react";
import { MdDone, MdEditNote, MdDelete } from "react-icons/md";

interface Props {}

interface State {
  input: string;
  todoItems: {
    id: number;
    text: string;
    editMode: boolean;
  }[];
}

interface TodoItem {
  text: string;
  editMode: boolean;
}

class TodoList extends React.Component<Props, State, TodoItem> {
  id: number = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      input: "",
      todoItems: [],
    };
  }

  public onUpdate = (id: number): void => {
    this.setState(({ todoItems }) => ({
      todoItems: todoItems.map((todo) => (id === todo.id ? { ...todo } : todo)),
    }));
  };

  public onEdit = (id: number): void => {
    const { todoItems } = this.state;
    const index = todoItems.findIndex((data) => data.id === id); // id 로 인덱스 찾기
    const selectedItem = todoItems[index]; //  아이템 선택
    const nextItems = [...todoItems]; // 배열 내용을 복사

    const nextItem = {
      ...selectedItem,
      editMode: !selectedItem.editMode,
    };

    nextItems[index] = nextItem; // 교체 처리

    this.setState({
      todoItems: nextItems,
    });
  };

  public onRemove = (id: number): void => {
    this.setState(({ todoItems }) => ({
      todoItems: todoItems.filter((data) => data.id !== id),
    }));
  };

  public onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    console.log(value);
    this.setState({
      input: value,
    });
  };

  public onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("submit");
    this.setState(({ todoItems, input }) => ({
      input: "",
      todoItems: todoItems.concat({
        id: this.id++,
        text: input,
        editMode: false,
      }),
    }));
  };

  public render(): React.ReactNode {
    const { onChange, onSubmit, onRemove, onEdit, onUpdate } = this;
    const { input, todoItems } = this.state;

    const todoItemsList = todoItems.map((data) => (
      <li key={data.id}>
        {data.editMode ? (
          <form>
            <input value={data.text} />
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onUpdate(data.id)}
            >
              <MdDone />
            </span>
          </form>
        ) : (
          <b>{data.text}</b>
        )}

        <span style={{ marginLeft: "0.5rem" }} onClick={() => onEdit(data.id)}>
          <MdEditNote />
        </span>

        <span
          style={{ marginLeft: "0.5rem" }}
          onClick={() => onRemove(data.id)}
        >
          <MdDelete />
        </span>
      </li>
    ));

    return (
      <div>
        <h1>오늘 뭐하지?</h1>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={input} />
          <button type="submit">추가하기</button>
        </form>
        <ul>{todoItemsList}</ul>
      </div>
    );
  }
}

export default TodoList;
