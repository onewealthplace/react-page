import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(
  adaptV4Theme({
    palette: {
      mode: 'dark',
    },
  })
);

export default theme;
