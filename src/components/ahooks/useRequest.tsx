import React, { useState } from 'react';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import http from '../../http';
import ahooksApi from '../../http/api/ahooks';
import Mock from 'mockjs';
import Show from '../show';

export function deleteUser(userId: string): Promise<{ success: boolean }> {
  console.log(userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}
function Test01() {
  const firstRequest = useRequest(
    {
      ...ahooksApi.getName,
    },
    {
      requestMethod: (param: any) => http(param),
      formatResult: (res) => res.data.data,
    }
  );

  if (firstRequest.error) {
    return <div>failed to load</div>;
  }
  if (firstRequest.loading) {
    return <div>loading...</div>;
  }
  return <div>Username: {firstRequest.data}</div>;
}

function Test02() {
  const [state, setState] = useState('');

  const request01 = useRequest(
    {
      ...ahooksApi.getName,
    },
    {
      manual: true,
      requestMethod: (requestParams: any) => {
        console.log(requestParams);
        return http(requestParams);
      },
      onSuccess: (result, params) => {
        // result 为数据请求结果
        // params run 携带的参数
        console.log(result);
        console.log(params);
      },
    }
  );

  return (
    <div>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button
        disabled={request01.loading}
        type="button"
        onClick={() => request01.run(state, '11')}
      >
        {request01.loading ? 'loading' : 'submit'}
      </button>
    </div>
  );
}

const Test03 = () => {
  const request01 = useRequest(
    {
      ...ahooksApi.getName,
    },
    {
      requestMethod: (requestParams: any) => {
        return http(requestParams);
      },
      formatResult: (res) => res.data.data,
      pollingInterval: 2000,
      pollingWhenHidden: false,
    }
  );
  return (
    <>
      <p>Username: {request01.loading ? 'loading' : request01.data}</p>
      <button type="button" onClick={request01.run}>
        start
      </button>
      <button
        type="button"
        onClick={request01.cancel}
        style={{ marginLeft: 8 }}
      >
        stop
      </button>
    </>
  );
};
const Test04 = () => {
  const users = [
    { id: '1', username: 'A' },
    { id: '2', username: 'B' },
    { id: '3', username: 'C' },
  ];
  // const request01 = useRequest(
  //   {
  //     ...ahooksApi.delUserById,
  //     data: {
  //       id: users[0].id,
  //     },
  //   },
  //   {
  //     manual: true,
  //     requestMethod: (requestParams: any) => {
  //       console.log(requestParams);
  //       return http(requestParams);
  //     },
  //     onSuccess: (result, params) => {
  //       // result 为数据请求结果
  //       // params run 携带的参数
  //       console.log(result);
  //       console.log(params);
  //     },
  //   }
  // );
  const { run, fetches } = useRequest(deleteUser, {
    manual: true,
    fetchKey: (id) => id,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(`Disabled user ${params[0]}`);
      }
    },
  });

  return (
    <div>
      <div>You can click all buttons, each request has its own status.</div>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={() => {
                run(user.id);
              }}
              disabled={fetches[user.id]?.loading}
            >
              {fetches[user.id]?.loading
                ? 'loading'
                : `delete ${user.username}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Test05 = () => {
  const getUserId = (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1011);
      }, 1000);
    });
  };
  const getUsername = (id: number | undefined): Promise<string> => {
    console.log('user id:', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Mock.mock('@name'));
      }, 1000);
    });
  };
  const userIdRequest = useRequest(getUserId);
  const usernameRequest = useRequest(() => getUsername(userIdRequest.data), {
    ready: !!userIdRequest.data,
  });
  return (
    <div>
      <p>UserId: {userIdRequest.loading ? 'loading' : userIdRequest.data}</p>
      <p>
        Username: {usernameRequest.loading ? 'loading' : usernameRequest.data}
      </p>
    </div>
  );
};

const Test06 = () => {
  async function getEmail(search: string): Promise<string[]> {
    console.log(search);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Mock.mock({ 'data|5': ['@email'] }).data);
      }, 300);
    });
  }
  const { data, loading, run } = useRequest(getEmail, {
    debounceInterval: 500,
    manual: true,
  });
  return (
    <div>
      <p>Enter quickly to see the effect</p>
      <input
        placeholder="Select Emails"
        onChange={(e) => run(e.target.value)}
      />
      {loading ? (
        <p>loading</p>
      ) : (
        <ul style={{ marginTop: 8 }}>
          {data?.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Test07 = () => {
  async function getEmail(search: string): Promise<string[]> {
    console.log(search);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Mock.mock({ 'data|5': ['@email'] }).data);
      }, 100);
    });
  }
  const { data, loading, run } = useRequest(getEmail, {
    throttleInterval: 2000,
    manual: true,
  });
  return (
    <div>
      <p>Enter quickly to see the effect</p>
      <input
        placeholder="Select Emails"
        onChange={(e) => run(e.target.value)}
      />
      {loading ? (
        <p>loading</p>
      ) : (
        <ul style={{ marginTop: 8 }}>
          {data?.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default () => {
  return (
    <div style={{ height: '600px', overflowX: 'hidden', overflowY: 'scroll' }}>
      <Show title={'请求'} child={<Test01></Test01>}></Show>
      <Show title={'手动触发'} child={<Test02 />}></Show>
      <Show title={'轮询'} child={<Test03 />}></Show>
      <Show title={'并行请求'} child={<Test04 />}></Show>
      <Show title={'依赖请求'} child={<Test05 />}></Show>
      <Show title={'防抖'} child={<Test06 />}></Show>
      <Show title={'节流'} child={<Test07 />}></Show>
    </div>
  );
};
