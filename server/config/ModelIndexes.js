const { buySellItems } = require("../models/BuySellItem");
const { lostFoundItems } = require("../models/LostFoundItem");

async function CreateIndexes() {
  buySellItems.collection.createIndex({
    name: "text",
    description: "text",
  });

  lostFoundItems.collection.createIndex({
    name: "text",
    description: "text",
    brand: "text",
    category: "text",
    color: "text",
  });
}

exports.CreateIndexes = CreateIndexes;
