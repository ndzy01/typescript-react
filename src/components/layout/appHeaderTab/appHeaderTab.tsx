import React from 'react'; // useState
import {
  // RouteComponentProps,
  withRouter,
} from 'react-router';
import {
  // useLocalStore,
  useObserver,
} from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import { Tabs } from 'antd';
import appTabStore from '../../../store/appTabStore';
import './appHeaderTab.scss';
const { TabPane } = Tabs;

export default withRouter((props: any) => {
  const onTabChange = (activeKey: string) => {
    appTabStore.setActiveKey(activeKey);
    props.history.push(activeKey);
  };
  const remove = (targetKey: any) => {
    let activeKey = '';
    const { pageTabArr } = appTabStore;

    let lastIndex = -1;
    pageTabArr.slice().forEach((item: any, i: number) => {
      if (item.url === targetKey) {
        lastIndex = i - 1;
      }
    });

    const panes = [
      ...pageTabArr.slice().filter((pane: any) => pane.url !== targetKey),
    ];
    if (panes.length) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].url;
      } else {
        activeKey = panes[0].url;
      }
    }
    props.history.push(activeKey);

    appTabStore.setActiveKey(activeKey);
    appTabStore.removePageTab(panes);
  };
  const onEdit = (targetKey: any) => {
    remove(targetKey);
  };
  return useObserver(() => (
    <div className="ant-layout-header-under">
      <Tabs
        onChange={onTabChange}
        hideAdd
        animated={false}
        activeKey={appTabStore.activeKey[0]}
        type="editable-card"
        onEdit={onEdit}
        tabBarExtraContent={<span>清空其他</span>}
      >
        {appTabStore.pageTabArr.slice().map((item: any) => (
          <TabPane
            tab={item.name}
            key={item.url}
            closable={appTabStore.pageTabArr.slice().length > 1}
          ></TabPane>
        ))}
      </Tabs>
    </div>
  ));
});
