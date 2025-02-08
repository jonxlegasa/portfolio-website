import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        'primary-bg': '#26282B',
        'secondary-bg': '#353941',
        'primary-accent': '#5F85DB',
        'secondary-accent': '#90B8F8',
      },
    }
  },

  plugins: [typography, forms, containerQueries]
} satisfies Config;
