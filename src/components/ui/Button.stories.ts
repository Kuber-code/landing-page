import type { Meta, StoryObj } from '@storybook/html';

interface ButtonArgs {
  label: string;
  variant: 'primary' | 'ghost' | 'invert';
}

const render = ({ label, variant }: ButtonArgs) => {
  const cls = ['btn', variant !== 'primary' && `btn--${variant}`].filter(Boolean).join(' ');
  return `<button class="${cls}">${label}</button>`;
};

const meta: Meta<ButtonArgs> = {
  title: 'UI/Button',
  render,
  args: { label: 'Book a Call', variant: 'primary' },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'ghost', 'invert'] },
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Invert: Story = {
  args: { variant: 'invert' },
  decorators: [
    (story) => `<div style="background:#1A1A1A;padding:24px;">${story()}</div>`,
  ],
};
