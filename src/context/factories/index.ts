/**
 * Piilani and custom (made by users) factories.
 *
 * Each new factory should be contained within a directory. All enums
 * and interfaces created to support the factory MUST be stored within
 * the factory's directory.
 *
 * Interfaces for commonly created factories are provided in
 * `interfaces` (e.g. __IGatewayFactory__ and __IServiceFactory__).
 *
 * Abstract base classes (e.g. __FactoryBase__) are available in the
 * __baseClasses__ directory.
 *
 * @packageDocumentation
 * @module Context.Factories
 * @preferred
 */
import * as BaseClasses from './baseClasses';
import ConfigFactory from './ConfigFactory';
import * as interfaces from './interfaces';
import LoggerFactory from './LoggerFactory';

/**
 * @ignore
 */
export default {
    BaseClasses,
    ConfigFactory,
    LoggerFactory,
    interfaces,
};
