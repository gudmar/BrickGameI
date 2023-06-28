import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import BrickGame from './components/BrickGame/BrickGame';
import { CartridgeContextProvider } from './context/cartridgeProvider';
import { GameStateProvider } from './context/gameStateContext';
import { ColorSchemeProvider } from './context/colorShemeProvider';
import { MusicProvider } from './context/musicProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// new KeyReader();
root.render(
  <React.StrictMode>
    <MusicProvider>
    <CartridgeContextProvider>
      <GameStateProvider>
        <ColorSchemeProvider>
          
            <BrickGame />
          
        </ColorSchemeProvider>
      </GameStateProvider>
    </CartridgeContextProvider>
    </MusicProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
