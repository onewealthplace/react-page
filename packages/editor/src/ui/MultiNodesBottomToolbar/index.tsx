import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import {
  useAllFocusedNodeIds,
  useUiTranslator,
} from '../../core/components/hooks';
import { BottomToolbarDrawer } from '../BottomToolbar';
import type { Theme } from '../ThemeProvider';
import { ThemeProvider, StyledEngineProvider } from '../ThemeProvider';
import DeleteAll from './DeleteAll';
import DuplicateAll from './DuplicateAll';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const MultiNodesBottomToolbar: React.FC = React.memo(() => {
  const { t } = useUiTranslator();
  const focusedNodeIds = useAllFocusedNodeIds();
  return (
    <BottomToolbarDrawer open={focusedNodeIds.length > 1} anchor={'bottom'}>
      <Grid container={true} direction="row" alignItems="center">
        <Grid item={true}>
          <Avatar
            children={focusedNodeIds.length}
            style={{
              marginRight: 16,
            }}
          />
        </Grid>

        <Grid item={true}>
          <Typography variant="subtitle1">
            {t('(multiple selected)')}
          </Typography>
        </Grid>
        <Grid item style={{ marginLeft: 'auto' }}>
          <DuplicateAll />
        </Grid>
        <Grid item>
          <DeleteAll />
        </Grid>
      </Grid>
    </BottomToolbarDrawer>
  );
});
