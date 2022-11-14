import { PropsWithChildren, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ChatBox from './layout/chat';
import Navbar from './layout/navbar';
import RoutesApp from './Routes';
import { store } from './stores';
import SocketProvider from './utils/socket';

function AppWithProviders({
  children
}: PropsWithChildren) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

function App() {
  const [marginTop, setMarginTop] = useState<number>(0)
  
  useEffect(() => {
    const navbar = document.querySelector('.c-navbar')
    if (navbar) setMarginTop(navbar.clientHeight)
  }, [])

  return (
    <AppWithProviders>
      <BrowserRouter>
        <SocketProvider/>
        <Navbar />
        <ChatBox/>
        <div style={{ marginTop: `${marginTop}px` }} />
        <RoutesApp />
      </BrowserRouter>
    </AppWithProviders>
  );
}

export default App;
