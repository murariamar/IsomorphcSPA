import express from 'express';
import resources from '../resources';

const router = express.Router();

// whitelist of resources that can be fetched through this route.
const allowedResources = ['fetchPopularRepos'];

const getArgs = (params, args) => {
  return args.map(arg => params[arg]);
};

const getDataAndSetRespnse = async (res, resourceInfo, queryParams) => {
  try {
    const { fetch: dataFetch, args: resourceArgs } = resourceInfo;
    const args = getArgs(queryParams, resourceArgs);
    const data = await dataFetch(...args);
    res.set('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (ex) {
    res.status(500);
  }
};

router.get('/', async (req, res) => {
  const { resource, ...rest } = req.query;
  const canFetchRequest = allowedResources.includes(resource);

  if (req.xhr && canFetchRequest) {
    const resourceInfo = resources[resource];
    await getDataAndSetRespnse(res, resourceInfo, rest);
  }
  res.status(403);
});

export default router;
