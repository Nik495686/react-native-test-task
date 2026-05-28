import React, {useCallback} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {TopBar} from '../../components/TopBar';

/**
 * TestScreen — демонстрирует 5 вариантов TopBar согласно заданию.
 *
 * 1. Только title
 * 2. title + backTitle
 * 3. title + 1 кнопка справа
 * 4. title + backTitle + 1 кнопка справа
 * 5. title + backTitle + 3 кнопки справа
 */
export const TestScreen = () => {
  const handleBack = useCallback(() => {
    console.log('back pressed');
  }, []);

  const handleIcon = useCallback((name: string) => {
    console.log(`icon pressed: ${name}`);
  }, []);

  return (
    <ScrollView style={styles.scroll} bounces={false}>

      {/* 1. Только title */}
      <Label text="1. Только title" />
      <TopBar title="Заголовок" />

      <Spacer />

      {/* 2. title + backTitle */}
      <Label text="2. title + backTitle" />
      <TopBar
        title="Заголовок"
        backTitle="Назад"
        onBackPress={handleBack}
      />

      <Spacer />

      {/* 3. title + 1 кнопка справа */}
      <Label text="3. title + 1 кнопка справа" />
      <TopBar
        title="Заголовок"
        rightButtons={[
          {iconName: '⋯', onPress: () => handleIcon('more')},
        ]}
      />

      <Spacer />

      {/* 4. title + backTitle + 1 кнопка справа */}
      <Label text="4. title + backTitle + 1 кнопка" />
      <TopBar
        title="Заголовок"
        backTitle="Назад"
        onBackPress={handleBack}
        rightButtons={[
          {iconName: '+', onPress: () => handleIcon('add')},
        ]}
      />

      <Spacer />

      {/* 5. title + backTitle + 3 кнопки справа */}
      <Label text="5. title + backTitle + 3 кнопки" />
      <TopBar
        title="Заголовок"
        backTitle="Назад"
        onBackPress={handleBack}
        rightButtons={[
          {iconName: '↑', onPress: () => handleIcon('share')},
          {iconName: '♡', onPress: () => handleIcon('like')},
          {iconName: '⋯', onPress: () => handleIcon('more')},
        ]}
      />

      <View style={styles.bottomPad} />
    </ScrollView>
  );
};

// ─── вспомогательные компоненты только для TestScreen ────────────────────────

const Label: React.FC<{text: string}> = ({text}) => (
  <Text style={styles.label}>{text}</Text>
);

const Spacer = () => <View style={styles.spacer} />;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  label: {
    fontSize: 13,
    color: '#6C6C70',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '500',
  },
  spacer: {
    height: 0,
  },
  bottomPad: {
    height: 40,
  },
});
