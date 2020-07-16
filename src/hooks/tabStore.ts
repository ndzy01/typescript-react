import {
  useLocalStore,
  // useObserver
} from 'mobx-react';
interface TabStore {
  activeKey: string[];
  pageTabArr: any[];
  setActiveKey: (key: string) => void;
  addPageTab: (pageTab: any) => void;
  removePageTab: (pageTabs: any) => void;
}

export function useTabStoreHooks() {
  const tabStore: TabStore = useLocalStore(() => ({
    activeKey: [],
    pageTabArr: [],
    setActiveKey(key) {
      tabStore.activeKey = [key];
    },
    addPageTab(pageTab) {
      const { pageTabArr } = tabStore;
      let newPageTabs = [];
      const isShow = pageTabArr.find((item: any) => item.url === pageTab.url);

      if (!isShow) {
        newPageTabs = [...pageTabArr, pageTab];
      } else {
        newPageTabs = [...pageTabArr];
      }
      tabStore.pageTabArr = newPageTabs;
    },
    removePageTab(pageTabs) {
      tabStore.pageTabArr = pageTabs;
    },
  }));
  return tabStore;
}
