import './App.css';
import { Editor, NavBar} from './components';
import { AuthProvider } from './context/AuthContext';
import { About, DashboardUI, RegLog,} from './pages';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from './ref/Test';
import { PortfolioProvider } from './context/PortfolioContext';
import { ActiveContextProvider } from './context/ActiveElementContext';
import { ContextMenuPropsProvider } from './context/ContextMenuProps';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <div style = {{height:"91vh"}}>
              <Routes>
                <Route path="/" element={<DashboardUI />} />
                <Route path="about" element={<About />} />
                <Route path="register" element={<RegLog />} />
                <Route path="login" element={<RegLog />} />
                <Route path="editor" element={
                  <PortfolioProvider>
                    <ActiveContextProvider>
                      <ContextMenuPropsProvider>
                        <Editor />
                      </ContextMenuPropsProvider>
                    </ActiveContextProvider>
                  </PortfolioProvider>
                  } />
                <Route path="test" element={<Test />} />
              </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
