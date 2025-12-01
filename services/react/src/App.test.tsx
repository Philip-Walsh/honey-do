import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

test('renders Honey-Do header', () => {
    render(
        <ThemeProvider>
            <MemoryRouter>
                <App />
            </MemoryRouter>
        </ThemeProvider>
    )
    const headerElement = screen.getByRole('heading', { name: /Honey Do/i })
    expect(headerElement).toBeInTheDocument()
})
