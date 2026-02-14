import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],

  theme: {
    extend: {
      colors: {
        // Atom One Dark — backgrounds
        'primary-bg': '#282c34',
        'secondary-bg': '#2c313a',
        'surface': '#21252b',

        // Atom One Dark — text
        'primary-text': '#abb2bf',
        'dimmed-text': '#5c6370',

        // Atom One Dark — accents
        'primary-accent': '#61afef',
        'secondary-accent': '#98c379',
        'accent-red': '#e06c75',
        'accent-purple': '#c678dd',
        'accent-yellow': '#e5c07b',
        'accent-orange': '#d19a66',
      },
    }
  },

  plugins: [typography, forms, containerQueries]
} satisfies Config;
