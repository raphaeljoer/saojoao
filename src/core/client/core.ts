import { ApiControllerInterface } from './adapters/controllers/api-controller.interface';

type Props = {
  apiController: ApiControllerInterface;
};

export class Core {
  public readonly api: ApiControllerInterface;

  constructor(private readonly props: Props) {
    this.api = this.props.apiController;
  }
}
