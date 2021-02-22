import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import tw from 'twin.macro';

export default function InPagePanel() {
  function handleClose() {
    chrome.storage.local.set({ showContentPanel: false });
  }

  return (
    <StyledPanel>
      <header tw="p-4 flex items-center bg-gray-300 dark:bg-gray-800">
        <h1 tw="text-2xl">In-page panel</h1>
        <button tw="ml-auto text-2xl" onClick={handleClose}>
          <MdClose />
        </button>
      </header>
      <div tw="p-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur
          dicta dolores ducimus explicabo laboriosam, molestias omnis optio perferendis,
          quasi qui sunt totam! Eos ipsa iste modi mollitia? Aut, excepturi.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consectetur
          dicta dolores ducimus explicabo laboriosam, molestias omnis optio perferendis,
          quasi qui sunt totam! Eos ipsa iste modi mollitia? Aut, excepturi.
        </p>
      </div>
    </StyledPanel>
  );
}

const StyledPanel = styled.div`
  ${tw`text-gray-800 dark:text-gray-100`}

  p {
    ${tw`m-0`}
  }

  * + p {
    ${tw`mt-3`}
  }
`;
