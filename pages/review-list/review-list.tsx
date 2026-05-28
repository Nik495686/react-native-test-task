import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ListRenderItem,
} from 'react-native';

type TData = {
  title: string;
};

// Статичные данные выносим из компонента,
// чтобы массив не создавался заново при ререндере.
const STATIC_DATA: TData[] = [
  {title: '1'},
  {title: '2'},
  {title: '3'},
  {title: '4'},
  {title: '5'},
  {title: '6'},
  {title: '7'},
  {title: '8'},
];

// Мемoизированный элемент списка.
// Перерисуется только если изменится item.
const ListItem = React.memo<{item: TData}>(({item}) => (
  <View style={styles.item}>
    <View style={styles.dot} />
    <Text>{item.title}</Text>
  </View>
));

ListItem.displayName = 'ListItem';

export const OptimizationList = () => {
  const [value, setValue] = useState('');

  // Добавляем динамический элемент в начало списка.
  // useMemo сохраняет ссылку на массив между ререндерами.
  const data = useMemo<TData[]>(
    () => [{title: value}, ...STATIC_DATA],
    [value],
  );

  // Стабильная ссылка на renderItem.
  // Нужна чтобы FlatList не думал,
  // что renderItem изменился.
  const renderItem = useCallback<ListRenderItem<TData>>(
    ({item}) => <ListItem item={item} />,
    [],
  );

  // Индекс используем как key,
  // потому что title может повторяться.
  const keyExtractor = useCallback(
    (_: TData, index: number) => `item-${index}`,
    [],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
        />
      }
    />
  );
};

// StyleSheet.create создаёт
// стабильные ссылки на стили.
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 5,
    margin: 2,
    borderRadius: 5,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: 'yellow',
  },
});