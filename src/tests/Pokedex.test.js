import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

const pokemonIdName = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const headingText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      value: 2,
    });
    expect(headingText).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(btn);
    const nextCard = screen.getByText('Charmander');
    expect(nextCard).toBeInTheDocument();
  });
  // utilizei este repositório como referência: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/97/files.
  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    const buttonText = screen.getByTestId('next-pokemon');
    const pokemon = screen.getByTestId(pokemonIdName);
    expect(buttonText.innerHTML).toBe('Próximo pokémon');
    userEvent.click(buttonText);
    expect(pokemon.innerHTML).toBe('Charmander');
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(pokemonIdName);
    expect(pokemon).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filteredButton = screen.getAllByTestId('pokemon-type-button');
    filteredButton.forEach((button, index) => {
      expect(button).not.toEqual(filteredButton[index + 1]);
    });
  });
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);

    const nameInButton = screen.getByRole('button', {
      name: 'Psychic',
    });
    expect(nameInButton).toBeInTheDocument();
  });
  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeVisible();
  });
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonAll.innerHTML).toBe('All');
  });
  it('A Pokedéx deverá mostrar os Pokémons normalmente'
  + '(sem filtros) quando o botão All for clicado;', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByText('Pikachu');
    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(buttonAll);
    expect(pokemon).toBeInTheDocument();
  });
});
