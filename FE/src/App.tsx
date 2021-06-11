import GlobalStyle from "config/GlobalStyle";
import Root from "components/Root";
import { RecoilRoot } from "recoil";

const App = () => (
  <>
    <RecoilRoot>
      <Root />
      <GlobalStyle />
    </RecoilRoot>
  </>
);

export default App;
