import Header from './Layout/Header'
import Footer from './Layout/Footer'
import BodyPages from './Layout/BodyPages'
//style
import './Style/shop_style.css'
import { Route } from 'react-router'

function App() {
  return (
    <>
      <Header />
        <BodyPages />
        {/* <Route path='/' exact component={Home}/>
            <Route path='/Products' exact component={Products}/>
            <Route path='/Product/:id' exact component={ProductDetails}/> */}
      <Footer />
    </>
  );
}

export default App;
