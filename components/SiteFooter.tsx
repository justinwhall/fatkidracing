import { Container, Stack, Text } from "@mantine/core";

export function SiteFooter() {
  return (
    <footer className="section-rule">
      <Container py="xl" size="sm">
        <Stack gap={6} ta="center">
          <Text fw={700} tt="uppercase">
            fatkidracing.party
          </Text>
          <Text c="dimmed" size="sm">
            Based in Crested Butte, Colorado. Ride stupid. Tip your mechanic.
            Not USA Cycling. Not your coach. Not sorry.
          </Text>
        </Stack>
      </Container>
    </footer>
  );
}
