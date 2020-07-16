import {
  useLocalStore,
  // useObserver
} from 'mobx-react';

interface RouterStore {
  router: string;
  setRouter: (router: string) => void;
  getRouter: () => string;
}

export function useRouterStoreHooks() {
  const routerStore: RouterStore = useLocalStore(() => ({
    router: '',
    setRouter(router: string) {
      sessionStorage.setItem('router', router);
      routerStore.router = router;
    },
    getRouter() {
      console.log(sessionStorage.getItem('router'));
      if (sessionStorage.getItem('router')) {
        const router = JSON.parse(sessionStorage.getItem('router') as string);
        return router;
      }

      return '/';
    },
  }));
  return routerStore;
}
