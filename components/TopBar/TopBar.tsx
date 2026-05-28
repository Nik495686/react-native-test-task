import React, {FC, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles, {NAV_BAR_FALLBACK_TOP} from './TopBar.style';
import {ITopBarProps} from './TopBar.model';

/**
 * Icon — заглушка, т.к. в проекте нет иконочного пакета.
 * Замените тело на свой <Icon name={name} /> когда добавите пакет.
 */
const Icon: FC<{name: string}> = ({name}) => (
  <Text style={{fontSize: 22, color: '#007AFF', lineHeight: 26}}>{name}</Text>
);

/**
 * TopBar — iOS-style Navigation Bar.
 *
 * Макет (Pixso node 201-71) содержит все комбинации:
 *   — только title
 *   — только backTitle (без title)
 *   — title + backTitle
 *   — title + backTitle + 1–3 иконки справа
 *   — только иконки (без title и backTitle)
 *
 * Поэтому все пропсы опциональны кроме... ничего — компонент
 * корректно рендерится при любой комбинации.
 *
 * Примеры использования:
 *   <TopBar title="Экран" />
 *   <TopBar title="Экран" backTitle="Назад" />
 *   <TopBar title="Экран" backTitle="Назад" onBackPress={() => router.back()} />
 *   <TopBar title="Экран" rightButtons={[{iconName: '+', onPress: handleAdd}]} />
 *   <TopBar backTitle="Назад" />  ← без title, как в макете
 */
export const TopBar: FC<ITopBarProps> = ({
  title,
  backTitle,
  onBackPress,
  rightButtons = [],
}) => {
  const {top} = useSafeAreaInsets();

  /**
   * Отступ сверху:
   * - если safeArea.top > 0 (есть notch / Dynamic Island) — берём его
   * - иначе — 0 (значение из макета, навбар без статус-бара)
   */
  const topPadding = top > 0 ? top : NAV_BAR_FALLBACK_TOP;

  /**
   * Навигация назад:
   * 1. Если передан onBackPress — вызываем его
   * 2. Иначе — navigation.goBack() (закомментирован: нет пакета)
   *
   * Раскомментировать после установки @react-navigation/native:
   *   import {useNavigation} from '@react-navigation/native';
   *   const navigation = useNavigation();
   *   navigation.goBack();
   */
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    // navigation.goBack();
    console.warn('TopBar: передайте onBackPress или подключите React Navigation');
  }, [onBackPress]);

  const hasBackButton = backTitle !== undefined;

  return (
    <View style={[styles.wrapper, {paddingTop: topPadding}]}>
      <View style={styles.container}>

        {/* ── LEFT: кнопка «‹ Назад» ── */}
        <View style={styles.leftSection}>
          {hasBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              accessibilityRole="button"
              accessibilityLabel={backTitle || 'Назад'}>
              <Text style={styles.backChevron}>‹</Text>
              <Text style={styles.backTitle} numberOfLines={1}>
                {backTitle}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── CENTER: заголовок (опциональный — в макете есть варианты без него) ── */}
        <View style={styles.centerSection}>
          {title ? (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
        </View>

        {/* ── RIGHT: иконки ── */}
        <View style={styles.rightSection}>
          {rightButtons.map((btn, index) => (
            <TouchableOpacity
              // eslint-disable-next-line react/no-array-index-key
              key={`${btn.iconName}_${index}`}
              style={styles.iconButton}
              onPress={btn.onPress}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              accessibilityRole="button">
              <Icon name={btn.iconName} />
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </View>
  );
};

TopBar.displayName = 'TopBar';
