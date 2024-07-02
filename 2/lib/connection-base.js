const { PrismaClient } = require("@prisma/client");
const { enhance } = require("@zenstackhq/runtime");

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

class ConnectionBase {
  prisma = null;
  async getConnection() {
    if (this.prisma) return this.prisma;
    this.prisma = enhance(new PrismaClient());
    await this.prisma.$connect();
    return this.prisma;
  }

  async clearDatabase() {
    await this.prisma.Trade.deleteMany();
  }

  async closeConnection() {
    if (this.prisma) await this.prisma.$disconnect();
    this.prisma = null;
  }
}

module.exports = ConnectionBase;
