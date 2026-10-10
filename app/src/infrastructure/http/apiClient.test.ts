import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiError, apiClient } from './apiClient';

describe('ApiClient', () => {
  beforeEach(() => {
    localStorage.clear();
    apiClient.setToken(null);
    vi.restoreAllMocks();
  });

  it('sets and gets token correctly', () => {
    apiClient.setToken('test-token');
    expect(apiClient.getToken()).toBe('test-token');
    expect(localStorage.getItem('token')).toBe('test-token');

    apiClient.setToken(null);
    expect(apiClient.getToken()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('throws ApiError on failed request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ detail: 'Not found error' }),
    });

    await expect(apiClient.getProduct('123')).rejects.toThrow(ApiError);
    await expect(apiClient.getProduct('123')).rejects.toThrow('El recurso no existe.');
  });
});
