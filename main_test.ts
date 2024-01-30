import { assertEquals } from "./deps.ts";

Deno.test(function addTest() {
  assertEquals((2 + 3), 5);
});
