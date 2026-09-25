import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const INPUT_DIRECTORY = path.resolve("photos-raw");
const OUTPUT_DIRECTORY = path.resolve("public/photos");
const LONG_EDGE_PX = 1400;

function watermarkSvg(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="watermark" width="650" height="280" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
          <text
            x="20"
            y="105"
            fill="#ff2d9b"
            fill-opacity="0.22"
            font-family="Arial, Helvetica, sans-serif"
            font-size="32"
            font-weight="700"
            letter-spacing="5"
          >FATKID RACING</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark)" />
    </svg>
  `);
}

async function watermarkPhoto(filename) {
  const inputPath = path.join(INPUT_DIRECTORY, filename);
  const outputFilename = `${path.parse(filename).name}.jpg`;
  const outputPath = path.join(OUTPUT_DIRECTORY, outputFilename);

  const { data, info } = await sharp(inputPath)
    .rotate()
    .resize({
      fit: "inside",
      height: LONG_EDGE_PX,
      width: LONG_EDGE_PX,
      withoutEnlargement: true,
    })
    .jpeg({ mozjpeg: true, quality: 84 })
    .toBuffer({ resolveWithObject: true });

  await sharp(data)
    .composite([{ input: watermarkSvg(info.width, info.height) }])
    .jpeg({ mozjpeg: true, quality: 84 })
    .toFile(outputPath);

  console.log(`Watermarked ${filename} → public/photos/${outputFilename}`);
}

await mkdir(OUTPUT_DIRECTORY, { recursive: true });

const filenames = (await readdir(INPUT_DIRECTORY))
  .filter((filename) => /\.(jpe?g|png)$/iu.test(filename))
  .sort();

if (filenames.length === 0) {
  throw new Error("No photos found in photos-raw/");
}

await Promise.all(filenames.map((filename) => watermarkPhoto(filename)));
