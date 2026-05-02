import { describe, it, expect } from 'vitest';
import { formatPrice, getLevelLabel, getLevelColor } from '@/utils/index';

describe('Utility functions', () => {
  describe('formatPrice', () => {
    it('formats price with VND currency', () => {
      expect(formatPrice(100000)).toBe('100.000đ');
    });

    it('formats zero price', () => {
      expect(formatPrice(0)).toBe('0đ');
    });

    it('formats large price', () => {
      expect(formatPrice(1000000)).toBe('1.000.000đ');
    });
  });

  describe('getLevelLabel', () => {
    it('returns Vietnamese label for beginner', () => {
      expect(getLevelLabel('beginner')).toBe('Cơ bản');
    });

    it('returns Vietnamese label for intermediate', () => {
      expect(getLevelLabel('intermediate')).toBe('Trung cấp');
    });

    it('returns Vietnamese label for advanced', () => {
      expect(getLevelLabel('advanced')).toBe('Nâng cao');
    });

    it('returns original value for unknown level', () => {
      expect(getLevelLabel('unknown')).toBe('unknown');
    });
  });

  describe('getLevelColor', () => {
    it('returns success for beginner', () => {
      expect(getLevelColor('beginner')).toBe('success');
    });

    it('returns warning for intermediate', () => {
      expect(getLevelColor('intermediate')).toBe('warning');
    });

    it('returns error for advanced', () => {
      expect(getLevelColor('advanced')).toBe('error');
    });

    it('returns default for unknown level', () => {
      expect(getLevelColor('unknown')).toBe('default');
    });
  });
});
