'use client'
import React, { useState } from 'react';

interface SearchContextProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const initialSearchText = '';

export const SearchContext = React.createContext<SearchContextProps>({
  searchText: initialSearchText,
  setSearchText: () => {}
});


export default function SearchContextProvider  ({ children }:{ children :React.ReactNode})  {
    const [searchText, setSearchText] = useState<string>(initialSearchText);
  
    return (
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        {children}
      </SearchContext.Provider>
    );
  };