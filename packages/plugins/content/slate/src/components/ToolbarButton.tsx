import { lazyLoad } from '@react-page/editor';
import React from 'react';
import { ConditionalWrapper } from './ConditionalWrapper';

const IconButton = lazyLoad(() => import('@mui/material/IconButton'));
const Tooltip = lazyLoad(() => import('@mui/material/Tooltip'));

const ToolbarButton: React.SFC<{
  icon: JSX.Element | string;
  isActive: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler;
  toolTip?: string;
}> = ({ icon, isActive, onClick, disabled = false, toolTip = '' }) => (
  <ConditionalWrapper
    condition={!disabled}
    wrapper={(children) => <Tooltip title={toolTip}>{children}</Tooltip>}
  >
    <IconButton
      onMouseDown={onClick}
      style={
        isActive
          ? { color: 'rgb(0, 188, 212)' }
          : disabled
          ? { color: 'gray' }
          : { color: 'white' }
      }
      disabled={disabled}
      size="large"
    >
      {icon}
    </IconButton>
  </ConditionalWrapper>
);

export default React.memo(ToolbarButton);
