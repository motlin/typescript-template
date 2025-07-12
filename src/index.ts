export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export { type User, createUser } from './user.js';
export { type Config, loadConfig } from './config.js';