import React, { useState, useLayoutEffect } from 'react';
import { message } from 'antd';
import {
  useDebounceEffect,
  useToggle,
  useMount,
  useThrottleEffect,
  useUnmount,
  useUpdate,
  useUpdateEffect,
  useUpdateLayoutEffect,
} from 'ahooks';
// import Mock from 'mockjs';
import Show from '../show';
const Test01 = () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);
  useDebounceEffect(
    () => {
      setRecords((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    }
  );
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};
const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  });
  useUnmount(() => {
    message.info('unmount');
  });
  return <div>Hello World</div>;
};
const Test02 = () => {
  const [state, { toggle }] = useToggle(false);
  return (
    <>
      <button type="button" onClick={() => toggle()}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
const Test03 = () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);
  useThrottleEffect(
    () => {
      setRecords((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    }
  );
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};

const Test04 = () => {
  const update = useUpdate();
  return (
    <>
      <div>Time: {Date.now()}</div>
      <button type="button" onClick={update} style={{ marginTop: 16 }}>
        update
      </button>
    </>
  );
};
const Test05 = () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);
  useLayoutEffect(() => {
    setEffectCount((c) => c + 1);
  }, [count]);
  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary
  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
const Test06 = () => {
  const [count, setCount] = useState(0);
  const [layoutEffectCount, setLayoutEffectCount] = useState(0);
  const [updateLayoutEffectCount, setUpdateLayoutEffectCount] = useState(0);
  useLayoutEffect(() => {
    setLayoutEffectCount((c) => c + 1);
  }, [count]);
  useUpdateLayoutEffect(() => {
    setUpdateLayoutEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary
  return (
    <div>
      <p>layoutEffectCount: {layoutEffectCount}</p>
      <p>updateLayoutEffectCount: {updateLayoutEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
export default () => {
  return (
    <div style={{ height: '600px', overflowX: 'hidden', overflowY: 'scroll' }}>
      <Show title={'useDebounceEffect'} child={<Test01></Test01>}></Show>
      <Show title={'useMount'} child={<Test02 />}></Show>
      <Show title={'useThrottleEffect'} child={<Test03 />}></Show>
      <Show title={'useUpdate'} child={<Test04 />}></Show>
      <Show title={'useUpdateEffect'} child={<Test05 />}></Show>
      <Show title={'useUpdateLayoutEffect'} child={<Test06 />}></Show>
    </div>
  );
};
