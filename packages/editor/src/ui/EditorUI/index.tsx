import React from 'react';

import type { Theme } from '../ThemeProvider';
import { ThemeProvider, StyledEngineProvider } from '../ThemeProvider';
import { PluginDrawer } from '../PluginDrawer';
import { Trash } from '../Trash';
import type { StickyNess } from '../Sidebar';
import { Sidebar } from '../Sidebar';
import { useOption } from '../../core/components/hooks';
import { MultiNodesBottomToolbar } from '../MultiNodesBottomToolbar';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export default React.memo(
  ({
    stickyNess = {
      shouldStickToTop: false,
      shouldStickToBottom: false,
      rightOffset: 0,
      rightOffsetFixed: 0,
    },
  }: {
    stickyNess?: StickyNess;
  }) => {
    const hideEditorSidebar = useOption('hideEditorSidebar');
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <Trash />
          {!hideEditorSidebar && <Sidebar stickyNess={stickyNess} />}
          <PluginDrawer />
          <MultiNodesBottomToolbar />
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
);
