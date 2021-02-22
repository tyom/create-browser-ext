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
      <header tw="py-2 px-3 bg-gray-300">
        <h2 tw="text-lg font-bold">Chrome Extension Starter Kit</h2>
      </header>
      <ul tw="bg-gray-200 py-2 px-3 text-base">
        <li>
          <label tw="flex items-center">
            <div tw="mr-2">
              <input
                type="checkbox"
                onChange={handleContentPanel}
                checked={showContentPanel}
              />
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
