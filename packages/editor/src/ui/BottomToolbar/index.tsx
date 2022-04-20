import React from 'react';
import type { Theme } from '../ThemeProvider';
import {
  darkTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '../ThemeProvider';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: React.FC<BottomToolbarProps> = React.memo(
  ({
    open = false,
    className,
    dark = false,
    theme,
    anchor = 'bottom',
    pluginControls,
    nodeId,
    actionsLeft,
    style,
    children,
  }) => {
    const [scale, setScale] = React.useState(1);

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme ? theme : dark ? darkTheme : null}>
          <BottomToolbarDrawer
            className={className}
            open={open}
            anchor={anchor}
            scale={scale}
            dark={dark}
            style={style}
          >
            {children}
            {pluginControls}
            <BottomToolbarMainBar
              nodeId={nodeId}
              actionsLeft={[
                <ScaleButton
                  key="scalebutton"
                  scale={scale}
                  setScale={setScale}
                />,
                ...React.Children.toArray(actionsLeft),
              ]}
            />
          </BottomToolbarDrawer>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
);
