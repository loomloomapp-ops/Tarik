// Language-neutral media references. Image URLs use picsum placeholders with
// stable seeds so layout/cropping is locked in; swap the `src` values for real
// project photography (alt text lives in the translation files).
export const heroImage = {
  src: "https://picsum.photos/seed/tarik-hero-switchboard/1920/1280",
};

export const whyChooseImage = {
  src: "/images/why-choose.jpg", // electrician in safety gear working on a control panel
};

export type ProjectMedia = { src: string };

// Order matches projects[].* in the messages files (cs.json / uk.json).
// On-brief premium-industrial photography (Pexels, free for commercial use).
export const projectMedia: ProjectMedia[] = [
  { src: "/images/projects/residential.jpg" }, // electrician on a circuit-breaker panel
  { src: "/images/projects/commercial.jpg" }, // blue-lit data-center / server racks
  { src: "/images/projects/industrial.jpg" }, // industrial hall, steel beams + lighting
  { src: "/images/projects/warehouse.jpg" }, // large warehouse, high ceilings + lighting
];
