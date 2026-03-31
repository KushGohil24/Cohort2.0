import express from "express";
import { 
  createItem, 
  getItems, 
  getItemById, 
  updateItem, 
  deleteItem, 
  searchItems, 
  filterItems,
  getGraphData,
  getRelatedItems
} from "../controllers/item.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all item routes
router.use(protectRoute);

router.get("/search", searchItems);
router.get("/graph", getGraphData);
router.get("/filter", filterItems);

router.route("/")
  .get(getItems)
  .post(createItem);

router.route("/:id")
  .get(getItemById)
  .patch(updateItem)
  .delete(deleteItem);

router.get("/:id/related", getRelatedItems);

export default router;
