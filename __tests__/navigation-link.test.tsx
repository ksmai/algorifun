import React from 'react';
import renderer from 'react-test-renderer';

import NavigationLink from '../src/components/navigation-link';

describe('NavigationLink', () => {
    it('renders GastbyLink correctly', () => {
        const tree = renderer
            .create(<NavigationLink to="/">Home</NavigationLink>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders <a> correctly', () => {
        const tree = renderer
            .create(<NavigationLink href="https://www.google.com/" target="_blank">Google</NavigationLink>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
