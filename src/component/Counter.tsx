import React from "react";

interface Props {}

interface State {
  counter: number;
}

class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  // 타입도 정해주지 않은 텅빈 Props 인터페이스를 사용하는 이유는 뭘까?
  // State만 사용하려하면 counter가 이상이 생기는데 이때 텅빈 Props 인터페이스를 제너릭으로 받지 않으면 안되는 이유는 뭘까?

  onIncrement = (): void => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  onDecrement = (): void => {
    this.setState(({ counter }) => ({ counter: counter - 1 }));
  };

  render() {
    const { onIncrement, onDecrement } = this;
    return (
      <div>
        <h1>카운터</h1>
        <h3>{this.state.counter}</h3>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    );
  }
}

export default Counter;
