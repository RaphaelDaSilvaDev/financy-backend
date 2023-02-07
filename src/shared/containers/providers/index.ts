import { container, delay } from "tsyringe";
import { LocalStorageProvider } from "./StorageProvider/Implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/Implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  delay(() => diskStorage[process.env.disk])
);
