import tw from 'twin.macro';
import styled from '@emotion/styled';
import { cx } from '@emotion/css';
import { useEffect, useState } from 'preact/hooks';
import globalStyles from '../globalStyles';

const panelPositions = ['top', 'right', 'bottom', 'left'];
const panelPositionTypes = ['fixed', 'static', 'relative', 'absolute'];

export default function Options() {
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [positionType, setPositionType] = useState<string>('');

  useEffect(() => {
    chrome.storage.local.get(['position', 'positionType'], (result) => {
      setPosition(result.position ?? panelPositions[0]);
      setPositionType(result.positionType ?? panelPositionTypes[0]);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ position, positionType });
  }, [position, positionType]);

  return (
    <StyledOptions>
      {globalStyles}
      <div className="container">
        <header>
          <h1>Settings</h1>
        </header>
        <div className="content">
          <ul>
            <li>
              Content panel position type
              <div className="controls">
                {panelPositionTypes.map((pos) => (
                  <label className={cx({ active: positionType === pos })}>
                    <input
                      type="radio"
                      value={pos}
                      name="position-type"
                      onChange={() => setPositionType(pos)}
                    />{' '}
                    {pos}
                  </label>
                ))}
              </div>
            </li>
            <li
              className={cx({ disabled: !['fixed', 'absolute'].includes(positionType) })}
            >
              Content panel position
              <div className="controls">
                {panelPositions.map((pos) => (
                  <label className={cx({ active: position === pos })}>
                    <input
                      type="radio"
                      value={pos}
                      name="position"
                      onChange={() => setPosition(pos)}
                    />{' '}
                    {pos}
                  </label>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </StyledOptions>
  );
}

const StyledOptions = styled.div`
  ${tw`
    text-base flex items-center min-h-screen
    bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200
  `}

  .container {
    ${tw`container mx-auto shadow rounded bg-white dark:bg-gray-900`}
    min-height: 20rem;
  }

  header {
    ${tw`p-4 bg-gray-100 dark:bg-black`}
  }

  h1 {
    ${tw`text-2xl`}
  }

  li {
    ${tw`p-4 flex items-center`}
  }

  li + li {
    ${tw`border-t border-gray-200 dark:border-gray-800`}
  }

  .disabled {
    ${tw`relative opacity-20`}

    &::before {
      ${tw`absolute inset-0 opacity-50`}
      content: '';
    }
  }

  .controls {
    ${tw`ml-auto`}

    label {
      ${tw`
        py-1 px-3
        border border-solid border-gray-800 dark:border-gray-500
        leading-none inline-flex
        light:hover:bg-gray-200 dark:hover:bg-gray-800
      `}

      &.active {
        ${tw`bg-gray-800! text-white! dark:bg-gray-200! dark:text-black!`}
      }
    }

    label + label {
      ${tw`border-l-0`}
    }

    input[type='radio'] {
      ${tw`sr-only`}
    }
  }
`;
