import "reflect-metadata";

import { createConnection, getConnectionOptions } from "typeorm";

export default async (host = "financy-db") => {
  const defaultOptions = await getConnectionOptions();
  console.log("Database is Running!");
  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
