import { GetPostsByTag } from "../services/posts.service";

test("Getting posts by tag: food", () => {
  const result = GetPostsByTag("food");

  expect(result.length).toBeGreaterThan(0);
});
