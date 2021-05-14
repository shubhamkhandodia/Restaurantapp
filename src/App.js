import React from 'react'
import MainComponent from './Components/MainComponent'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {Configurestore} from './redux/configureStore'



const store = Configurestore();


class App extends React.Component {

  render()
  {
      return (
        <Provider store = {store}>
            <BrowserRouter>
              <div>
                <MainComponent />
              </div>
            </BrowserRouter>
            </Provider>
        );
  }
}

export default App