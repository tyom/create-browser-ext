import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { ComponentChildren, RefObject } from 'preact';
import debounce from 'lodash.debounce';
import styled from '@emotion/styled';
import weakMemoize from '@emotion/weak-memoize';
import { CacheProvider, Global } from '@emotion/react';
import createCache from '@emotion/cache';
import Frame, { FrameContextConsumer, FrameContextProps } from 'react-frame-component';
import tw from 'twin.macro';
import pkg from '../../package.json';
import globalStyles from '../globalStyles';

const rootId = `${pkg.name}-root`;

type StyleProps = {
  visible: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
  positionType: 'top' | 'right' | 'bottom' | 'left';
};

type FramedContentProps = {
  children: ComponentChildren;
};

type FrameProviderProps = {
  children: ComponentChildren;
};

interface FrameRef extends Frame {
  node: HTMLIFrameElement;
}

const memoizedCreateCacheWithContainer = weakMemoize((container: HTMLElement) => {
  return createCache({ key: 'frame', container });
});

const FrameProvider = ({ children }: FrameProviderProps) => (
  <FrameContextConsumer>
    {({ document }: FrameContextProps) => {
      return (
        <CacheProvider value={memoizedCreateCacheWithContainer(document.head)}>
          <Global styles={globalStyles} />
          {children}
        </CacheProvider>
      );
    }}
  </FrameContextConsumer>
);

export default function FramedContent({ children }: FramedContentProps) {
  const [visible, setVisible] = useState(undefined);
  const [position, setPosition] = useState(undefined);
  const [positionType, setPositionType] = useState(undefined);
  const [height, setHeight] = useState<number | string>('auto');
  const iframeRef = useRef<FrameRef>();

  const handleResize = useCallback((iframe: RefObject<FrameRef>) => {
    const height = iframe.current?.node.contentDocument?.body.scrollHeight ?? 0;
    if (height !== 0) {
      setHeight(height);
    }
  }, []);

  useEffect(() => {
    chrome.storage.local.get(
      ['position', 'positionType', 'showContentPanel'],
      (result) => {
        setPosition(result.position ?? 'top');
        setPositionType(result.positionType ?? 'fixed');
        setVisible(result.showContentPanel ?? false);
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
      id={rootId}
      visible={visible}
      position={position}
      positionType={positionType}
      initialContent={`<!DOCTYPE html><html><head></head><body></body></html>`}
      mountTarget="body"
      style={{ height }}
      contentDidUpdate={() => handleResize(iframeRef)}
    >
      <FrameProvider>{children}</FrameProvider>
    </StyledFrame>
  );
}

const StyledFrame = styled(Frame)<StyleProps>`
  ${tw`w-auto h-auto shadow bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border-0`}
  ${(p) => p.position === 'top' && tw`top-0 left-0 w-screen`}
  ${(p) => p.position === 'right' && tw`top-0 right-0 h-screen!`}
  ${(p) => p.position === 'bottom' && tw`bottom-0 left-0 w-screen`}
  ${(p) => p.position === 'left' && tw`top-0 left-0 h-screen!`}
  ${(p) => (p.visible ? tw`visible` : tw`hidden`)}
  position: ${(p) => p.positionType};
  z-index: 9999;
`;
