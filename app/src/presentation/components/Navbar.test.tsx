import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import * as AuthContextModule from '../../application/AuthContext';
import { describe, it, expect, vi } from 'vitest';

describe('Navbar Component', () => {
  it('renders the catalog view and displays cart count', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: { username: 'testuser', role: 'admin' },
      logout: vi.fn(),
      cart: [{ product: {} as any, quantity: 3 }],
      login: vi.fn() as any,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn()
    });

    const mockNavigate = vi.fn();
    render(<Navbar currentView="catalog" onNavigate={mockNavigate} />);

    expect(screen.getByText('Simple Stock Flow')).toBeTruthy();
    expect(screen.getByText('Administrador')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy(); // cart count
  });

  it('triggers navigation on click', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: { username: 'testuser', role: 'seller' },
      logout: vi.fn(),
      cart: [],
      login: vi.fn() as any,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn()
    });

    const mockNavigate = vi.fn();
    render(<Navbar currentView="catalog" onNavigate={mockNavigate} />);

    const salesButton = screen.getByText('Historial');
    fireEvent.click(salesButton);

    expect(mockNavigate).toHaveBeenCalledWith('sales');
  });
});
