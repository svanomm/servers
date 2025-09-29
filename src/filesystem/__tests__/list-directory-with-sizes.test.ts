import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Test the schema validation for the sortBy parameter
describe('ListDirectoryWithSizesArgsSchema', () => {
  const ListDirectoryWithSizesArgsSchema = z.object({
    path: z.string(),
    sortBy: z.enum(['name', 'size', 'mtime']).optional().default('name').describe('Sort entries by name, size, or mtime (last modified time)'),
  });

  it('should accept valid sortBy values', () => {
    expect(() => ListDirectoryWithSizesArgsSchema.parse({ path: '/test' })).not.toThrow();
    expect(() => ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'name' })).not.toThrow();
    expect(() => ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'size' })).not.toThrow();
    expect(() => ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'mtime' })).not.toThrow();
  });

  it('should reject invalid sortBy values', () => {
    expect(() => ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'invalid' })).toThrow();
    expect(() => ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'date' })).toThrow();
  });

  it('should default to name sorting when sortBy is not provided', () => {
    const result = ListDirectoryWithSizesArgsSchema.parse({ path: '/test' });
    expect(result.sortBy).toBe('name');
  });

  it('should preserve the sortBy value when provided', () => {
    const resultName = ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'name' });
    expect(resultName.sortBy).toBe('name');

    const resultSize = ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'size' });
    expect(resultSize.sortBy).toBe('size');

    const resultMtime = ListDirectoryWithSizesArgsSchema.parse({ path: '/test', sortBy: 'mtime' });
    expect(resultMtime.sortBy).toBe('mtime');
  });
});