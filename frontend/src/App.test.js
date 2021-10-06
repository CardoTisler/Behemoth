import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


//TODO: Database connectivity test
//TODO: ITransaction add test
//TODO: ITransaction category change test
//TODO: ITransaction delete test
//TODO: Category add test
//TODO: Category delete test
