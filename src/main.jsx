import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SingleUser from './components/cards/SingleUser.jsx'
import CreateUser from './components/cards/CreateUser.jsx'
import Team from './components/Team.jsx'
import SingleTeam from './components/cards/SingleTeam.jsx'
import CreateTeam from './components/cards/CreateTeam.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/single-user/:id",
    element:<SingleUser />
  },
  {
    path:"/create-single-user",
    element:<CreateUser />
  },
  {
    path:"/teams",
    element:<Team />
  },
  {
    path:"/single-team/:id",
    element:<SingleTeam />
  },
  {
    path:"/create-team",
    element:<CreateTeam />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
    
  </React.StrictMode>,
)
