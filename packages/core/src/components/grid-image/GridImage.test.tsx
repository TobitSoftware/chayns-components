import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import GridImage from './GridImage';

describe('GridImage', () => {
    it('renders one image without additional grid images', () => {
        render(<GridImage images={['one.jpg']} size={100} />);

        expect(screen.getAllByRole('img')).toHaveLength(1);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'one.jpg');
    });

    it('renders two images side by side without a third grid image', () => {
        render(<GridImage images={['one.jpg', 'two.jpg']} size={100} />);

        expect(screen.getAllByRole('img')).toHaveLength(2);
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'one.jpg');
        expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'two.jpg');
    });
});
