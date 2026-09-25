import { describe, expect, it } from "vitest";

import { parseContactPayload } from "./parse";

describe("parseContactPayload", () => {
  it("accepts a complete message", () => {
    expect(
      parseContactPayload({
        email: "yo@example.com",
        message: "Need stickers",
        name: "Justin",
      }),
    ).toEqual({
      fields: {
        email: "yo@example.com",
        message: "Need stickers",
        name: "Justin",
      },
      kind: "ok",
    });
  });

  it("rejects empty fields", () => {
    expect(parseContactPayload({ email: "", message: "hi", name: "J" })).toEqual({
      error: "Name, email, and message are required.",
      kind: "invalid",
    });
  });

  it("rejects a bad email", () => {
    expect(
      parseContactPayload({ email: "nope", message: "hi", name: "J" }),
    ).toEqual({
      error: "That email looks fake.",
      kind: "invalid",
    });
  });

  it("treats a filled honeypot as spam", () => {
    expect(
      parseContactPayload({
        botcheck: "I am a robot",
        email: "yo@example.com",
        message: "Need stickers",
        name: "Justin",
      }),
    ).toEqual({ kind: "spam" });
  });
});
