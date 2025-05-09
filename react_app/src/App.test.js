import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading that includes CI/CD with Jenkins', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    name: /ci\/cd with jenkins/i, // Matches any heading containing "CI/CD with Jenkins"
  });
  expect(heading).toBeInTheDocument();
});
