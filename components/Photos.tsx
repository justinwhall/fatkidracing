import {
  Badge,
  Button,
  Card,
  CardSection,
  Container,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { PHOTOS } from "@/data/photos";
import { formatPriceCents } from "@/lib/commerce";

export function Photos() {
  return (
    <section className="section-rule" id="photos">
      <Container py={{ base: 64, sm: 88 }} size="lg">
        <Stack gap="xl">
          <Stack gap="xs" maw={680} mx="auto" ta="center">
            <Title order={2} tt="uppercase">
              Proof we went outside
            </Title>
            <Text c="gray.3">
              Crested Butte on paper, metal, or a suspiciously clean digital
              file. The watermark stays here. Your print does not.
            </Text>
          </Stack>

          <div className="photo-gallery">
            {PHOTOS.map((photo) => (
              <Card className="photo-card" key={photo.id}>
                <CardSection>
                  <Image
                    alt={photo.title}
                    className="photo-preview"
                    loading="lazy"
                    src={photo.imageSrc}
                  />
                </CardSection>
                <Stack gap="sm" mt="lg">
                  <Badge color="sunset" variant="light">
                    Crested Butte, CO
                  </Badge>
                  <Title order={3}>{photo.title}</Title>
                  <Text c="gray.3">{photo.blurb}</Text>
                  <Text fw={700}>
                    Prints from {formatPriceCents(photo.fromPriceCents)} · Digital{" "}
                    {formatPriceCents(photo.digitalPriceCents)}
                  </Text>
                  <Button
                    component="a"
                    href={`/?print=${encodeURIComponent(photo.id)}#contact`}
                    tt="uppercase"
                  >
                    Inquire about this one
                  </Button>
                </Stack>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}
