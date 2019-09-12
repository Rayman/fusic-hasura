import { configure } from '@storybook/react';

// import before app styles
import 'bootstrap/dist/css/bootstrap.css';
import '../src/index.css';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
