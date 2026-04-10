import { fal } from "@fal-ai/client";
import { writeFile } from "fs/promises";
import path from "path";

const articles = [
  {
    slug: "spiritual-awakening-or-going-crazy",
    prompt: "A solitary figure standing at a crossroads in a dark misty forest at twilight, one path glowing with warm golden light and the other fading into shadow, dramatic chiaroscuro lighting, fine art photography style, dark moody tones, no text, cinematic composition",
  },
  {
    slug: "what-happens-spiritual-consultation",
    prompt: "Two weathered wooden chairs facing each other across a small table with a single lit candle between them, warm amber glow in a dark intimate room, aged wood textures, smoke wisps from the candle, fine art still life photography, moody and inviting, no text",
  },
  {
    slug: "signs-spiritual-abilities-opening",
    prompt: "A pair of hands cupped together releasing a swarm of golden fireflies into a dark forest clearing at dusk, the fireflies forming a spiral pattern upward, dramatic backlighting, warm gold and deep forest green, no text, fine art photography",
  },
  {
    slug: "who-to-talk-to-spiritual-awakening",
    prompt: "A long dark corridor with multiple doors on each side, each door slightly ajar letting through different colored warm light, one door at the end wide open flooding golden light, atmospheric perspective, moody architectural photography, no text",
  },
  {
    slug: "spiritual-consultation-vs-therapy-vs-life-coaching",
    prompt: "Three distinctly different ancient doorways side by side carved into a massive dark stone wall, each with different architectural styles, warm golden light spilling from behind each one, dramatic evening sky, archaeological photography style, no text",
  },
  {
    slug: "understanding-ancestral-trauma-healing",
    prompt: "An ancient gnarled oak tree with massive exposed roots spreading across dark earth, the roots intertwining and glowing faintly with warm amber light from within, dramatic low-angle photography, misty twilight atmosphere, deep earth tones and gold, no text",
  },
  {
    slug: "what-is-energy-healing",
    prompt: "Two hands hovering over a still pool of dark water, the water surface between the hands rippling with concentric golden rings of light emanating outward, dramatic side lighting, dark background, warmth and power, fine art photography, no text",
  },
  {
    slug: "dark-night-of-the-soul",
    prompt: "A dark cavern interior with a distant opening revealing warm golden sunrise light, stalactites casting dramatic shadows, the path through the cave leading toward the light, geological photography with dramatic natural lighting, deep blacks and warm amber, no text",
  },
  {
    slug: "how-long-does-spiritual-awakening-last",
    prompt: "A winding mountain trail disappearing into misty peaks at golden hour, each successive mountain layer progressively lighter from dark foreground to luminous horizon, dramatic depth and atmosphere, landscape photography, warm gold and slate tones, no text",
  },
];

async function generateImage(prompt, outputPath) {
  console.log(`Generating: ${path.basename(outputPath)}...`);
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt,
        image_size: "landscape_16_9",
        num_images: 1,
        safety_tolerance: "5",
      },
    });

    const imageUrl = result.data.images[0].url;
    const response = await fetch(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(outputPath, buffer);
    console.log(`  ✓ Saved: ${path.basename(outputPath)} (${(buffer.length / 1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`  ✗ Failed: ${path.basename(outputPath)} — ${err.message}`);
  }
}

async function main() {
  const outDir = path.resolve("public/images/blog");

  for (const article of articles) {
    await generateImage(
      article.prompt,
      path.join(outDir, `${article.slug}.jpg`)
    );
  }

  console.log("\nDone! 9 images generated.");
}

main().catch(console.error);
