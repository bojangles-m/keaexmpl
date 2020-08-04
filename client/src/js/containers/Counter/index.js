import React, { Component } from 'react';
import { useActions, useValues } from 'kea';
import { logic } from '../../kea/Counter/logic';

export default class Counter extends Component {
  render() {
    return (
      <div>
        <h1>Counter Example</h1>
        <CounterValue1 />
        <CounterValue2 />
        <CounterButtons />
      </div>
    );
  }
}

const CounterButtons = () => {
  const { reset, increment, decrement } = useActions(logic);
  const step = 1;

  return (
    <div>
      <button type="button" onClick={() => decrement(step)}>
        -
      </button>
      <button type="button" onClick={() => increment(step)}>
        +
      </button>
      <button type="button" onClick={() => reset()}>
        reset
      </button>
    </div>
  );
};

const CounterValue1 = () => {
  const { counter } = useValues(logic);

  return <div>Counter 1: {counter}</div>;
};

const CounterValue2 = () => {
  const { counter } = useValues(logic);

  return <div>Counter 2: {counter}</div>;
};
