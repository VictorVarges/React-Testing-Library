import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i, {
      selector: 'p',
    });
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them', {
        selector: 'p',
      },
    );

    expect(paragraphTwo).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const titleAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(titleAbout).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
