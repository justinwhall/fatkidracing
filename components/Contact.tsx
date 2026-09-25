"use client";

import { Button, Container, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useState } from "react";

import { parseContactPayload } from "@/lib/contact/parse";

import type { FormEvent } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

type Web3FormsResponse = {
  readonly message?: string;
  readonly success?: boolean;
};

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "c0562a2f-7227-42a8-afa6-352e869fee3d";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const parsed = parseContactPayload({ botcheck, email, message, name });

    if (parsed.kind === "spam") {
      setStatus("success");
      return;
    }

    if (parsed.kind === "invalid") {
      setStatus("error");
      setError(parsed.error);
      return;
    }

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("email", parsed.fields.email);
    formData.append("message", parsed.fields.message);
    formData.append("name", parsed.fields.name);
    formData.append("subject", `Fatkid Racing / ${parsed.fields.name}`);

    const response = await fetch(WEB3FORMS_URL, {
      body: formData,
      method: "POST",
    });

    const data = (await response.json()) as Web3FormsResponse;

    if (!response.ok || data.success !== true) {
      setStatus("error");
      setError(data.message ?? "Web3Forms dropped the baton. Try again.");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="section-rule" id="contact">
      <Container py={{ base: 64, sm: 88 }} size="sm">
        <Stack gap="md">
          <Title order={2} tt="uppercase">
            Yell at us
          </Title>
          <Text c="gray.3">
            Merch questions, Crested Butte ride invites, complaints about the
            401. Be brief. Be rude. Be both.
          </Text>
          <form onSubmit={(event) => void onSubmit(event)}>
            <Stack gap="sm">
              <TextInput
                autoComplete="off"
                name="botcheck"
                onChange={(event) => {
                  setBotcheck(event.currentTarget.value);
                }}
                style={{ display: "none" }}
                tabIndex={-1}
                value={botcheck}
              />
              <TextInput
                label="Name"
                name="name"
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
                required
                value={name}
              />
              <TextInput
                label="Email"
                name="email"
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                }}
                required
                type="email"
                value={email}
              />
              <Textarea
                autosize
                label="Message"
                minRows={4}
                name="message"
                onChange={(event) => {
                  setMessage(event.currentTarget.value);
                }}
                required
                value={message}
              />
              <Button disabled={status === "sending"} type="submit" tt="uppercase">
                {status === "sending" ? "Sending…" : "Send it"}
              </Button>
              {status === "success" ? (
                <Text c="neon.4">Got it. If it was smart, we will ignore it.</Text>
              ) : null}
              {status === "error" ? <Text c="red.4">{error}</Text> : null}
            </Stack>
          </form>
        </Stack>
      </Container>
    </section>
  );
}
