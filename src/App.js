import {BrowserRouter, Routes, Route} from "react-router-dom";
import ClientRoute from "./route/ClientRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ClientRoute/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
