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
* case
* reflect-metadata
* tsyringe
* winston
* winston-logger

```
npm i app-root-path reflect-metadata tsyringe winston winston-logger
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6"
  },
}
```

```TypeScript
// index.ts
import 'reflect-metadata';
```

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

### Initialization
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

#### Dependency Injection
Dependency injection is handled by `tsyringe`. The recommended way of
working with the library is to create a `startup.ts` file at the root
of your project's source code.

In this file, we can include the required `reflect-metadata` package,
and manage the Dependency Injection container.

The `startup.ts` MUST be included before any 


**Example startup.ts**
```TypeScript
import 'reflect-metadata';
import { container } from 'tsyringe';

export const DependencyInjection = container;

container.register(/*token, value/class*/)
```

If your project grows very large, you can split the file and include
the child files in the parent `startup.ts`.

*TODO: This could be scripted. Options should exist for creating a
startup.ts in a new or existing project.*

#### Database
The app can be configured to use one or many databases. Currently, only
PostgreSQL is officially supported. You can still use other databases, but
certain convenience functions (like the `getConnectionString` method of the
`Config` class).


### Rest Controllers
The base of a RESTful Web service is the RestController.

```TypeScript
import { injectable } from 'piilani/context';
import { RestController } from 'piilani/controllers/http';

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
import { inject, injectable } from 'piilani/context';

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
import { HttpResponse, NoContent, Ok, ServerError } from 'piilani/controllers/http/response';
import { get } from 'piilani/decorators/restful';

@injectable()
class ListController extends RestController {
    // code omitted.

    @get()
    public async getAllLists(): Promise<HttpResponse<List[]>> {
      const res = await this.gateway.findAsync();
      if (res.data) {
        return Ok(res.data);
      }
      if (res.class === 2) {
        return NoContent();
      }

      return ServerError();
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
    public async getListIndex(): Promise<HttpResponse<ListIndex[]>> {
      const res = await this.gateway.findIndexAsync();

      if (res.data) {
        return Ok(res.data);
      }
      if (res.class === 2) {
        return NoContent();
      }

      return ServerError();
    }
}
```


### Handling Path Parameters

### Handling Query Parameters
```TypeScript
import { fromQuery, get } from 'piilani/decorators/restful';

@injectable()
export class ListsController extends RestController {
    // code omitted.

    @get()
    public async getListById(@fromQuery('id') id: string): Promise<HttpResponse<List>> {
      const res = await this.gateway.findAsync({ id })

      if (res.data) {
        return Ok(res.data[0]);
      }
      if (res.class === 2) {
        return NoContent();
      }

      return BadRequest();
    }
}
```

### Handling Request Body

```TypeScript
import { fromBody, get } from 'piilani/decorators/restful';

@injectable()
export class ListsController extends RestController {
    // code omitted.

    @post()
    public async addList(@fromBody()list: Partial<Omit<List, 'id'>>): Promise<HttpResponse> {
      const res = await this.gateway.insertAsync(new List(list));

      if (res.class === 1) {
        return Created();
      }
      if (res.class === 2) {
        return BadRequest();
      }

      return ServerError();
    }
}
```
