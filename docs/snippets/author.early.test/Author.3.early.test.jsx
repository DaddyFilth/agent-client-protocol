import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Author } from '/snippets/author.jsx';

describe('Author component', () => {
  it('renders author name with GitHub link', () => {
    const { getByText } = render(<Author name="Daddyfilth" github="https://github.com/daddyfilth" />);
    const linkElement = getByText('Ben Brandt');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', 'https://github.com/daddyfilth);
    expect(linkElement.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement.closest('a')).toHaveAttribute('target', '_blank');
  });
});