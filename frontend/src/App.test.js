import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//TODO: Database connectivity test
//TODO: Transaction add test
//TODO: Transaction category change test
//TODO: Transaction delete test
//TODO: Category add test
//TODO: Category delete test
