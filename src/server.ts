import 'reflect-metadata'; // this shim is required
import { createKoaServer } from 'routing-controllers';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import Router from 'koa-router';
import { ExampleController } from './controllers/ExampleController';
import logger from 'koa-logger';
import { PotionsController } from './controllers/Potions';

const storage = getMetadataArgsStorage();
const schemas = validationMetadatasToSchemas();

const spec = routingControllersToSpec(
  storage,
  {},
  {
    components: {
      components: { schemas },
      info: { title: 'Grand Exchange Profit Proxy', version: '1.0.0' },
    },
  }
);

// Create server instance
const app = createKoaServer({
  controllers: [ExampleController, PotionsController],
});

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = spec;
});

router.get('/_health', (ctx) => {
  ctx.body = 'Ok';
});

app.use(router.routes());
app.use(logger());

export default app;
