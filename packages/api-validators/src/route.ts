import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {INTERNAL_SERVER_ERROR} from "http-status";
import {ServiceResponseBuilder} from "@monorepo-boilerplate/api-response";
import {ValidationErrors} from "@monorepo-boilerplate/mongo-validators";

const CUSTOM_STATUS_CODES_MAPPING = {
  [ValidationErrors.VALUE_DOES_NOT_EXIST]: 404
};

export const route = (func) => {
  return (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);

    /* validate custom status codes errors */
    for (const errorKey of Object.keys(CUSTOM_STATUS_CODES_MAPPING)) {
      const validationErrors = errors.array().filter(x => x.msg === errorKey);
      if (validationErrors.length > 0) {
        return res.status(CUSTOM_STATUS_CODES_MAPPING[errorKey]).send(new ServiceResponseBuilder().err('Validation failed', validationErrors));
      }
    }

    /* validate all generic errors */
    if (!errors.isEmpty()) {
      return res.status(422).send(new ServiceResponseBuilder().err('Validation failed', errors.array()));
    }

    /* process function and catch internal server errors */
    func(req, res, next).catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send(new ServiceResponseBuilder().err(err.toString()));
    });
  };
};
