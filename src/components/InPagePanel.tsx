import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';
import tw from 'twin.macro';

export default function InPagePanel() {
  function handleClose() {
    chrome.storage.local.set({ showContentPanel: false });
  }

  return (
    <StyledPanel>
      <header>
        <h1>In-page panel</h1>
        <button className="close" onClick={handleClose}>
          <MdClose />
        </button>
      </header>
      <div className="content">
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
  header,
  .content {
    ${tw`p-4 text-gray-800 dark:text-gray-100`}
  }

  header {
    ${tw`
      flex items-center
      bg-gray-300 dark:bg-gray-800
    `}
  }

  h1 {
    ${tw`text-2xl`}
  }

  p {
    ${tw`m-0`}
  }

  * + p {
    ${tw`mt-3`}
  }

  .close {
    ${tw`
      btn btn-outline btn-square btn-sm
      text-2xl ml-auto w-auto px-1!
      text-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:border-gray-600
    `}
  }
`;
