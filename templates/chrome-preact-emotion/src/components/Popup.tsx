import { useState, useEffect } from 'preact/hooks';
import tw from 'twin.macro';
import styled from '@emotion/styled';
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
      {globalStyles}
      <header>
        <h2>Chrome Extension Starter Kit</h2>
      </header>
      <ul>
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
  ${tw`
    text-sm select-none
    bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100
    cursor-default shadow
  `}

  header {
    ${tw`py-2 px-4 bg-gray-400 dark:bg-gray-800`}
  }

  h2 {
    ${tw`text-lg whitespace-nowrap`}
  }

  li {
    ${tw`py-3 px-4`}
  }

  li + li {
    ${tw`border-t border-gray-400`}
  }

  label {
    ${tw`label justify-start`}
  }

  .control {
    ${tw`mr-2`}
  }

  [type='checkbox'] {
    ${tw`checkbox checkbox-accent`}

    &:not(:checked):hover ~ .checkbox-mark::before {
      ${tw`opacity-20`}
    }
  }
`;
