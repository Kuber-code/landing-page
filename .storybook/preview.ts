import type { Preview } from '@storybook/html';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'stone',
      values: [
        { name: 'stone', value: '#F5F4F0' },
        { name: 'dark', value: '#131313' },
      ],
    },
  },
  decorators: [
    (story, ctx) => {
      const html = document.documentElement;
      html.dataset.theme = (ctx.globals.theme as string) ?? 'stone';
      html.dataset.accent = 'sand';
      html.dataset.density = 'medium';
      html.dataset.images = 'placeholder';
      return story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Palette',
      defaultValue: 'stone',
      toolbar: {
        items: ['stone', 'cool', 'cream', 'sage'],
        showName: true,
      },
    },
  },
};

export default preview;
