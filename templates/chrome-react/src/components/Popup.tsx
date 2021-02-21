import React, { useState, useEffect } from 'react';
import 'twin.macro';
import styled from 'styled-components';

export default function Popup() {
  const [showContentPanel, setShowContentPanel] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['showContentPanel'], (result) => {
      setShowContentPanel(result.showContentPanel);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ showContentPanel });
  }, [showContentPanel]);

  function handleContentPanel() {
    setShowContentPanel(!showContentPanel);
  }

  return (
    <StyledPopup>
      <header>
        <h2>Chrome Extension Starter Kit</h2>
      </header>
      <ul tw="bg-red-500">
        <li>
          <label>
            <div className="control">
              <input
                type="checkbox"
                onChange={handleContentPanel}
                checked={showContentPanel}
              />
              <span className="checkbox-mark" />
            </div>
            Content panel
          </label>
        </li>
      </ul>
    </StyledPopup>
  );
}

const StyledPopup = styled.div`
  min-width: 300px;
`;
