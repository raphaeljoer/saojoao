import { ApiControllerInterface } from './client/adapters/controllers/api-controller.interface';

type Props = {
  apiController: ApiControllerInterface;
};

export class Core {
  public readonly api: ApiControllerInterface;

  constructor(private readonly props: Props) {
    this.api = this.props.apiController;
  }
}
