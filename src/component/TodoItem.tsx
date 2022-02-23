import React from "react";

interface Props {
  //   text: string;
  //   done: boolean;
}

// 리스트
// 추가
// 삭제
// 수정
// 토글

class TodoItem extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>투두 리스트</h1>
      </div>
    );
  }
}

export default TodoItem;
