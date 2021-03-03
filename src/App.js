import styled from "styled-components";
import Game from "./components/Game";
import HoverSquaresList from "./components/HoverSquaresList";

function App() {
  return (
    <div className="App">
      <MainContainer>
        <Game/>
        <HoverSquaresList/>
      </MainContainer>
    </div>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
  padding-top: 30px;
`
