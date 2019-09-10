import express from 'express';
import resources from '../resources';

const router = express.Router();

// whitelist of resources that can be fetched through this route.
const allowedResources = ['fetchPopularRepos'];

router.get('/', async (req, res) => {
  const { resource, ...rest } = req.query;
  const canFetchRequest = allowedResources.includes(resource);

  if (req.xhr && canFetchRequest) {
    const resourceInfo = resources[resource];
    const args = getArgs(rest, resourceInfo.args);
    await getDataAndSetRespnse(res, args);
  }
  res.status(403);
});

const getArgs = (params, args) => {
  return args.map(arg => params[arg]);
};

const getDataAndSetRespnse = async (res, args) => {
  try {
    const data = await resourceInfo.fetch.apply(null, args);
    res.set('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (ex) {
    res.status(500);
  }
};

export default router;
