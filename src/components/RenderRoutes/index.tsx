import React from 'react';
import { HashRouter, Router, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Error404 from '@views/Exception/404';
import LayoutStore from '@store/layoutStore';
import AsyncComponent from '../AsyncComponent';
import { createHashHistory } from 'history';
import { RouteRoot } from '@models/global';
import { userStore } from '@store/userStore';

interface InjectedProps {
  layoutStore: LayoutStore;
}

interface RouteMiddleProps {
  path: string;
  exact?: boolean;
  strict?: boolean;
  render: Function;
  key: string | number;
}

interface RouteMiddleRouteProps extends RouteMiddleProps, RouteComponentProps {}

const history = createHashHistory();

const RenderRoutes: React.FC = (props) => {
  const injected = () => props as InjectedProps;

  const RouteMiddle = (rmProps: RouteMiddleProps) => {
    const { location } = rmProps as RouteMiddleRouteProps;
    const { path, exact, strict, render, ...rest } = rmProps;
    return (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={(props) => render({ ...props, ...rest })}
      />
    );
  };
  const generateRoute = (routes: RouteRoot[], switchProps?: any) => {
    const { userInfo, isAuthenticated } = userStore;
    return routes ? (
      <Switch {...switchProps}>
        {routes.map((route: any, i: number) => {
          const {
            redirect,
            path,
            exact,
            strict,
            routes: child,
            component,
            key
            // withAuthority,
            // authority,
            // name
          } = route;

          if (redirect) {
            if (userInfo.role === 'STORE') {
              console.log('redirect', userInfo.role);
              return (
                <Redirect
                  key={key || i}
                  from={path}
                  to={'/storeDiscount/apply'}
                  exact={exact}
                  strict={strict}
                />
              );
            }
            return (
              <Redirect key={key || i} from={path} to={redirect} exact={exact} strict={strict} />
            );
          }
          return (
            <RouteMiddle
              key={i}
              path={path}
              exact={exact}
              strict={strict}
              render={(props: any) => {
                const childRoutes = generateRoute(child, {
                  location: props.location
                });
                if (component) {
                  return (
                    <AsyncComponent componentInfo={component} route={route}>
                      {childRoutes}
                    </AsyncComponent>
                  );
                } else {
                  return childRoutes;
                }
              }}
            />
          );
        })}
        <Route component={Error404} />
      </Switch>
    ) : null;
  };

  const {
    layoutStore: { routeConfig }
  } = injected();
  return (
    <Router history={history}>
      <HashRouter>{generateRoute(routeConfig)}</HashRouter>
    </Router>

    // <HashRouter>
    //   <Router history={history}>{generateRoute(routeConfig)}</Router>
    // </HashRouter>
  );
};

export default inject('layoutStore')(observer(RenderRoutes));
