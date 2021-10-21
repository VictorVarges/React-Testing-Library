import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritesPokemons from '../components/FavoritePokemons';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritesPokemons />);

    const renderText = screen.getByText('No favorite pokemon found');
    expect(renderText).toBeInTheDocument();
  });
});
