import { useState, useEffect } from 'preact/hooks';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import globalStyles from '../globalStyles';

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
      <Global styles={globalStyles} />
      <header>
        <h2>Chrome Extension Starter Kit</h2>
      </header>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={handleContentPanel}
              checked={showContentPanel}
            />
            Content panel
          </label>
        </li>
      </ul>
    </StyledPopup>
  );
}

const StyledPopup = styled.div`
  ${tw`
    text-base
    bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100
    cursor-default shadow
  `}

  header {
    ${tw`py-2 px-4 bg-gray-400 dark:bg-gray-800`}
  }

  h2 {
    ${tw`text-lg font-bold m-0 whitespace-nowrap`}
  }

  ul {
    ${tw`select-none list-none p-0 m-0`}
  }

  li {
    ${tw`py-3 px-4`}
  }

  li + li {
    ${tw`border-0 border-t border-solid border-gray-400`}
  }

  [type='checkbox'] {
    margin-right: 0.4rem;
  }
`;
