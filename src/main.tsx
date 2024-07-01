import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { HashRouter } from "react-router-dom";
import App from './App';
import './index.css'
import './App.css'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
const store = configureStore({
  reducer: rootReducer,
});

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </Provider>

  </StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
