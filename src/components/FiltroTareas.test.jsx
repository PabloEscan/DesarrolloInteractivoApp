import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FiltroTareas from './FiltroTareas';

describe('FiltroTareas', () => {
  it('marca como activo el botón del filtro actual', () => {
    render(<FiltroTareas filtroActual="pendientes" alCambiarFiltro={() => {}} />);

    expect(screen.getByRole('button', { name: 'Pendientes' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Todas' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('al pulsar "Hechas" avisa al padre con el filtro "hechas"', async () => {
    const alCambiarFiltro = vi.fn();
    render(<FiltroTareas filtroActual="todas" alCambiarFiltro={alCambiarFiltro} />);

    await userEvent.click(screen.getByRole('button', { name: 'Hechas' }));

    expect(alCambiarFiltro).toHaveBeenCalledWith('hechas');
  });
});