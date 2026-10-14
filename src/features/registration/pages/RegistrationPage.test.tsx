import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/app/i18n';
import { RegistrationPage } from './RegistrationPage';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('RegistrationPage', () => {
  it('shows registration as coming soon while fees are not approved', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Inscrições' })).toBeTruthy();
    expect(screen.getByText('Inscrições em breve')).toBeTruthy();
    expect(screen.queryByText('Estudante de Graduação (sócio SBC)')).toBeNull();
    expect(screen.queryByRole('table')).toBeNull();
  });
});
