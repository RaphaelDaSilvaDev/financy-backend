import "reflect-metadata";

import { createConnection, getConnectionOptions } from "typeorm";

export default async () => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database: defaultOptions.database,
    })
  );
};
