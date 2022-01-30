/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogger } from '../context/interfaces';
import { IGatewayResponse, ITableDataGateway, ITypedGatewayResponse } from './interfaces';

export default class GatewayBase<Query, Model> implements ITableDataGateway<Query, Model> {
  public readonly className = this.constructor.name;
  public readonly table: string;
  protected logger: ILogger;

  constructor(tablename: string, logger: ILogger) {
    this.table = tablename;
    this.logger = logger;
  }

  delete(query: Query): IGatewayResponse {
    throw new Error('Method not implemented.');
  }

  deleteAsync(query: Query): Promise<IGatewayResponse> {
    throw new Error('Method not implemented.');
  }

  find(query?: Query): ITypedGatewayResponse<Model> {
    throw new Error('Method not implemented.');
  }

  findAsync(query?: Query): Promise<ITypedGatewayResponse<Model>> {
    throw new Error('Method not implemented.');
  }

  insert(record: Model): IGatewayResponse {
    throw new Error('Method not implemented.');
  }

  insertAsync(record: Model): Promise<IGatewayResponse> {
    throw new Error('Method not implemented.');
  }

  update(record: Model): IGatewayResponse {
    throw new Error('Method not implemented.');
  }

  updateAsync(record: Model): Promise<IGatewayResponse> {
    throw new Error('Method not implemented.');
  }

  /**
     * Get a default IGatewayResponse object.
     * @returns {IGatewayResponse} { class: 2, message: 'default response' }
     */
  protected getDefaultResponse = (): IGatewayResponse => {
    return {
      class: 2,
      message: 'default response',
    };
  };
}
