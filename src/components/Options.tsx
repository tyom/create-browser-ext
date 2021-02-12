import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { cx } from '@emotion/css';
import { useState } from 'preact/hooks';

const globalCss = css`
  body {
    ${tw`bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200`}
  }
`;

const panelPositions = ['top', 'right', 'bottom', 'left'];

export default function Options() {
  const [position, setPosition] = useState(panelPositions[0]);

  return (
    <StyledOptions>
      <Global styles={globalCss} />
      <div className="container">
        <header>
          <h1>Settings</h1>
        </header>
        <div className="content">
          <ul>
            <li>
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
  ${tw`text-base flex items-center min-h-screen`}

  .container {
    ${tw`container mx-auto shadow rounded bg-white dark:bg-gray-900`}
    min-height: 20rem;
  }

  header {
    ${tw`p-4 bg-gray-100 dark:bg-black`}
  }

  h1 {
    ${tw`text-2xl m-0`}
  }

  ul {
    ${tw`p-0 m-0 list-none`}
  }

  li {
    ${tw`p-4 flex items-center`}
  }

  li + li {
    ${tw`border-0 border-t border-solid border-gray-200 dark:border-gray-800`}
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
