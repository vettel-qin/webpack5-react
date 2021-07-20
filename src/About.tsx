// import React, { useCallback, useEffect, useState } from 'react';
// import './About.less';

import React from 'react';

// import data from './data';
// let startTime = 0;

// const About = () => {
//   // const [left, setLeft] = useState([]);
//   // const [right, setRight] = useState([]);

//   // function computeRatioHeight(data) {
//   //   // 计算当前元素相对于屏幕宽度的百分比的高度
//   //   // 设计稿的屏幕宽度
//   //   const screenWidth = 375;
//   //   //设计稿中的元素高度，也可以前端根据类型约定
//   //   const itemHeight = data.height;
//   //   return Math.ceil((screenWidth / itemHeight) * 100);
//   // }

//   // function formatData(data) {
//   //   let diff = 0;
//   //   const left = [];
//   //   const right = [];
//   //   let i = 0;
//   //   while (i < data.length) {
//   //     if (diff <= 0) {
//   //       left.push(data[i]);
//   //       diff += computeRatioHeight(data[i]);
//   //     } else {
//   //       right.push(data[i]);
//   //       diff -= computeRatioHeight(data[i]);
//   //     }
//   //     i++;
//   //   }
//   //   return { left, right };
//   // }

//   // console.log(formatData(data.content));

//   // useEffect(() => {
//   //   const { left, right } = formatData(data.content)
//   //   setLeft(left);
//   //   setRight(right);
//   // }, []);
//   const [list, setList] = useState<number[]>([]);

//   const handleClick = () => {
//     startTime = new Date().getTime();
//     // console.log(startTime, 'startTime');

//     setList(new Array(40000).fill(0));
//     // sliceTime(new Array(40000).fill(0), 0);
//   };

//   function sliceTime(data: number[], times) {
//     if (!Array.isArray(data)) return;

//     const num = Math.ceil(data.length / 100);

//     if (times === num) return;

//     setTimeout(() => {
//       const newList = data.slice(times, (times + 1) * 100); // 每次截取100个

//       setList(() => (list.concat(newList)));

//       sliceTime(data, times + 1);

//     }, 0);
//   }

//   useEffect(() => {
//     const end = new Date().getTime();

//     console.log(Math.ceil(40000 /100), 'end');

//     console.log((end - startTime) / 1000);
//   }, [list]);

//   return (
//     <section>
//       <button onClick={handleClick}>点击</button>
//       {
//         list.map((item, index) => (
//           <div key={index}>{`${item} -- ${index}`}</div>
//         ))
//       }
//       {/* <ul className="column-container">
//         {left.map((item, index) => (
//           <li key={item.id}>
//             <h3>{item?.moduleNames}</h3>
//             <img src={item?.picUrl} />
//           </li>
//         ))}
//       </ul>
//       <ul className="column-container">
//         {right.map(item => (
//           <li key={item.id}>
//             <h3>{item.moduleNames}</h3>
//             <img src={item.picUrl} />
//           </li>
//         ))}
//       </ul> */}
//     </section>
//   );
// };

// export default About;

let num = 0;
class About extends React.Component<any, any> {
  state = {
    list: new Array(9999).fill(0).map(() => {
      num++;
      return num;
    }),
    scorllBoxHeight: 500 /* 容器高度(初始化高度) */,
    renderList: [] /* 渲染列表 */,
    itemHeight: 60 /* 每一个列表高度 */,
    bufferCount: 8 /* 缓冲个数 上下四个 */,
    renderCount: 0 /* 渲染数量 */,
    start: 0 /* 起始索引 */,
    end: 0 /* 终止索引 */
  };

  listBox: any = null;
  scrollBox: any = null;
  scrollContent: any = null;

  componentDidMount() {
    console.log(this.state.list);

    const { itemHeight, bufferCount } = this.state;
    /* 计算容器高度 */
    const scorllBoxHeight = this.listBox.offsetHeight;
    const renderCount = Math.ceil(scorllBoxHeight / itemHeight) + bufferCount; // 渲染数量
    const end = renderCount + 1; // 终止索引
    this.setState({
      scorllBoxHeight,
      end,
      renderCount
    });
    console.log(61 % 20, 'scrollTop');
  }

  /* 处理滚动效果 */
  handerScroll = () => {
    const { scrollTop }: any = this.scrollBox; // 获取容器scrollTop
    const { itemHeight, renderCount } = this.state;

    console.log(scrollTop % itemHeight, 'scrollTop');

    const currentOffset = scrollTop - (scrollTop % itemHeight); // 偏移量

    console.log(currentOffset, 'currentOffset');

    /* translate3d 开启css cpu 加速 */
    this.scrollContent.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
    const start = Math.floor(scrollTop / itemHeight); // 向下取整
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    this.setState({
      start,
      end
    });
  };
  /* 性能优化：只有在列表start 和 end 改变的时候在渲染列表 */
  shouldComponentUpdate(_nextProps, _nextState) {
    const { start, end } = _nextState;
    return start !== this.state.start || end !== this.state.end;
  }
  /* 处理滚动效果 */
  render() {
    console.log(1111);
    const { list, scorllBoxHeight, itemHeight, start, end } = this.state;
    const renderList = list.slice(start, end);
    return (
      <div ref={node => (this.listBox = node)}>
        {' '}
        {/* 列表 */}
        <div
          style={{ height: scorllBoxHeight, overflow: 'scroll', position: 'relative' }}
          ref={node => (this.scrollBox = node)}
          onScroll={this.handerScroll}
        >
          {' '}
          {/** 容器 */}
          {/* 占位作用 */}
          <div
            style={{
              height: `${list.length * itemHeight}px`,
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0
            }}
          />
          {/* 显然区 */}
          <div
            ref={node => (this.scrollContent = node)}
            style={{ position: 'relative', left: 0, top: 0, right: 0 }}
          >
            {renderList.map((item, index) => (
              <div className="list" key={index}>
                {item + ''} Item
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default About;
