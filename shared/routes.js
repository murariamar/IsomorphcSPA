import Home from '../components/home';
import Grid from '../components/grid';
import fetchPopularRepos from '../server/resources/fetchPopularRepos';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
];

export { routes };
