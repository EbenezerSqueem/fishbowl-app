import React, { createContext, useState } from "react";

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [gameRoom, setGameRoom] = useState({});
  const [isGameOwner, setIsGameOwner] = useState(false);
  const [numberOfLocalPlayers, setNumberOfLocalPlayers] = useState(1);
  const [localUsers, setLocalUsers] = useState([]);
  const [isGameRestart, setIsGameRestart] = useState(false);

  return (
    <GameContext.Provider
      value={{
        gameRoom,
        setGameRoom,
        isGameOwner,
        setIsGameOwner,
        numberOfLocalPlayers,
        setNumberOfLocalPlayers,
        localUsers,
        setLocalUsers,
        isGameRestart,
        setIsGameRestart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
