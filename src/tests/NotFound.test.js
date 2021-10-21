import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto'
  + 'Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const headingNotFound = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
      level: 2,
    });
    expect(headingNotFound).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
