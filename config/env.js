// config/env.js
import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string(),

    // Links DB
    LINK_DATABASE_HOST: z.string(),
    LINK_DATABASE_USER: z.string(),
    LINK_DATABASE_PASSWORD: z.string(),
    LINK_DATABASE_NAME: z.string(),

    // Users DB
    USER_DATABASE_HOST: z.string(),
    USER_DATABASE_USER: z.string(),
    USER_DATABASE_PASSWORD: z.string(),
    USER_DATABASE_NAME: z.string(),
  })
  .parse({
    PORT: 3009,
    JWT_SECRET: "089081",

    // Links DB
    LINK_DATABASE_HOST: "localhost",
    LINK_DATABASE_USER: "root",
    LINK_DATABASE_PASSWORD: "root",
    LINK_DATABASE_NAME: "shortners",

    // Users DB
    USER_DATABASE_HOST: "localhost",
    USER_DATABASE_USER: "root",
    USER_DATABASE_PASSWORD: "root",
    USER_DATABASE_NAME: "users",
  });
