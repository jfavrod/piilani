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

 import Config from './Config';
 import * as enums from './enums';
 import * as Factories from './factories';
 import * as interfaces from './interfaces';

/**
 * @ignore
 */
 export default {
     Config,
     Factories,
     enums,
     interfaces,
 };
