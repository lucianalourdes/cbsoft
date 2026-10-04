import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { ConductPage } from './ConductPage';

beforeEach(async () => {
  await i18n.changeLanguage('pt');
});

describe('ConductPage', () => {
  it('renders the code of conduct for the 2027 edition', () => {
    const { container } = render(
      <MemoryRouter>
        <ConductPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Código de Conduta' })).toBeTruthy();
    expect(screen.getByText('Comportamentos inaceitáveis incluem:')).toBeTruthy();
    expect(screen.getByText('Assédio inclui:')).toBeTruthy();
    const text = container.textContent ?? '';
    expect(text).toMatch(/Comitê Organizador do CBSoft 2027/);
    expect(text).not.toMatch(/2026/);
  });
});
