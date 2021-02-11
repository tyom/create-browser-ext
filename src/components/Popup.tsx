import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import Button from './Button';

type PopupProps = {};

export default function Popup({}: PopupProps) {
  const [showContentPanel, setShowContentPanel] = useState(false);
  const [tabId, setTabId] = useState<number | undefined>(undefined);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      setTabId(tab.id);
    });

    chrome.storage.local.get(['showContentPanel'], (result) => {
      console.log(result.showContentPanel);
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
  min-width: 500px;
  min-height: 400px;
`;
