import { useState, useEffect } from 'preact/hooks';
import styled from '@emotion/styled';
import Button from './Button';

export default function Popup() {
  const [showContentPanel, setShowContentPanel] = useState(false);
  const [tabId, setTabId] = useState<number | undefined>(undefined);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      setTabId(tab.id);
    });

    chrome.storage.local.get(['showContentPanel'], (result) => {
      setShowContentPanel(result.showContentPanel);
    });
  }, []);

  useEffect(() => {
    if (tabId) {
      chrome.tabs.sendMessage(tabId, {
        showContentPanel,
      });
    }
  }, [showContentPanel]);

  function handleContentScript() {
    setShowContentPanel(!showContentPanel);
  }

  return (
    <StyledPopup>
      <h1>Chrome Extension Starter Kit</h1>
      <Button onClick={handleContentScript}>
        {showContentPanel ? 'Hide' : 'Show'} content panel
      </Button>
    </StyledPopup>
  );
}

const StyledPopup = styled.div`
  background: #ddd;
  padding: 10px;
  min-width: 250px;
`;
