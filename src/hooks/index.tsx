import { useCallback, useEffect, useRef, useState } from 'react';

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

const useUnMount = (fn: () => void) => {
  useEffect(() => {
    return () => {
      fn();
    };
  }, []);
};

// 监听窗口变化
const useOnResize = (fn: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', fn);

    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);
};

function useSetState(initalState: () => { name: string; age: number }) {
  const [_state, _setState] = useState(initalState);

  const setState = useCallback(state => {
    _setState((prev: any) => {
      let nextState = state;
      if (typeof state === 'function') {
        nextState = state(prev);
      }
      return { ...prev, ...nextState };
    });
  }, []);
  return [_state, setState];
}

function useChange(initial: string) {
  const [value, setValue] = useState(initial);
  const onChange = useCallback(e => setValue(e.target.value), []);

  return {
    value,
    setValue,
    onChange,
    // 绑定到原生事件
    bindEvent: {
      value,
      onChange
    }
  };
}

function useTitle(title: string) {
  const prevTitleRef = useRef(document.title || '');

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = prevTitleRef.current;
    };
  }, [title]);
}

// function useDebounce(fn: Function, delay: number) {
//   const { current } = useRef<any>({});

//   function f(...args: any[]) {
//     if (current.timer) {
//       clearTimeout(current.timer);
//     }

//     current.timer = setTimeout(fn.bind(undefined, ...args), delay);
//   }

//   return f;
// }

// 防抖 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
const useDebounce = (fn, delay, dep = []) => {
  const { current } = useRef({ fn, timer: 0 });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback((...args) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = window.setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
};

// function useThrottle(fn: Function, delay: number) {
//   const { current } = useRef<any>({});

//   function f(...args: any[]) {
//     if (!current.timer) {
//       current.timer = setTimeout(() => {
//         delete current.timer;
//       }, delay);
//       fn(...args);
//     }
//   }

//   return f;
// }

// 节流：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
const useThrottle = (fn, delay, dep = []) => {
  const { current } = useRef<any>({ fn, timer: 0 });

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback((...args) => {
    if (!current.timer) {
      current.timer = window.setTimeout(() => {
        delete current.timer;
      }, delay);

      current.fn.call(this, ...args);
    }
  }, dep);
};

type Toggle = [value: boolean, toggler: () => void];

// 实现boolean值切换
function useToggle(initialValue?: boolean): Toggle {
  const [value, setValue] = useState(!!initialValue);
  const toggler: () => void = useCallback(() => setValue(value => !value), []);

  return [value, toggler];
}

// 获取上一次渲染的值
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  // useEffect会在完成这次'渲染'之后执行
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// 简化localStorage存取
function useLocalStorage(key = '', initialValue: any = '') {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 自定义更新函数
  const setLocalStorageState = useCallback(newState => {
    try {
      const newStateValue = typeof newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      window.localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`);
    }
  }, []);

  // 移除状态
  const clearLoaclStorageState = useCallback(() => {
    window.localStorage.removeItem(key);
    setState('');
  }, []);

  return [state, setLocalStorageState, clearLoaclStorageState];
}

// 简化sessionStorage存取
function useSessionStorage(key = '', initialValue: any = '') {
  const [state, setState] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setSessionStorage = useCallback(newState => {
    try {
      const newStateValue = typeof newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      window.sessionStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.error(`Unable to store new value for ${key} in sessionStorage.`);
    }
  }, []);

  const clearSessionStorage = useCallback(() => {
    window.sessionStorage.removeItem(key);
    setState('');
  }, []);

  return [state, setSessionStorage, clearSessionStorage];
}

export {
  useMount,
  useUnMount,
  useTitle,
  useDebounce,
  useThrottle,
  useOnResize,
  useSessionStorage,
  useLocalStorage,
  useSetState,
  usePrevious,
  useToggle,
  useChange
};
