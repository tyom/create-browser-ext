import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import styled, { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import tw from 'twin.macro';

type StyleProps = {
  $visible?: boolean;
  $position?: 'top' | 'right' | 'bottom' | 'left';
  $positionType?: 'absolute' | 'fixed' | 'relative' | 'static';
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

interface FrameRef extends Frame {
  node: HTMLIFrameElement;
}

export default function FramedContent({ children }: Props) {
  const [visible, setVisible] = useState<StyleProps['$visible']>();
  const [position, setPosition] = useState<StyleProps['$position']>();
  const [positionType, setPositionType] = useState<StyleProps['$positionType']>();
  const [height, setHeight] = useState<number | string>('auto');
  const iframeRef = useRef<FrameRef>(null);

  const handleResize = useCallback((iframe: React.RefObject<FrameRef>) => {
    requestAnimationFrame(() => {
      const height = iframe.current?.node.contentDocument?.body.scrollHeight ?? 0;
      if (height !== 0) {
        setHeight(height);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.get(
      ['position', 'positionType', 'showContentPanel'],
      (result) => {
        // TODO: Figure out why Setting state without timeout causes the warning:
        // Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
        setTimeout(() => {
          setPosition(result.position ?? 'top');
          setPositionType(result.positionType ?? 'fixed');
          setVisible(result.showContentPanel ?? false);
        });
      }
    );
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.position) {
        setPosition(changes.position.newValue);
      }
      if (changes.positionType) {
        setPositionType(changes.positionType.newValue);
      }
      if (changes.showContentPanel) {
        setVisible(changes.showContentPanel.newValue);
      }
    });
  }, []);

  useEffect(() => {
    const debouncedHandler = debounce(() => handleResize(iframeRef), 100);
    window.addEventListener('resize', debouncedHandler);

    return () => {
      window.removeEventListener('resize', debouncedHandler);
    };
  }, [handleResize, iframeRef]);

  return (
    <StyledFrame
      ref={iframeRef}
      $visible={visible}
      $position={position}
      $positionType={positionType}
      initialContent={`<!DOCTYPE html><html><head></head><body></body></html>`}
      mountTarget="body"
      style={{ height }}
      contentDidUpdate={() => handleResize(iframeRef)}
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document.head}>
            {children}
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </StyledFrame>
  );
}

const StyledFrame = styled(Frame)<StyleProps>`
  ${tw`w-auto h-auto shadow bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border-0`}
  ${(p) => p.$position === 'top' && tw`top-0 left-0 w-screen`}
  ${(p) => p.$position === 'right' && tw`top-0 right-0 h-screen!`}
  ${(p) => p.$position === 'bottom' && tw`bottom-0 left-0 w-screen`}
  ${(p) => p.$position === 'left' && tw`top-0 left-0 h-screen!`}
  ${(p) => (p.$visible ? tw`visible` : tw`hidden`)}
  position: ${(p) => p.$positionType};
  margin: 0;
  z-index: 9999;
`;
