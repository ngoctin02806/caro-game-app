import React, { useContext, useState } from "react";

export const HistoryCtx = React.createContext();

export const HistoryProvider = (props) => {
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <HistoryCtx.Provider value={{ openHistory, setOpenHistory }}>
      {props.children}
    </HistoryCtx.Provider>
  );
};

export const useHistoryModal = () => useContext(HistoryCtx);
