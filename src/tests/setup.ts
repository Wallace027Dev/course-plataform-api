import app from "../app";
import { beforeAll, afterAll } from '@jest/globals';

let server: any;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});