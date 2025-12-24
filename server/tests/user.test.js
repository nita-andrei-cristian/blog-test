import { doesUserExist } from "../services/user.service.js";

test("Nita exists", () => {
  expect(doesUserExist("Nita")).toBe(true);
});
