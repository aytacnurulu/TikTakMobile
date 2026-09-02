import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@/shared/hooks/useTheme';
import { Locale, useLocaleStore } from '@/shared/store/locale.store';
import i18n from '@/shared/lib/i18n';
import { createStyles } from './LanguageSelectSheet.styles';

export interface LanguageSelectSheetRef {
  open: () => void;
}

const LANGUAGE_LABELS: Record<Locale, string> = {
  az: 'Azərbaycanca',
  ru: 'Русский',
  en: 'English',
};

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    pressBehavior="close"
  />
);

const LanguageSelectSheet = forwardRef<LanguageSelectSheetRef>((_props, ref) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const locale = useLocaleStore(state => state.locale);
  const setLocale = useLocaleStore(state => state.setLocale);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }));

  const locales = Object.keys(i18n.options.resources ?? {}) as Locale[];

  const handleSelect = (nextLocale: Locale) => {
    setLocale(nextLocale);
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing
      enablePanDownToClose
      bottomInset={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      containerStyle={styles.sheetContainer}
    >
      <BottomSheetView style={styles.content}>
        {locales.map(code => {
          const isSelected = code === locale;

          return (
            <TouchableOpacity
              key={code}
              style={styles.row}
              onPress={() => handleSelect(code)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.label,
                  { color: isSelected ? colors.primary : colors.textLabel },
                ]}
              >
                {LANGUAGE_LABELS[code] ?? code}
              </Text>
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: isSelected ? colors.primary : colors.border },
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default LanguageSelectSheet;
