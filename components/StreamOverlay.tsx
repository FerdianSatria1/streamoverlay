import React from 'react';
import { OverlayConfig } from '../types';
import { ValorantTheme } from './themes/ValorantTheme';
import { RdrTheme } from './themes/RdrTheme';
import { Cs2Theme } from './themes/Cs2Theme';
import { RobloxTheme } from './themes/RobloxTheme';
import { ChattingTheme } from './themes/ChattingTheme';

interface Props {
  config: OverlayConfig;
}

export const StreamOverlay: React.FC<Props> = ({ config }) => {
  switch (config.game) {
    case 'rdr2':
      return <RdrTheme config={config} />;
    case 'cs2':
      return <Cs2Theme config={config} />;
    case 'roblox':
      return <RobloxTheme config={config} />;
    case 'chatting':
      return <ChattingTheme config={config} />;
    case 'valorant':
    default:
      return <ValorantTheme config={config} />;
  }
};