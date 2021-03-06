import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Systembar from '../components/Systembar'
import { style, AppWrapper } from './styles'
import { AppContainer } from 'react-hot-loader'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'
import store from '../store'
import { Provider } from 'react-redux'

const GlobalStyle = createGlobalStyle`${style}`

const Application = Loadable({
  loader: () => import('../views/Application'),
  loading: Loading
})

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <AppWrapper>
          <GlobalStyle />
          <Systembar />
          <Router>
            <Switch>
              <Route path="/" component={Application} />
            </Switch>
          </Router>
        </AppWrapper>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render()

// react-hot-loader
declare const module: any
if (module.hot) {
  module.hot.accept()
}
