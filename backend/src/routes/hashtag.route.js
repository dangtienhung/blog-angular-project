import express from 'express';
import { hashTag } from '../controllers/tag.controller.js';
const hashTagRouter = express.Router();
hashTagRouter.get('/:slug', hashTag);
export default hashTagRouter;
