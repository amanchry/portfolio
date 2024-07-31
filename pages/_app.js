import '../styles/global.css';
import '../styles/style.css';
import '../styles/navbar.css';
import '../styles/templete.css';
import '../styles/skin.css';
import '../styles/plugins/slick/slick.min.css';
import '../styles/plugins/slick/slick-theme.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '@fontsource-variable/raleway';

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </>
  ) 
}

export default MyApp
