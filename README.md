Piilani
=======
Pee ‧ ee ‧ lawn ‧ ee - Hawaiian; to go up to the heavens/sky.

A framework for building cloud-based Node.js (TypeScript/JavaScript)
back-end Web services.

Prerequisites
-------------
The following software is required:

* app-root-path
* Nodejs
* NPM
* reflect-metadata
* tsyringe
* winston
* winston-logger

Getting Started
---------------

### Installation

To initialize your project directory run the following Piilani command:
{{/path/to/binary}} init

This will create a `config` directory and config files for each supported
environment.

### Environment
There are 3 runtime environments and the `PIILANI_ENV` environment variable to
specify which one the app is currently running in:

```
+-------------------+---------------+
| Environment       | PIILANI_ENV   |
+-------------------+---------------+
| development       | dev           |
+-------------------+---------------+
| non-production    | non-prod      |
+-------------------+---------------+
| production        | prod          |
+-------------------+---------------+
```


### Configuration
After initializing the project (see **Installation**), you'll have 4
configuration files in your `config` directory. The `config.json` file is the
default. The `dev.config.json`, `non-prod.config.json`, and `prod.config.json`
files are for overriding the default configuration in the respective runttime
environments (see **Environment**).


#### Database
The app can be configured to use one or many databases. Currently, only
PostgreSQL is officially supported. You can still use other databases, but
certain convenience functions (like the `getConnectionString` method of the
`Config` class).


### Rest Controllers
The base of a RESTful Web service is the RestController. The Controller
is a class that extends the RestController base class.

```TypeScript
class ListController extends RestController {
    // Class definition here...
}
```

### Handling HTTP Requests

### Handling Path Parameters

### Handling Query Parameters

### Handling Request Body
