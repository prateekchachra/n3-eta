import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders home page on landing', () => {
  render(<App />);
  const linkElement = screen.getByText(/Categories to bag/i);
  expect(linkElement).toBeInTheDocument();
});
describe("Test testCase", () => {
  test("Test testCase", async () => {
  });
});
