import express from "express";

import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
* @swagger
* components:
*   schemas:
*     Posts:
*       type: object
*       properties:
*         title:
*           type: string
*           description: The memories title
*         message:
*           type: string
*           description: The memories message
*         name:
*           type: string
*           description: The user name
*         creator:
*           type: string
*           description: The memories creator
*         tags:
*           type: array
*           description: The memories tags
*         selectedFile:
*           type: string
*           description: The memories image
*         likes:
*           type: array
*           description: The memories likes
*         createdAt:
*           type: date
*           description: The memories likes
*/

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
* @swagger
* /posts:
*   get:
*     summary: Returns the list of post memories
*     tags: [Posts]
*     responses:
*       200:
*         description: The list of post memories
*       404:
*         description: Something went wrong
*/

router.get('/', getPosts);

/**
* @swagger
* /posts:
*   post:
*     summary: Create a new post memorie
*     tags: [Posts]
*     requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/definitions/postCreateDef'
*     responses:
*       200:
*         description: The created post memorie
*       409:
*         description: Something went wrong
* definitions:
*   postCreateDef:           
*     type: object
*     properties:
*       title:
*         type: string
*       message:
*         type: string
*       tags:
*         type: array
*         items:
*          type: string
*       selectedFile:
*         type: string
*       name:
*         type: string
*/

router.post('/', auth, createPost);


router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;