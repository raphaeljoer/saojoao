import { Core } from './client';
import { ApiController } from './client/adapters/controllers/api-controller';
import { ApiGateway } from './client/adapters/gateways/api-gateway';
import { AxiosHttpClient } from './shared/drivers/http/axios-http-client';

const httpClient = new AxiosHttpClient();
const apiGateway = new ApiGateway(httpClient);

export const coreClient = new Core({
  apiController: new ApiController(apiGateway)
});
