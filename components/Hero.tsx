import { Button, Container, Image, Stack, Text, Title } from "@mantine/core";

export function Hero() {
  return (
    <section className="hero-stage" id="top">
      <Container className="hero-content" py={{ base: 64, sm: 96 }} size="md">
        <Stack align="center" gap="lg" ta="center">
          <Image
            alt="Fatkid Racing sunset rider logo"
            className="logo-glow"
            maw={320}
            src="/logo.png"
            w="70%"
            bdrs='100%'
          />
          <Title className="headline-chrome" fw={400} lh={1.15} order={1} size="clamp(1.7rem, 6vw, 3.4rem)">
            Too big to aero. Too fat to fail.
          </Title>
          <Text c="gray.3" maw={520} size="lg">
            The only interval we hit is happy hour. Party laps. Zero lycra church.
          </Text>
          <Button component="a" href="#shop" size="md" tt="uppercase">
            Shop the crimes
          </Button>
        </Stack>
      </Container>
    </section>
  );
}
