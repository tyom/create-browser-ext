import { useEffect, useState } from 'preact/hooks';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Frame from 'react-frame-component';
import pkg from '../../package.json';

const rootId = `${pkg.name}-root`;

type InPagePanelProps = {
  position?: 'top' | 'right' | 'bottom' | 'left';
};
type StyleProps = {
  visible: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
};

export default function InPagePanel({ position = 'top' }: InPagePanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg) {
        setVisible(msg.showContentPanel);
        chrome.storage.local.set({
          showContentPanel: msg.showContentPanel,
        });
        sendResponse(`Content panel visibility changed to ${msg.injected}`);
      }
    });
  }, []);

  return (
    <StyledFrame id={rootId} visible={visible} position={position}>
      <h1>In-page panel</h1>
    </StyledFrame>
  );
}

const positionFixedTop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  box-shadow: 0 1px 3px #0004;
`;

const positionFixedRight = css`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: auto;
  box-shadow: -1px 0 3px #0004;
`;

const positionFixedBottom = css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: auto;
  box-shadow: 0 -1px 3px #0004;
`;

const positionFixedLeft = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: auto;
  box-shadow: 1px 0 3px #0004;
`;

function positionStyles({ position }: Partial<StyleProps>) {
  switch (position) {
    case 'top':
      return positionFixedTop;
    case 'right':
      return positionFixedRight;
    case 'bottom':
      return positionFixedBottom;
    case 'left':
      return positionFixedLeft;
  }
}

const visibilityStyles = ({ visible }: Partial<StyleProps>) =>
  visible ? 'display: block' : 'display: none';

const StyledFrame = styled(Frame)<StyleProps>`
  z-index: 9999;
  border-bottom: 1px solid #aaa;
  background-color: #eee;
  ${visibilityStyles};
  ${positionStyles};
`;
