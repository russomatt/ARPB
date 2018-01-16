import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'
import ImageTest from './imageTests/imageTest.js'

require("./css/base.scss");


render((
  <App/>
), document.getElementById('app-container'));
