import Home from '../pages/Home/Home.components';
import Login from '../pages/Login';
import paths from './paths';

export default [
  {
    path: paths.home,
    component: Home,
    guard: true,
  },
  {
    path: paths.login,
    component: Login,
  },
];
