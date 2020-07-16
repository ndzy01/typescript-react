import {
  useLocalStore,
  // useObserver
} from 'mobx-react';
export function useCustomHooks() {
  // 推荐使用全局 Store 的规则来约束自定义 Hooks
  const store = useLocalStore(() => ({
    count: 0,
    setCount() {
      store.count++;
    },
  }));
  return store;
}
