import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('@/features/product/components/ProductCard', () => ({
  __esModule: true,
  default: ({ product }: { product: { title: string } }) => (
    <>{product.title}</>
  ),
}));

jest.mock('@/features/product/components/ProductDetailSheet', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@/features/product/components/CompleteOrderBanner', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@/shared/hooks/favorites.hooks', () => ({
  useFavorites: () => ({
    data: {
      data: [
        {
          id: 1,
          title: 'Alma',
          img_url: 'https://example.com/apple.png',
          description: 'Fresh apple',
          price: '3.30',
          created_at: '2025-01-01',
          category: { id: 1, name: 'Fruit' },
        },
      ],
    },
    isPending: false,
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('@gorhom/bottom-sheet', () => ({
  BottomSheetModal: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  BottomSheetBackdrop: () => null,
  BottomSheetScrollView: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

import FavoritesScreen from '../src/features/favorites/screens/FavoritesScreen';

test('renders favorites title', () => {
  let component!: renderer.ReactTestRenderer;

  act(() => {
    component = renderer.create(<FavoritesScreen />);
  });

  const textNodes = component.root.findAllByType('Text');

  expect(textNodes.some(node => node.props.children === 'Siyahılarım')).toBe(
    true,
  );
});
