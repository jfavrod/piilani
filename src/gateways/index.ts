// Abstractions
export { default as GatewayBase } from './GatewayBase';
export { MongoGateway } from './MongoGateway';
export { default as PostgresGateway } from './PostgresGateway';

// Interfaces
export { IMongoGatewayConfig } from './IMongoGatewayConfig';

export {
  IGatewayResponse,
  ITableDataGateway,
  ITypedGatewayResponse,
} from './interfaces';

// Concretions
export { GatewayResponse } from './GatewayResponse';
