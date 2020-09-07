import styled from 'styled-components';

const StyledProgress = styled.div`
  position: absolute;
  height: 100%;
  ${({ width }) => `width: ${width}%;`}
  background-color: green;
  opacity: 0.25;
`;

export default StyledProgress;
