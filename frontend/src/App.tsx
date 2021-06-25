import styled from "styled-components";
import Join from "./components/Join/Join";

function App() {
  return (
    <Wrapper>
      <Join />
    </Wrapper>
  );
}

export default App;
const Wrapper = styled.div`
  background: #000;
  height: 100vh;
`;
