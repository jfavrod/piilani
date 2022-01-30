Piilani
=======
Pee ‧ ee ‧ lawn ‧ ee - Hawaiian; to go up to the heavens/sky.

A framework for building cloud-based Node.js (TypeScript/JavaScript)
back-end Web services.

⚠️ UNDER DEVELOPMENT: NOT PRODUCTION READY ⚠️

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
Add Piilani to your project.

#### NPM
```
npm i piilani
```

#### Yarn
```
yarn add piilani
```

To initialize your project directory run the following Piilani command:

```
./node_modules/piilani/bin/cli init
```


This will install all required dependencies and create a `config`
directory with config files for each supported environment.

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
The base of a RESTful Web service is the RestController.

```TypeScript
import { RestController } from 'piilani/controllers/http';
import { injectable } from 'tsyringe';

@injectable()
class ListController extends RestController {
    // Class definition here...
}
```

This controller is now primed to handle incoming HTTP requests. Without
specifying a `basePath`, the controller will handle routes with paths
starting from the root `/`. Alternatively, the `basePath` can be set in
the constructor.

```TypeScript
@injectable()
class ListController extends RestController {
    private gateway: IListsGateway;

    public constructor(@inject('IListsGateway')gateway: IListsGateway) {
        super()
        this.gateway = gateway;
        this.basePath = '/lists';
    }
}
```

Now all route paths handled by this controller will begin with
`/lists`.


### Handling HTTP Requests
To handle HTTP requests, use the `get`, `post`, `put`, and `delete`
decorators.

The following method, annotated with the `@get()` decorator, will
handle get requests to the controller's base path (`/` by default, see
the **RestController** section for details on how to set base path).

```TypeScript
import { get } from 'piilani/decorators/restful';

@injectable()
class ListController extends RestController {
    // code omitted.

    @get()
    public async getAllLists(): Promise<List[]> {
        const res = await this.gateway.findAsync();
        return res.data;
    }
}
```

If you want the annotated methods to handle more specific routes, add
the path (relative to the RestController's basePath) to the decorator's
invocation.

```TypeScript
@injectable()
export class ListsController extends RestController {
    // code omitted.

    @get('/index')
    public async getListIndex(): Promise<ListIndex[]> {
        const res = await this.gateway.findIndexAsync();
        return res.data || [];
    }
}
```


### Handling Path Parameters

### Handling Query Parameters

### Handling Request Body

```TypeScript
import { fromBody, get } from 'piilani/decorators/restful';

@injectable()
export class ListsController extends RestController {
    // code omitted.

    @post()
    public async addList(@fromBody()list: List): Promise<boolean> {
      const res = await this.gateway.insertAsync(list);
      return (res?.class === 1);
    }
}
```
