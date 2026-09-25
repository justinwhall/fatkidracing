import { parseContactPayload } from "@/lib/contact/parse";

const CONTACT_TO = "yo@fatkidracing.party";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

type Web3FormsResponse = {
  readonly message?: string;
  readonly success?: boolean;
};

export async function POST(request: Request): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Send a name, email, and message.", ok: false },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body);

  if (parsed.kind === "spam") {
    return Response.json({ ok: true });
  }

  if (parsed.kind === "invalid") {
    return Response.json({ error: parsed.error, ok: false }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (accessKey === undefined || accessKey.length === 0) {
    return Response.json(
      { error: "Contact is off the air. Try again later.", ok: false },
      { status: 500 },
    );
  }

  const web3Response = await fetch(WEB3FORMS_URL, {
    body: JSON.stringify({
      access_key: accessKey,
      email: parsed.fields.email,
      message: parsed.fields.message,
      name: parsed.fields.name,
      subject: `Fatkid Racing / ${parsed.fields.name}`,
      to: CONTACT_TO,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const web3Body = (await web3Response.json()) as Web3FormsResponse;

  if (!web3Response.ok || web3Body.success !== true) {
    return Response.json(
      { error: "Web3Forms dropped the baton. Try again.", ok: false },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
