import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Counter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
