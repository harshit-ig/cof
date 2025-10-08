export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'test-red': '#ff0000',
        primary: {
          50:  '#f3fcfd',
          100: '#e0f7f9',
          200: '#bcefee',
          300: '#8fd9dd',
          400: '#60c0c9',
          500: '#429fae',
          600: '#347d8d',
          700: '#285f71',
          800: '#1f4b59',
          900: '#163742',
        },
        secondary: {
          50:  '#fafbf8',
          100: '#f3f5f0',
          200: '#e8e9e0',
          300: '#d9dcd0',
          400: '#bfc2af',
          500: '#9ca483',
          600: '#7e8469',
          700: '#66694f',
          800: '#4f4f3b',
          900: '#3d3c2d',
        },
        government: {
          50:  '#faf8f2',
          100: '#f3efd9',
          200: '#e7e2b4',
          300: '#d9c98b',
          400: '#bea560',
          500: '#9c8844',
          600: '#7c6f35',
          700: '#605728',
          800: '#483e1d',
          900: '#342c14',
        },
        navy: {
          50:  '#f4f7fa',
          100: '#e3edf4',
          200: '#c8d9e7',
          300: '#a5bfdd',
          400: '#7da5c8',
          500: '#5487ae',
          600: '#3e6e90',
          700: '#325772',
          800: '#264156',
          900: '#1c303f',
          950: '#162430',
        },
        accent: {
          50:  '#fff8f0',
          100: '#ffeed9',
          200: '#ffd9ad',
          300: '#ffbb7a',
          400: '#ff9d4d',
          500: '#ff8225',
          600: '#e66a12',
          700: '#c0550a',
          800: '#994308',
          900: '#733206',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
      },
      animationPlayState: {
        'paused': 'paused',
        'running': 'running',
      }
    },
  },
  plugins: [],
}




