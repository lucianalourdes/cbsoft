import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { RegistrationPage } from './RegistrationPage';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('RegistrationPage', () => {
  it('renders the four registration categories with fees pending', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Inscrições' })).toBeTruthy();
    expect(screen.getByText('Estudante de Graduação (sócio SBC)')).toBeTruthy();
    expect(screen.getAllByText('A definir').length).toBeGreaterThanOrEqual(12);
  });
});
