import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/sequelize';
import { MigrationModule } from './database/migration/migration.module';
import { migrator } from "@fc/micro-videos/@seedwork/infra";

async function bootstrap() {
  // Standalone application
  const app = await NestFactory.createApplicationContext(MigrationModule, {
    logger: ['error'],
  });
  const sequelize = app.get(getConnectionToken());
  await migrator(sequelize).runAsCLI();
}
bootstrap();
