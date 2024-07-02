import { commonPrefix } from ".";

test("commonPrefix of ['abcabcd'] equal [10]", () => {
  expect(commonPrefix(["abcabcd"])).toEqual([10]);
});

test("commonPrefix of ['ababaa'] equal [11]", () => {
  expect(commonPrefix(["ababaa"])).toEqual([11]);
});

test("commonPrefix of ['aa'] equal [3]", () => {
  expect(commonPrefix(["aa"])).toEqual([3]);
});
