import TitleOne from "./components/TitleOne";
import TitleTwo from "./components/TitleTwo";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Styles
import styled from "styled-components";
import FontFaceObserver from "fontfaceobserver";

const Container = styled.div`
  a {
    display: none;
  }
`;
const Button = styled.button`
  display: none;
  position: absolute;
  bottom: 30px;
  left: 30px;
  border: 1px solid white;
  padding: 10px;
  cursor: pointer;
`;

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  var font = new FontFaceObserver("balboa-extra-condensed");

  font.load().then(function () {
    setFontsLoaded(true);
  });
  const [restart, setRestart] = useState(true);

  const handleRestart = () => {
    setRestart(false);
    setTimeout(() => {
      setRestart(true);
    }, 1);
  };

  return (
    fontsLoaded && (
      <Container className="App">
        <Button onClick={handleRestart}>Restart animation</Button>
        <Link to="title-1">Title one</Link>
        <Link to="title-2">Title two</Link>
        <Routes>
          <Route path="title-1" element={<TitleOne />} />
          <Route path="title-2" element={<TitleTwo />} />
        </Routes>
      </Container>
    )
  );
}

export default App;
