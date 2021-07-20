// import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react';

// @inject('store')
// @observer
// class App extends Component {
//   props

//   render() {
//     return (
//       <div>
//         <div>{this.props.store.count}</div>
//         <div>prevCount: {this.props.store!.prevCount}</div>
//         <button onClick={this.props.store!.add}>add</button>
//         <button onClick={this.props.store.reduce}>reduce</button>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Fragment, useState, memo } from 'react';
import { useTitle, useMount, useDebounce, useThrottle } from './hooks';

const Child1 = memo(props => {
  console.log(props, 'child1');
  const { num, handleClick } = props;

  return (
    <div
      onClick={() => {
        handleClick(num + 1);
      }}
    >
      child1
    </div>
  );
});

const Child2 = memo(props => {
  console.log(props, 'child2');
  const { text, handleClick } = props;

  return (
    <div>
      child2
      <Grandson text={text} handleClick={handleClick} />
    </div>
  );
});

const Grandson = memo(() => {
  const [number, setNumber] = useState(0);
  function lazy() {
    setTimeout(() => {
      console.log(number, 'number');

      // setNumber(number+1);
      // 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将回调函数当做参数传递给 setState。该回调函数将接收先前的 state，并返回一个更新后的值。
      setNumber(number => number + 1);
    }, 3000);
  }

  return (
    <Fragment>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={lazy}>lazy</button>
    </Fragment>
  );
  // console.log('Grandson', props);
  // const { text, handleClick } = props;

  // return (
  //   <div
  //     onClick={() => {handleClick(text + 1);}}
  //   >
  //     Grandson
  //   </div>
  // );
});

function App() {
  useTitle('App');
  const [number, setNumber] = useState(0);
  // useMount(() => {
  //   console.log('useMount');
  // });
  // const [num, setNum] = useState(0);
  // const [text, setText] = useState(1);
  // const [counter, setCounter] = useState(0);

  // const handerClick = useThrottle(() => {
  //   setCounter(counter + 1);
  // }, 2000);

  return (
    <Fragment>
      {/* <Child1 num={num} handleClick={setNum} />
      <Child2 text={text} handleClick={setText} />
      <button onClick={handerClick}>点击</button>
      <h3>{counter}</h3> */}
      <span>{number}</span>
      <button
        onClick={() => {
          setNumber(number + 1);
          console.log(number);
        }}
      >
        点击
      </button>
    </Fragment>
  );
}

export default App;
