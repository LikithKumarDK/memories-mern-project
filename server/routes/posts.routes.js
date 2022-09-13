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
*     summary: Get All Posts
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
*     summary: Create a Post
*     tags: [Posts]
*     requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/definitions/postCreateDef'
*     security:
*      - bearerAuth: []
*     responses:
*       201:
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

/**
* @swagger
* /posts/{id}:
*   patch:
*     summary: Update a Post
*     tags: [Posts]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The post id
*     requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/definitions/postUpdateDef'
*     security:
*      - bearerAuth: []
*     responses:
*       200:
*         description: The update post memorie
*       404:
*         description: Something went wrong
* definitions:
*   postUpdateDef:           
*     type: object
*     properties:
*       title:
*         type: string
*       message:
*         type: string
*       creator:
*         type: string
*       selectedFile:
*         type: string
*       tags:
*         type: array
*         items:
*          type: string
*/

router.patch('/:id', auth, updatePost);

/**
* @swagger
* /posts/{id}:
*   delete:
*     summary: Delete a Post
*     tags: [Posts]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The post id
*     security:
*      - bearerAuth: []
*     responses:
*       200:
*         description: The delete post memorie
*       404:
*         description: Something went wrong
*/

router.delete('/:id', auth, deletePost);

/**
* @swagger
* /posts/{id}/likePost:
*   patch:
*     summary: Like a Post
*     tags: [Posts]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The post id
*     security:
*      - bearerAuth: []
*     responses:
*       200:
*         description: The Like post memorie
*       404:
*         description: Something went wrong
*/

router.patch('/:id/likePost', auth, likePost);

export default router;