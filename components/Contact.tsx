"use client";

import { Button, Container, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useState } from "react";

import type { FormEvent } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

type ContactResponse = {
  readonly error?: string;
  readonly ok?: boolean;
};

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

    const response = await fetch("/api/contact", {
      body: JSON.stringify({ botcheck, email, message, name }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = (await response.json()) as ContactResponse;

    if (!response.ok || data.ok !== true) {
      setStatus("error");
      setError(data.error ?? "Something exploded. Try again.");
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
            401. It lands in yo@fatkidracing.party. Be brief. Be rude. Be both.
          </Text>
          <form onSubmit={(event) => void onSubmit(event)}>
            <Stack gap="sm">
              <TextInput
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
