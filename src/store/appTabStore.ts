import {
  action,
  // computed,
  observable,
} from 'mobx';

// activeKey: string[];
// pageTabArr: any[];
// setActiveKey: (key: string) => void;
// addPageTab: (pageTab: any) => void;
// removePageTab: (pageTabs: any) => void;
class AppTabStore {
  // 被观察者，你可以理解成Vuex中的State，也就是说，声明一些想要观察的状态，变量。
  // 被观察者可以是：JS基本数据类型、引用类型、普通对象、类实例、数组和映射
  @observable public activeKey: string[] = [];
  @observable public pageTabArr: any[] = [];

  // 计算值是可以根据现有的状态或其它计算值衍生出的值.
  // 计算值不接受参数
  // @computed
  // public get retunum() {
  //   return `${this.num}~~~~~~~~`;
  // }

  // @computed
  // public get addNum() {
  //   return this.num + 10;
  // }

  // 使用@action 更改被观察者
  @action.bound
  public setActiveKey(key: string) {
    // 更新 activeKey
    this.activeKey = [key];
  }
  @action.bound
  public addPageTab(pageTab: any) {
   
    let newPageTabs = [];
    const isShow = this.pageTabArr.find((item) => item.url === pageTab.url);
    if (!isShow) {
      newPageTabs = [...this.pageTabArr, pageTab];
    } else {
      newPageTabs = [...this.pageTabArr];
    }

    this.pageTabArr = newPageTabs;
  }

  @action.bound
  public removePageTab(pageTabs: any) {

    this.pageTabArr = pageTabs;
  }
}

const appTabStore = new AppTabStore();
export default appTabStore;
