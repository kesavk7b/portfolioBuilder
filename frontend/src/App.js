import './App.css';
import { NavBar } from './components';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { About, ComponentItemList, ComponentList, DashboardUI, RegLog } from './pages';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Test from './ref/Test';
import { PortfolioProvider } from './context/PortfolioContext';
import { ActiveContextProvider } from './context/ActiveElementContext';
import { ContextMenuPropsProvider } from './context/ContextMenuProps';
import Bookmark from './pages/Bookmark';
import ComponentEditor from './pages/ComponentEditor';
import { useContext, useEffect } from 'react';
import EditorLayout from './components/editor/EditorLayout';
import SideBar from './components/SideBar';
import NavBar1 from './components/NavBar1';
import EditorProperty from './components/editor/EditorProperty';
import { SelectContextProvider, SelectedContext } from './context/SelectedContext';
import { CommonToAllProvider } from './context/CommonToAll';

// ✅ Now inside BrowserRouter
function AppLayout() {
  const location = useLocation();
  const isEditorPage = location.pathname.startsWith("/editor");
  const componentPage = location.pathname.startsWith("/component");
  const bodyWidthHeight = componentPage ? " w-1/2 h-full ":" w-full h-full ";
  const {theme} = useContext(AuthContext)
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  },[theme]);
  return (
    <div className='h-screen flex flex-wrap'>
      {
        componentPage &&
        <div className="h-full w-1/4 bg-[var(--color-bg)] border border-[var(--color-border)] ">
          <SideBar />
        </div>
      }
      { 
        !isEditorPage && !componentPage &&
        <div className="flex w-full">
          <NavBar />
        </div>
      }
	  <SelectContextProvider>
		
		<div className={'bg-[var(--color-bg)]'+bodyWidthHeight} style={{ height: isEditorPage || componentPage ? "100vh" : "91vh", overflow: "hidden" }}>
			{
			componentPage &&
			<div className="w-full bg-[var(--color-bg)">
				<NavBar1 />
			</div>
			}
			<Routes>
			<Route path="/" element={<DashboardUI />} />
			<Route path="/about" element={<About />} />
			<Route path="/register" element={<RegLog />} />
			<Route path="/login" element={<RegLog />} />
			<Route
				path="/editor"
				element={
				<PortfolioProvider>
					<ActiveContextProvider>
					<ContextMenuPropsProvider>
						<EditorLayout />
					</ContextMenuPropsProvider>
					</ActiveContextProvider>
				</PortfolioProvider>
				}
			/>
			<Route path="/test" element={<Test />} />
			<Route path="/bookmark" element={<Bookmark />} />
			<Route path="/component" element={<ComponentList />} />
			<Route path="/component/:id" element={<ComponentItemList />} />
			<Route path="/component/editor/:id" element={<ComponentEditor />} />
			<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</div>
		{
			componentPage &&
				<div className="h-full overflow-y-hidden w-1/4 bg-[var(--color-bg)] border border-[var(--color-border)] ">
					<EditorProperty activePage={undefined} />
				</div>
				
		}
	  </SelectContextProvider>
    </div>
  );
}

function App() {
  return (
	<CommonToAllProvider>
		<AuthProvider>
			<BrowserRouter>
				<AppLayout /> 
			</BrowserRouter>
		</AuthProvider>
	</CommonToAllProvider>
  );
}

export default App;
