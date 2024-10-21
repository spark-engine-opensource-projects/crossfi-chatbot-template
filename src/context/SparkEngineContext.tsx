"use client";
import React, { createContext, useContext } from 'react';
import { MantineProvider, MantineProviderProps } from '@mantine/core';

const SparkEngineContext = createContext<undefined>(undefined);

interface SparkEngineProviderProps extends Omit<MantineProviderProps, 'theme'> {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export const SparkEngineProvider: React.FC<SparkEngineProviderProps> = ({
  children,
  theme = 'light',
  ...mantineProps
}) => {
  // Assign the theme prop to Mantine's forceColorScheme prop
  const forceColorScheme = theme;

  return (
    <MantineProvider {...mantineProps} forceColorScheme={forceColorScheme}>
      {children}
    </MantineProvider>
  );
};

export const useSparkEngine = (): void => {
  const context = useContext(SparkEngineContext);
  if (!context) {
    throw new Error('useSparkEngine must be used within a SparkEngineProvider');
  }
};
