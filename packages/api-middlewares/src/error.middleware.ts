import * as httpStatus from 'http-status';
import {ServiceResponseBuilder} from "@monorepo-boilerplate/api-response";

// handle not found errors
export const notFound = (req, res, next) => {
  res.sendStatus(httpStatus.NOT_FOUND);
  res.json(new ServiceResponseBuilder().err('Requested Resource Not Found'));
  res.end();
};

// handle internal server errors
export const internalServerError = (err, req, res, next) => {
  res.sendStatus(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json(new ServiceResponseBuilder().err(err.message).setMeta(err.extra));
  res.end();
};
