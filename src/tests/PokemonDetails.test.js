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

describe('Teste o componente <PokemonDetails.js />', () => {
  const pikachuDetails = '/pokemons/25';

  it('A página deve conter um texto <name> Details,'
  + 'onde <name> é o nome do Pokémon;', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const detailsHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(detailsHeading).toBeInTheDocument();

    expect(detailsLink).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const textSummary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(textSummary).toBeInTheDocument();
  });
  it('deve conter um parágrafo com o resumo do Pokémon'
  + 'específico sendo visualizado.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const resumeText = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity./i,
    );
    expect(resumeText).toBeInTheDocument();
  });
  it('deverá existir um heading h2 com o texto Game Locations of <name>;'
  + 'onde <name> é o nome do Pokémon exibido.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas'
  + 'contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const firstLocationText = screen.getByText('Kanto Viridian Forest');
    expect(firstLocationText).toBeInTheDocument();

    const secondLocationText = screen.getByText('Kanto Power Plant');
    expect(secondLocationText).toBeInTheDocument();

    const pokemonLocationsImages = screen.getAllByAltText('Pikachu location');
    expect(pokemonLocationsImages[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocationsImages[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const isFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
