import React from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/hooks/useTheme';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { styles } from './QueryStateView.styles';

interface QueryStateViewProps {
  isPending: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onRetry?: () => void;
  errorMessage?: string;
  emptyMessage?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Renders the loading / error / empty branches shared by data-backed screens,
 * falling through to `children` once the query has something to show. Screens
 * that delegate the empty case to `FlatList`'s `ListEmptyComponent` only pass
 * `isPending`.
 */
const QueryStateView = ({
  isPending,
  isError = false,
  isEmpty = false,
  onRetry,
  errorMessage,
  emptyMessage,
  style,
  children,
}: QueryStateViewProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  if (isPending) {
    return (
      <View style={[styles.centered, style]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.centered, style]}>
        <EmptyState message={errorMessage ?? t('common.loadError')} />
        {onRetry ? (
          <Button
            title={t('common.retry')}
            onPress={onRetry}
            style={styles.retry}
          />
        ) : null}
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={[styles.centered, style]}>
        <EmptyState message={emptyMessage ?? ''} />
      </View>
    );
  }

  return <>{children}</>;
};

export default QueryStateView;
