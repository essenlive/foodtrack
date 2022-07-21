import '@styles/globals.css'
import '@styles/theme.css'



const nav = {
  menuActive: true,
  articleActive: false
};
const selection = null;
const articles = null;
const filters = {
  typologies : null,
  phase : null,
  aliment : null
};


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
