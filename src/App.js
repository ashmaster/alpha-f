import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Play from "./Screens/play/play";
import Start from "./Screens/start/start";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
