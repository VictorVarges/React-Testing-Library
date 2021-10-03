import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import FavoritesPokemons from '../components/FavoritePokemons';
// import Pokemon from '../components/Pokemon';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

// const mockPikachu

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritesPokemons />);

    const renderText = screen.getByText('No favorite pokemon found');
    expect(renderText).toBeInTheDocument();
  });
  // it('Teste se é exibido todos os cards de pokémons favoritados.', async () => {
  //   global.fetch = jest.fn(function(url) {
  //     return Promise.resolve({
  //       json: () => Promise.resolve(variavel)
  //     })
  //   });

  //   renderWithRouter(<FavoritesPokemons />);

  //   const renderText = screen.getByText('No favorite pokemon found');
  //   expect(renderText).toBeInTheDocument();
  // });
});
