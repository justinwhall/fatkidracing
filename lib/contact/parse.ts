const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFields = {
  readonly name: string;
  readonly email: string;
  readonly message: string;
};

export type ParseContactResult =
  | { readonly kind: "ok"; readonly fields: ContactFields }
  | { readonly kind: "invalid"; readonly error: string }
  | { readonly kind: "spam" };

function readTrimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactPayload(body: unknown): ParseContactResult {
  if (body === null || typeof body !== "object") {
    return { error: "Send a name, email, and message.", kind: "invalid" };
  }

  const payload = body as Record<string, unknown>;
  const botcheck = readTrimmed(payload.botcheck);

  if (botcheck.length > 0) {
    return { kind: "spam" };
  }

  const name = readTrimmed(payload.name);
  const email = readTrimmed(payload.email);
  const message = readTrimmed(payload.message);

  if (name.length === 0 || email.length === 0 || message.length === 0) {
    return { error: "Name, email, and message are required.", kind: "invalid" };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "That email looks fake.", kind: "invalid" };
  }

  return { fields: { email, message, name }, kind: "ok" };
}
