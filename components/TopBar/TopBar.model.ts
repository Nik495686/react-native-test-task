export interface ITopBarButton {
  /** Символ/имя иконки. Передаётся в компонент Icon */
  iconName: string;
  onPress: () => void;
}

export interface ITopBarProps {
  /**
   * Заголовок навбара.
   * Опциональный — макет содержит варианты без title
   * (например, только кнопка назад или только иконки справа).
   */
  title?: string;
  /**
   * Текст рядом с шевроном «Назад».
   * Если не передан — кнопка Назад не отображается.
   */
  backTitle?: string;
  /**
   * Кастомный обработчик нажатия кнопки Назад.
   * Если не передан — выполняется navigation.goBack().
   */
  onBackPress?: () => void;
  /** Кнопки-иконки справа (массив) */
  rightButtons?: ITopBarButton[];
}
