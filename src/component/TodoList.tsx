import React from "react";
import { MdDone, MdEditNote, MdDelete } from "react-icons/md";

interface Props {}

interface State {
  createInput: string;
  updateInput: string;
  todoItems: {
    id: number;
    text: string | undefined;
    editMode: boolean;
  }[];
}

interface TodoItem {
  text: string | undefined;
  editMode: boolean;
}

class TodoList extends React.Component<Props, State, TodoItem> {
  id: number = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      createInput: "",
      updateInput: "",
      todoItems: [],
    };
  }

  // public onUpdate = (id: number, updateInput: string): void => {
  //   console.log("완료버튼");
  //   console.log("updateInput : " + updateInput);
  //   // const { todoItems } = this.state;
  //   // const index = todoItems.findIndex((data) => data.id === id); // id 로 인덱스 찾기
  //   // const nextItems = [...todoItems]; // 배열 내용을 복사

  //   this.setState(({ todoItems }) => ({
  //     todoItems: todoItems.map((todo) => (id === todo.id ? { ...todo } : todo)),
  //   }));
  // };

  public onEdit = (id: number, updateInput?: string): void => {
    console.log("완료버튼");
    console.log("updateInput : " + updateInput);
    const { todoItems } = this.state;
    const index = todoItems.findIndex((data) => data.id === id); // id 로 인덱스 찾기
    const selectedItem = todoItems[index]; //  아이템 선택
    const nextItems = [...todoItems]; // 배열 내용을 복사
    console.log("index : " + index);
    console.log("todoItems[index].text : " + todoItems[index].text);

    // nextItems 는 바뀌는 전체 배열 값
    const nextItem = {
      ...selectedItem,
      editMode: !selectedItem.editMode,
      text: updateInput,
    };

    console.log(
      "원래 값 : " +
        selectedItem.text +
        " 바뀔 불린 : " +
        nextItem.editMode +
        " 바뀔 값 : " +
        nextItem.text
    );

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
    // console.log(value);
    this.setState({
      createInput: value,
    });
  };

  public onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("submit");
    this.setState(({ todoItems, createInput }) => ({
      createInput: "",
      todoItems: todoItems.concat({
        id: this.id++,
        text: createInput,
        editMode: false,
      }),
    }));
  };

  public render(): React.ReactNode {
    const { onChange, onSubmit, onRemove, onEdit } = this;
    const { createInput, todoItems, updateInput } = this.state;

    console.log("updateInput : " + updateInput);

    const todoItemsList = todoItems.map((data) => (
      <li key={data.id}>
        {data.editMode ? (
          <form>
            <input
              defaultValue={"원래값"}
              onChange={(e) => this.setState({ updateInput: e.target.value })}
              value={updateInput}
            />
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onEdit(data.id, updateInput)}
            >
              <MdDone />
            </span>
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onRemove(data.id)}
            >
              <MdDelete />
            </span>
          </form>
        ) : (
          <div>
            <b>{data.text}</b>
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onEdit(data.id)}
            >
              <MdEditNote />
            </span>
            <span
              style={{ marginLeft: "0.5rem" }}
              onClick={() => onRemove(data.id)}
            >
              <MdDelete />
            </span>
          </div>
        )}
      </li>
    ));

    return (
      <div>
        <h1>오늘 뭐하지?</h1>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={createInput} />
          <button type="submit">추가하기</button>
        </form>
        <ul>{todoItemsList}</ul>
      </div>
    );
  }
}

export default TodoList;
