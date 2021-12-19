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
