import Home from '../components/home';
import Grid from '../components/grid';
import fetchPopularRepos from '../server/resources/fetchPopularRepos';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/popular/:language',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
];
