import renderer from 'react-test-renderer';

import { Text, View } from '../Themed';

describe('Themed', () => {
  describe('View', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<View>Snapshot test!</View>);

      expect(tree.toTree()).not.toBeNull();
    });
  });

  describe('Text', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Text>Snapshot test!</Text>);

      expect(tree.toTree()).not.toBeNull();
    });
  });
});
