import { Connection, createConnection } from "typeorm";
import { CustomerGroup } from "./entities/CustomerGroup";
import { Synonym } from "./entities/Synonym";
import { Word } from "./entities/Word";

let database: Connection;
export async function start(logging: boolean, path = "database.db") {
  database = await createConnection({
    type: "sqlite",
    database: path,
    entities: [Word, CustomerGroup, Synonym],
    synchronize: true,
    logging: logging,
  });
  return database;
}

export function get(){
  return database;
}
