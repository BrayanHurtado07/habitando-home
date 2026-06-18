/** Config de Tailwind para compilar el CSS de producción (reemplaza el CDN).
 *  Recompilar tras cambiar clases:  npm run css   (ver package.json) */
module.exports = {
  content: ['./index.html', './telas.html'],
  theme: {
    extend: {
      colors: {
        cream:  '#F7F4EF',
        sand:   '#E9E1D4',
        ink:    '#1C1A17',
        clay:   '#C0643E',
        forest: '#2E3B33',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
