// backend >>> node scripts/updateAllInventoryIds.js

const mongoose = require('mongoose');
const Inventory = require('../models/Inventory'); // adjust path if needed

async function updateIds() {
  try {
    await mongoose.connect('mongodb+srv://ifyouseekayyy:58593012345678999@jackswrscluster.97fckgq.mongodb.net/test?retryWrites=true&w=majority&appName=JacksWRSCluster');
    console.log("Connected to MongoDB");

    const inventories = await Inventory.find();

    for (let i = 0; i < inventories.length; i++) {
      inventories[i].id = i + 1; // simple sequential id starting from 1
      await inventories[i].save();
      console.log(`Updated inventory ${inventories[i]._id} with id ${i + 1}`);
    }

    console.log('All inventory IDs updated!');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

updateIds();
