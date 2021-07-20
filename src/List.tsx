import React from 'react';

let num = 0;
class List extends React.Component {
  state = {
    list: new Array(9999).fill(0).map(() => {
      num++;
      return num;
    }),
    scrollHeight: 500,
    itemHeight: 60,
    renderList: [],
    renderCount: 0,
    bufferCount: 8,
    start: 0,
    end: 0
  };
  scrollBox: HTMLDivElement | any;
  scrollContent: HTMLDivElement | any;

  componentDidMount() {
    console.log(this.props);
    const { scrollHeight, itemHeight, bufferCount } = this.state;

    const renderCount = Math.ceil(scrollHeight / itemHeight) + bufferCount;

    const end = renderCount;

    this.setState(() => ({
      end,
      renderCount
    }));
  }

  handerScroll = () => {
    const { itemHeight, bufferCount, renderCount } = this.state;

    const { scrollTop } = this.scrollBox;

    const currentOffset = scrollTop - Math.ceil(scrollTop % itemHeight);

    this.scrollContent.style.transform = `translate3d(0, ${currentOffset}px, 0)`;

    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.floor(scrollTop / itemHeight + renderCount);

    this.setState(() => ({
      start,
      end
    }));
  };

  render() {
    const { itemHeight, start, end, list, scrollHeight } = this.state;
    const renderList = list.slice(start, end);

    return (
      <div>
        <div
          style={{ position: 'relative', overflow: 'scroll', height: scrollHeight }}
          ref={node => (this.scrollBox = node)}
          onScroll={this.handerScroll}
        >
          <div
            ref={node => (this.scrollContent = node)}
            style={{ position: 'relative', left: 0, top: 0, right: 0 }}
          >
            {renderList.map((item, index) => (
              <div key={index} style={{ height: itemHeight }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
