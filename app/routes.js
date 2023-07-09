import { Layout } from './views/Common';

import {
  HomePage,
  SearchPage,
  AccountPage,
  AdminPage,
  ArticlePage,
  RegisterPage,
  TosPage,
  PrivacyPage,
  UserPage,
  LoginPage,
  LogoutPage,
  NotFoundPage,
  ContactPage
} from './views/Pages';

export const routes = [
  {
    component: Layout,
    routes: [{
      path: '/',
      exact: true,
      component: HomePage
    }, {
      path: '/pages/:articleSlug',
      component: ArticlePage
    }, {
      path: '/users/:userSlug',
      component: UserPage
    }, {
      path: '/tags/:tagSlug',
      component: SearchPage
    }, {
      path: '/search/:categorySlug?',
      component: SearchPage
    }, {
      path: '/account',
      component: AccountPage
    }, {
      path: '/admin',
      component: AdminPage
    }, {
      path: '/register',
      component: RegisterPage
    }, {
      path: '/login',
      component: LoginPage
    }, {
      path: '/logout',
      component: LogoutPage
    }, {
      path: '/termsofuse',
      component: TosPage
    }, {
      path: '/privacypolicy',
      component: PrivacyPage
    }, {
      path: '/contact',
      component: ContactPage
    }, {
      path: '*',
      component: NotFoundPage
    }]
  }
];
