import React, { useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export interface SwitcherOption {
  value: string;
  label: string;
  isActive: boolean;
}

interface OptionSwitcherProps {
  title: string;
  options: SwitcherOption[];
  onOptionPress: (value: string) => void;
  statusText?: string;
  style?: ViewStyle;
  horizontal?: boolean;
  buttonSize?: 'small' | 'medium' | 'large';
}

// Move style getters outside component to avoid recreation
const getButtonStyleBySize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small': return styles.smallButton;
    case 'large': return styles.largeButton;
    default: return styles.mediumButton;
  }
};

const getTextStyleBySize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small': return styles.smallText;
    case 'large': return styles.largeText;
    default: return styles.mediumText;
  }
};

export const OptionSwitcher: React.FC<OptionSwitcherProps> = React.memo(({
  title,
  options,
  onOptionPress,
  statusText,
  style,
  horizontal = true,
  buttonSize = 'medium',
}) => {
  const { theme } = useTheme();

  // Memoize styles to prevent recreation
  const buttonStyle = useMemo(() => getButtonStyleBySize(buttonSize), [buttonSize]);
  const textStyle = useMemo(() => getTextStyleBySize(buttonSize), [buttonSize]);

  // Memoize container style
  const containerStyle = useMemo(() => [
    styles.buttonContainer,
    !horizontal && styles.verticalContainer
  ], [horizontal]);

  // Memoize the press handler to prevent recreating TouchableOpacity
  const handlePress = useCallback((value: string) => {
    onOptionPress(value);
  }, [onOptionPress]);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      
      <View style={containerStyle}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.button,
              buttonStyle,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
              option.isActive && {
                backgroundColor: theme.colors.primary,
              },
              !horizontal && styles.fullWidthButton,
            ]}
            onPress={() => handlePress(option.value)}
          >
            <Text
              style={[
                styles.buttonText,
                textStyle,
                { color: theme.colors.text },
                option.isActive && styles.activeButtonText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {statusText && (
        <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
          {statusText}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  verticalContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  button: {
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },
  // Button sizes
  smallButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 60,
  },
  mediumButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
  },
  largeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
  },
  // Text styles
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
});
