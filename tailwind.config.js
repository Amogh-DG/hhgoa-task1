/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#00180d',
        'surface': '#00180d',
        'surface-dim': '#00180d',
        'surface-bright': '#14412e',
        'surface-container-lowest': '#001209',
        'surface-container-low': '#002113',
        'surface-container': '#002517',
        'surface-container-high': '#00311f',
        'surface-container-highest': '#0e3c29',
        'surface-variant': '#0e3c29',
        'on-surface': '#bdedd2',
        'on-surface-variant': '#c9c8ab',
        'inverse-surface': '#bdedd2',
        'inverse-on-surface': '#083825',

        'primary': '#ffffff',
        'primary-container': '#e3ec00',
        'primary-fixed': '#e3ec00',
        'primary-fixed-dim': '#c7cf00',
        'on-primary': '#303300',
        'on-primary-container': '#646900',
        'inverse-primary': '#5e6300',

        'secondary': '#ffabf3',
        'secondary-container': '#fe00fe',
        'on-secondary': '#5b005b',
        'on-secondary-container': '#500050',
        'secondary-fixed': '#ffd7f5',
        'secondary-fixed-dim': '#ffabf3',

        'tertiary': '#ffffff',
        'tertiary-container': '#7df4ff',
        'on-tertiary': '#00363a',
        'on-tertiary-container': '#006f77',
        'tertiary-fixed': '#7df4ff',
        'tertiary-fixed-dim': '#00dbe9',

        'outline': '#929277',
        'outline-variant': '#474832',
        'surface-tint': '#c7cf00',

        'error': '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
      },
      spacing: {
        'unit': '8px',
        'margin-desktop': '64px',
        'margin-mobile': '20px',
        'container-max': '1280px',
        'gutter': '24px'
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'headline': ['Montserrat', 'sans-serif'],
        'body': ['"JetBrains Mono"', 'monospace'],
        'label': ['"JetBrains Mono"', 'monospace'],
        'sans': ['Montserrat', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
