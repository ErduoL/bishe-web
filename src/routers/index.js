import Home from '../pages/Home/Home.components';
import Login from '../pages/Login';
import Member from '../pages/Member';
import paths from './paths';
import AddMenu from '../pages/Member/page/Add';

export default [
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.home,
    component: Home,
    guard: true,
  },
  {
    path: paths.member,
    component: Member,
    guard: true,
  },
  {
    path: paths.addMenu,
    component: AddMenu,
    guard: true,
  },

];
