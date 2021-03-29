/**
 * The Context module is responsible for instantiating, configuring,
 * and assembling objects that are configuration and environment aware.
 *
 * This enables developers to use other modules (e.g. _services_ and
 * _gateways_) without requiring them to account for changes in
 * configuration nor envrionment.
 *
 * The objects are built and managed by/in the __Factories__ module.
 * Abstract base classes and interfaces are provided for creating
 * common factories (e.g. __PostgresqlGatewayFactory__ and
 * __IServiceFactory__).
 *
 * @packageDocumentation
 * @module Context
 * @preferred
 */

export {
    DBDriver,
    Env,
    LogDriver,
} from './enums';

export {
    IConfigValues,
    IDatabaseSSL,
    IDatabaseVals,
    IFirebaseSettings,
    ILogger,
    ILoggingConfig,
    IMultiDatabaseVals,
    IService,
} from './interfaces';

export {
    IConfig,
    isIConfig,
} from './Config';

export {
    isILogger,
    isIService,
} from './typegaurds';
