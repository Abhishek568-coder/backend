const express = require("express");
const router = express.Router();

const controller = require("../controllers/inventoryController");
const validate = require("../middleware/validation");

router.post("/", validate, controller.addItem);
router.get("/", controller.getItems);
router.get("/:id", controller.getItemById);
router.put("/:id", validate, controller.updateItem);
router.delete("/:id", controller.deleteItem);

module.exports = router;