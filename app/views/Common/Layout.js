// set page title default base
// detect route change
// freeze route for debounce time
// cancel if already pending navigation data
// reset title
// disable scroll bar
// hide footer
// load data for next route
// get if childrens return a redirection
// redirect if needed
// get if childrens return meta head tags
// render meta head tags via react portal (react-head)
// render route children with loading prop if time is above debounce and data still not loaded
// scroll to top if not browser history navigation
// detect if error

import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { Title, Meta } from 'react-head';
// import XRay from 'react-x-ray';
import parseQueryString from 'query-string';
import { Switch, Route } from 'react-router';
import { matchRoutes } from 'react-router-config';
import HeadTag from 'react-head';

import loadRouteData from '../../loadRouteData';
import loadRouteMeta from '../../loadRouteMeta';
import { getStore } from '../../config/store';
import { routes } from'../../routes';
import { Header, Footer, Debug, CookieBanner } from '.';

function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null;
}

class Layout extends Component {
  static debounceTransitionDuration = 400

  static loadMeta(getState, match, query, context) {
    context.base = 'XXXXXX';
  }

  state = {
    isAppFetching: false,
    appFetchingSucceeded: null,
    appFetchingError: null
  }

  metadata = []

  timeoutHandler = null

  componentWillReceiveProps(nextProps) {
    const current = `${this.props.location.pathname}${this.props.location.search}`;
    const next = `${nextProps.location.pathname}${nextProps.location.search}`;

    if (current !== next) {
      this.scrolls = this.scrolls || {};
      this.scrolls[this.props.location.key] = document.documentElement.scrollTop;
      this.fetchRoutes(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.isAppFetching;
  }

  componentDidUpdate() {
    if (this.props.history.action === 'PUSH') {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, this.scrolls[this.props.location.key]);
    }
  }

  componentWillUnmount() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
  }

  fetchRoutes(props) {
    const { location } = props;

    this.setState({
      isAppFetching: true,
      previousLocation: this.props.location,
      appFetchingError: null
    });

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    } else {
      this.timeoutHandler = setTimeout(() => {
        clearTimeout(this.timeoutHandler);
        this.timeoutHandler = null;
        this.setState({
          previousLocation: null,
        }, this.forceUpdate);
      }, Layout.debounceTransitionDuration);
    }

    if (this.lastRouteDataPromise) {
      this.lastRouteDataPromise.cancel();
    }

    const branch = matchRoutes(routes, location.pathname);
    const parsedQuery = parseQueryString.parse(location.search);

    this.lastRouteDataPromise = loadRouteData(branch, parsedQuery, getStore().dispatch)
      .then(() => {
        const [metadata, context] = loadRouteMeta(branch, parsedQuery, getStore().getState);

        if (context.status >= 300 && context.status < 400) {
          // todo: should handle nextLocation
          this.setState({
            isAppFetching: false,
            previousLocation: null,
            appFetchingSucceeded: true
          }, this.forceUpdate);

          return this.props.history.push(context.to);
        }

        if (metadata) {
          this.metadata = metadata;
        }

        if (this.timeoutHandler) {
          clearTimeout(this.timeoutHandler);
          this.timeoutHandler = null;
        }
        this.setState({
          isAppFetching: false,
          previousLocation: null,
          appFetchingSucceeded: true
        });
      })
      .catch(err => {
        this.setState({
          isAppFetching: false,
          previousLocation: null,
          appFetchingSucceeded: false,
          appFetchingError: err
        });
      });
    this.metadata = null;
  }

  render() {
    const loading = !this.state.previousLocation && this.state.isAppFetching;

    return (
      <div className='Layout'>
        {this.metadata}
        {/*<XRay style={{ display: 'table', height: '100%', width: '100%' }} center>*/}
          <div
            className='Content'
            style={loading ? {
              position: 'fixed', top: '0', left: '0', right: '0', bottom: '0'
            } : {}}
          >
            {renderRoutes(this.props.route.routes, {
              loading
            }, { location: this.state.previousLocation || this.props.location })}
            <CookieBanner />
          </div>
        {/*</XRay>*/}
      </div>
    );
  }
}

export default Layout;
