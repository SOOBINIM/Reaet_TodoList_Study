import React from "react";
import Profile from "./component/Profile";
import Counter from "./component/Counter";
import TodoList from "./component/TodoList";

class App extends React.Component {
  render() {
    return (
      <div>
        <Profile name="임수빈" age={31} />
        <Counter />
        <TodoList />
      </div>
    );
  }
}

export default App;
