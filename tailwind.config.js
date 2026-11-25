/** Run `npm run build:css` after adding or changing Tailwind classes in any page. */
module.exports = {
  content: ['./*.html', './blog/**/*.html', './compare/**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'sans-serif'] }
    }
  }
};
