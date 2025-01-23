import type { VitePWAOptions } from 'vite-plugin-pwa';
const iconPath = '/img/favicons/';
const iconAssets = ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'];
const assets = iconAssets.map((icon) => `${iconPath}${icon}`);

const iconSizes = [192, 256, 384, 512];
const iconFiles = iconSizes.map((size) => ({
  src: `${iconPath}icon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
  type: 'image/png',
}));

const pwaoptions: Partial<VitePWAOptions> = {
  includeAssets: [...assets],
  devOptions: { enabled: true },
  manifest: {
    name: 'SolidJS',
    short_name: 'SolidJS',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    theme_color: '#2c4f7c',
    icons: [...iconFiles],
    screenshots: [
      {
        src: 'img/screenshots/sc-narrow.jpg',
        sizes: '720x1280',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Mobile Screenshot',
      },
      {
        src: 'img/screenshots/sc-wide.jpg',
        sizes: '1920x1261',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Desktop Screenshot',
      },
    ],
  },
};
export default pwaoptions;
