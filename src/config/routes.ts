import { RouteProps } from 'react-router';
import { lazy } from 'react';

interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, 'children'>[];
}
interface MRouteItem extends RouteProps {
  view?: string;
  path: string;
  components?: string;
  breadcrumbName: string;
}

const routes: MRouteItem[] = [
  {
    path: '/home', // 主页
    view: 'home',
    breadcrumbName: '主页',
  },
  // ---------------------
  {
    path: '/ahooks/useRequest',
    components: 'ahooks/useRequest',
    breadcrumbName: 'useRequest',
  },
  {
    path: '/ahooks/lifeCycle',
    components: 'ahooks/lifeCycle',
    breadcrumbName: 'lifeCycle',
  },
  {
    path: '/testHooks/mobx',
    components: 'testHooks/testMobx',
    breadcrumbName: 'testMobx',
  },
  {
    path: '/menu',
    components: 'layout/menu/menu',
    breadcrumbName: 'menu',
  },
];
const routes_: Route[] = routes.map((route) => {
  const obj: Route = {
    path: route.path, // 主页
    breadcrumbName: route.breadcrumbName,
  };
  return obj;
});
for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(('../views/' + item.view) as string));
  }
  if (item.components) {
    item.component = lazy(() =>
      import(('../components/' + item.components) as string)
    );
  }
}

// export routes_
export default { routes, routes_ };
