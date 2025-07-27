const express = require("express");
const router = express.Router();
const Sales = require("../models/Sales");
const Customer = require("../models/Customer");

// ==========================================
// GET ALL SALES
// ==========================================
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find()
      .populate("customerId", "name phone address") // populate customer info
      .populate("containerIds", "id name status") // populate container info to show name (S001)
      .sort({ date: -1 }); // latest first

    res.json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ==========================================
// GET SALE BY ID
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id)
      .populate("customerId", "name phone address")
      .populate("containerIds", "id name status");

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    res.json(sale);
  } catch (err) {
    console.error("Error fetching sale by ID:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


// ==========================================
// GET SALES BY CONTAINER ID
// ==========================================
router.get("/byContainer/:containerId", async (req, res) => {
  try {
    const containerId = req.params.containerId;
    const sales = await Sales.find({ containerIds: containerId })
      .populate("customerId", "name phone address")
      .populate("containerIds", "id name status")
      .sort({ date: -1 }); // latest first

    res.json(sales);
  } catch (err) {
    console.error("Error fetching sales by containerId:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ==========================================
// CREATE NEW SALE
// ==========================================
router.post("/", async (req, res) => {
  try {
    let {
      date,
      customerId,
      customerName,
      type,
      item,
      quantity,
      pricePerUnit,
      totalAmount,
      paymentMethod,
      status,
      customerContainerQty,
      containerIds,
      remarks,
    } = req.body;

    // Auto calculate pricePerUnit if not provided
    if (!pricePerUnit && totalAmount && quantity) {
      pricePerUnit = totalAmount / quantity;
    }

    // If customerId is provided, fetch customer name for consistency
    if (customerId) {
      const customer = await Customer.findById(customerId);
      if (customer) {
        customerName = customer.name;
      }
    } else {
      customerId = null; // ensure it's null if no ID provided
    }

    const newSale = new Sales({
      date,
      customerId: customerId || null,
      customerName, // save the typed name
      type,
      item,
      quantity,
      pricePerUnit,
      totalAmount,
      paymentMethod,
      status,
      customerContainerQty,
      containerIds,
      remarks,
    });

    await newSale.save();
    const savedSale = await Sales.findById(newSale._id)
      .populate("customerId", "name phone address")
      .populate("containerIds", "id name status"); // return populated data immediately

    res.status(201).json(savedSale);
  } catch (err) {
    console.error("Error creating sale:", err);
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// UPDATE A SALE
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const updatedSale = await Sales.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("customerId", "name phone address")
      .populate("containerIds", "id name status"); // ensure updated populated data

    res.json(updatedSale);
  } catch (err) {
    console.error("Error updating sale:", err);
    res.status(400).json({ message: err.message });
  }
});

// ==========================================
// DELETE A SALE
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    await Sales.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted" });
  } catch (err) {
    console.error("Error deleting sale:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
