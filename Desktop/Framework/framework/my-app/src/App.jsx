import React, { Children, Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import About from './Component/About/About';
import Portfolio from './Component/Portfolio/Portfolio';
import Contact from './Component/Contact/Contact';
import NotFound from './Component/NotFound/NotFound';




let myRouter = createBrowserRouter([
  { path: '/',element: <Layout />,
    children: [
      { index: 'true', element: <Home /> },
      { path: 'simpleProduct', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element:<NotFound/> },
    ]},
]);

class App extends Component {
  render() {
    return (
      <div>
       
        <RouterProvider router={myRouter}/>

      </div>
    );
  }
}

export default App;