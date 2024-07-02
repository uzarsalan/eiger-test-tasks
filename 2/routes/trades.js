const express = require("express");
const ConnectionBase = require("../lib/connection-base");
const { isPrismaClientKnownRequestError } = require("@zenstackhq/runtime");
const router = express.Router();

const db = new ConnectionBase();

router.get("/", async function (req, res, next) {
  try {
    const prisma = await db.getConnection();
    const data = await prisma.Trade.findMany({
      where: {
        ...req.query,
        user_id: req.query.user_id ? Number(req.query.user_id) : undefined,
      },
    });
    res.send(data);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const prisma = await db.getConnection();
    const data = await prisma.Trade.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!data) return res.status(404).send("ID not found");
    res.send(data);
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/", async function (req, res, next) {
  try {
    const prisma = await db.getConnection();
    const data = await prisma.Trade.create({
      data: { ...req.body, timestamp: BigInt(req.body.timestamp) },
    });
    res.status(201).send(data);
  } catch (error) {
    res
      .status(400)
      .send(isPrismaClientKnownRequestError(error) ? error.meta : undefined);
  }
});

router.all("*", async function (req, res, next) {
  res.status(405).send();
});

module.exports = router;
