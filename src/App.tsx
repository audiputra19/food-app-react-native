import React, { FC } from 'react'
import Application from './navigators/Application'
import { ThemeProvider } from './hooks/themeContext'
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Application/>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App