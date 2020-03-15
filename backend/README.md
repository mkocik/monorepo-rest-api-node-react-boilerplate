# REST API

This is a lightning-fast API for handling requests from the front-end app. It is based on Node.js and TypeScript, and it's integrated with  [MongoDB](https://docs.mongodb.com/manual/administration/install-community/).
It uses morgan as a logging middleware and helmet as a basic security guard.

The config is handled by the `monorepo-boilerplate/config` package. If you need to change it, do it right there. But in case of a need to customize the config per API instance, there is `env.example` file, that you can rename to `.env` and use to override the config.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [OpenApi](#openapi)
- [Available routes in a template](#available-routes-in-a-template)

## Prerequisites
To be able tu run the project, you need to have MongoDB installed. You can download it [directly](https://docs.mongodb.com/manual/administration/install-community/), or you can use [docker](https://www.docker.com/products/docker-desktop)

If you decide to use `docker`,  here are some helpful commands to set the mongo up and running:

Download a proper docker image.
```bash
docker pull mongo
```

Run mongo image
```bash
docker run -p 27017:27017 mongo --port 27017
```

### Usage
- `build` - Transpile TypeScript to ES6
- `lint` - Lint your TS code
- `dev` - To run the app without transpile to ES6, with nodemon watch
- `debug` - To run the app in debug mode
- `start` - Run the transpiled app
- `prod` - Build & run the transpiled app
- `test` - Run API tests

### OpenApi

To enter OpenApi documentation, use [http://localhost:3000/v1/docs](http://localhost:3000/v1/docs)

All the routes should be documented as in `src/api/user/user.route.ts` example.

All DB models should be documented as well in a `@monorepo-boilerplate/db` package

### Available routes in a template
| Method   | Resource        | Description  |
| :------- | :-------------- | :----------- |
| `POST`   | `/v1/users`        | Create a new user in the DB. You need to specify in the body the following attributes: name, lastname, email & password.                    |
| `GET`    | `/v1/users`        | Returns the collection of users present in the DB.                                                                                          |
| `GET`    | `/v1/users/:id`    | It returns the user by id. |
| `PUT`    | `/v1/users/:id`    | Updates an already created user in the DB  |
| `DELETE` | `/v1/users/:id`    | Deletes a user from the DB |
