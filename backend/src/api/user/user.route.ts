import {Router} from 'express';
import {check} from "express-validator";
import UserController from './user.controller';
import {User} from "@monorepo-boilerplate/api-models";
import {route} from "@monorepo-boilerplate/api-validators";
import {exists, unique} from "@monorepo-boilerplate/mongo-validators";

const user: Router = Router();
const controller = new UserController();

/**
 * @swagger
 *
 * /users:
 *   get:
 *     summary: Get list of all users in the system
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: array of users
 */
user.get('/', route(controller.findAll));

/**
 * @swagger
 * path:
 *  /users:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
user.post('/',
  [
    check('name', 'Field required').exists(),
    check('lastName', 'Field required').exists(),
    check('email', 'Please include a valid email').isEmail(),
    check('email').custom(unique.bind(this, 'email', User)),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
  ],
  route(controller.create)
);

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    get:
 *      summary: Get a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "200":
 *          description: An users object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
user.get('/:id',
  [
    check('id').isMongoId(),
    check('id').custom(exists.bind(this, '_id', User))
  ],
  route(controller.findOne));

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    put:
 *      summary: Updates a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
user.put('/:id',
  [
    check('id').isMongoId(),
    check('id').custom(exists.bind(this, '_id', User)),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
  ],
  route(controller.update));

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    delete:
 *      summary: Deletes a user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "204":
 *          description: An empty value
 */
user.delete('/:id',
  [
    check('id').isMongoId(),
    check('id').custom(exists.bind(this, '_id', User))
  ],
  route(controller.remove));
export default user;
