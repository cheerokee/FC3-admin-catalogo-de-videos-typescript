import { Sequelize } from "sequelize";
import { migrator } from "#seedwork/infra";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: true,
});

migrator(sequelize).runAsCLI();
