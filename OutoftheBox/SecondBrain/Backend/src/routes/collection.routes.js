import express from "express";
import { 
  createCollection, 
  getCollections, 
  updateCollection, 
  deleteCollection, 
  addItemToCollection 
} from "../controllers/collection.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.route("/")
  .get(getCollections)
  .post(createCollection);

router.route("/:id")
  .patch(updateCollection)
  .delete(deleteCollection);

router.post("/:id/items", addItemToCollection);

export default router;
