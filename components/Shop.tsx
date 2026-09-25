import { Badge, Button, Card, SimpleGrid, Stack, Text, Title } from "@mantine/core";

import { formatPriceCents, shopCtaLabel } from "@/lib/commerce";

import type { Product } from "@/lib/commerce";

type ShopProps = {
  readonly products: readonly Product[];
};

export function Shop({ products }: ShopProps) {
  return (
    <section className="section-rule" id="shop">
      <Stack gap="xl" px={{ base: "md", sm: "xl" }} py={{ base: 64, sm: 88 }}>
        <Stack gap="xs" maw={640} mx="auto" ta="center">
          <Title order={2} tt="uppercase">
            Merch that judges you
          </Title>
          <Text c="gray.3">
            Stickers and tees incoming. Checkout is still in the pits. Leave
            your money in your pocket and your opinions on the group ride.
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }} maw={920} mx="auto" spacing="lg">
          {products.map((product) => (
            <Card key={product.id}>
              <Stack gap="sm">
                <Badge color={product.kind === "tee" ? "voltage" : "sunset"} variant="light">
                  {product.kind === "tee" ? "TEE" : "STICKER"}
                </Badge>
                <Title order={3}>{product.name}</Title>
                <Text c="gray.3">{product.blurb}</Text>
                <Text fw={700}>{formatPriceCents(product.priceCents)}</Text>
                <Button disabled fullWidth tt="uppercase">
                  {shopCtaLabel(product.status)}
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </section>
  );
}
