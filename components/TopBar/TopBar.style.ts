import {StyleSheet} from 'react-native';

/**
 * iOS Navigation Bar design tokens (Apple HIG + макет node 201-71)
 *
 * Высота контентной области навбара: 44pt
 * Safe area top: добавляется динамически через useSafeAreaInsets
 * Title: SF Pro Display 17pt Semibold (используем системный шрифт)
 * Back button: SF Pro Text 17pt Regular, цвет #007AFF
 */

export const NAV_BAR_HEIGHT = 44;

/** Если safeArea.top === 0 (нет notch/Dynamic Island) — отступ сверху 0 */
export const NAV_BAR_FALLBACK_TOP = 0;

export default StyleSheet.create({
  /** Внешняя обёртка — задаёт фон и принимает paddingTop (safeArea) */
  wrapper: {
    backgroundColor: '#FFFFFF',
  },

  /**
   * Внутренний контейнер фиксированной высоты 44pt.
   * Три секции: left | center | right, каждая flex:1
   * чтобы title всегда был строго по центру.
   */
  container: {
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60, 60, 67, 0.36)', // iOS separator color
  },

  // ─── LEFT SECTION ────────────────────────────────────────────────────────────
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // hitSlop задаётся в компоненте через prop
    paddingVertical: 8,
    paddingRight: 8,
  },
  backChevron: {
    fontSize: 28,       // визуально крупный шеврон iOS
    lineHeight: 30,
    fontWeight: '300',
    color: '#007AFF',
    marginRight: 2,
    // смещение вверх чтобы шеврон выглядел центрированным
    marginTop: -3,
  },
  backTitle: {
    fontSize: 17,
    fontWeight: '400',  // Regular
    lineHeight: 22,
    color: '#007AFF',
  },

  // ─── CENTER SECTION ───────────────────────────────────────────────────────────
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',  // Semibold
    lineHeight: 22,
    color: '#000000',
    textAlign: 'center',
  },

  // ─── RIGHT SECTION ────────────────────────────────────────────────────────────
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
