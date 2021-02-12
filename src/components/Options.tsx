import tw from 'twin.macro';
import styled from '@emotion/styled';

export default function Options() {
  return (
    <StyledOptions>
      <h1>Options</h1>
    </StyledOptions>
  );
}

const StyledOptions = styled.div`
  ${tw`text-lg text-gray-500`}
`;
