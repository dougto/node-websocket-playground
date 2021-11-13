import { knexInstance } from './knex';

require('dotenv').config();

async function runMigration() {
  await knexInstance.schema.createTable('games', (table) => {
    table.increments('id');
    table.string('moves');
    table.string('playerWhite');
    table.string('playerBlack');
    table.string('lastMove');
  });
}

runMigration();
