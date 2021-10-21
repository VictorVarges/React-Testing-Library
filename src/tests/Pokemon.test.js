import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
// utilizei este repositório como referencia: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/97/files
describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toBe('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const checked = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checked);
    const starImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
    expect(starImg.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link.href).toBe('http://localhost/pokemons/25');
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
