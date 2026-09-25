import { Anchor, Container, Group } from "@mantine/core";

export function SiteHeader() {
  return (
    <header
      style={{
        background: "rgb(7 1 12 / 0.78)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgb(255 45 155 / 0.25)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Container py="sm" size="lg">
        <Group justify="space-between" wrap="wrap">
          <Anchor c="white" fw={700} href="#top" tt="uppercase" underline="never">
            Fatkid Racing
          </Anchor>
          <Group gap="lg">
            <Anchor c="gray.3" href="#manifesto" tt="uppercase" underline="hover">
              Manifesto
            </Anchor>
            <Anchor c="gray.3" href="#shop" tt="uppercase" underline="hover">
              Shop
            </Anchor>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
