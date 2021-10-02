import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('1. Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const setLinks = screen.getByRole('navigation');
    expect(setLinks).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const textHome = screen.getByRole('link', {
      name: 'Home',
    });
    expect(textHome).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const textAbout = screen.getByRole('link', {
      name: 'About',
    });
    expect(textAbout).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const textFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(textFavoritePokemons).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial.'
  + ' ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /home/i,
    }));
    const pathNameHome = history.location.pathname;
    expect(pathNameHome).toBe('/');
  });
  it('este se a aplicação é redirecionada para a página de About'
  + 'ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /about/i,
    }));
    const pathNameAbout = history.location.pathname;
    expect(pathNameAbout).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados'
  + 'ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    }));
    const pathNameFavoritados = history.location.pathname;
    expect(pathNameFavoritados).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');

    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found crying emoji/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
