import express from "express";

import { signin, signup } from "../controllers/users.js";

const router = express.Router();

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*         - password
*       properties:
*         id:
*           type: string
*           description: The auto-generated id of the user
*         name:
*           type: string
*           description: The user name
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*       example:
*         id: User ID
*         name: Likith Kumar D K
*         email: devtest@mailinator.com
*         password: User Password
*/

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
* @swagger
* /users/signin:
*   post:
*     summary: Login
*     tags: [Users]
*     requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/definitions/userSignInDef'
*     responses:
*       200:
*         description: The user informations
*       500:
*         description: Something went wrong
* definitions:
*   userSignInDef:           
*     type: object
*     required:
*        - email
*        - password
*     properties:
*       email:
*         type: string
*       password:
*         type: string
*/

router.post('/signin', signin);

// router.post("/signin", (req, res) => {
//     console.log(req.params);
//     console.log(req.body);
// 	res.send(200);
// });

/**
* @swagger
* /users/signup:
*   post:
*     summary: Register
*     tags: [Users]
*     requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/definitions/userSignUpDef'
*     responses:
*       201:
*         description: The user informations
*       500:
*         description: Something went wrong
* definitions:
*   userSignUpDef:           
*     type: object
*     required:
*        - firstName:
*        - lastName
*        - email
*        - password
*     properties:
*       firstName:
*         type: string
*       lastName:
*         type: string
*       email:
*         type: string
*       password:
*         type: string
*/

router.post('/signup', signup);

export default router;