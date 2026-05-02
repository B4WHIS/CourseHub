import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce hook', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 100));
    expect(result.current).toBe('test');
  });

  it('returns number value correctly', () => {
    const { result } = renderHook(() => useDebounce(42, 100));
    expect(result.current).toBe(42);
  });

  it('returns object value correctly', () => {
    const obj = { name: 'test' };
    const { result } = renderHook(() => useDebounce(obj, 100));
    expect(result.current).toEqual(obj);
  });
});
