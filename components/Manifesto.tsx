import { Container, Stack, Text, Title } from "@mantine/core";

export function Manifesto() {
  return (
    <section className="section-rule" id="manifesto">
      <Container py={{ base: 64, sm: 88 }} size="sm">
        <Stack gap="md">
          <Title order={2} tt="uppercase">
            The manifesto
          </Title>
          <Text size="lg">
            No race license. No power meter. No apology.
          </Text>
          <Text c="gray.3">
            Fatkid Racing is not your average grape smuggler. We do not chase KOMs. We chase the afterparty.
            If that bothers you, draft someone else.
          </Text>
        </Stack>
      </Container>
    </section>
  );
}
