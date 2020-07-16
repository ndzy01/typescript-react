import React from 'react';
import {
  // useLocalStore,
  useObserver,
} from 'mobx-react';
import Show from '../show';
import { useCustomHooks } from '../../hooks/appStore';
import hooks from '../../hooks';

export function Test01() {
  const store = useCustomHooks();
  const tabStore = hooks.useTabStoreHooks();
  const routerStore = hooks.useRouterStoreHooks();
  return useObserver(() => (
    <div>
      <p>{JSON.stringify(tabStore)}</p>
      {routerStore.getRouter()}
      <button
        onClick={() => {
          store.setCount();
          tabStore.setActiveKey('111');
          routerStore.setRouter('1');
        }}
      >
        {store.count}
      </button>
    </div>
  ));
}

export default () => {
  return (
    <div style={{ height: '600px', overflowX: 'hidden', overflowY: 'scroll' }}>
      <Show child={<Test01></Test01>}></Show>
    </div>
  );
};
