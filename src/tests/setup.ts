import app from "../app";
import { beforeAll, afterAll } from '@jest/globals';

let server: any;

beforeAll(() => {
  server = app.listen(0);
});

afterAll(() => {
  server.close();
});