"use client";
import { useState, createContext} from "react";
type SearchContextProviderProps = {
  children: React.ReactNode;
};
type TSearchContext = {
  searchQuery:string;
  handleChangeSearchQuery:(newValue:string)=>void;

};
export const SearchContext = createContext<TSearchContext | null>(null);
export default function SearchContextProvider({
  children,
  
}: SearchContextProviderProps) {
  // state
  const [searchQuery,setSearchQuery]=useState("");
 
// Derived State
      
// event handlers/actions
const handleChangeSearchQuery = (newValue:string)=>{
  setSearchQuery(newValue);
};
  
  
  return ( 
    <SearchContext.Provider
      value={{
      searchQuery,
      handleChangeSearchQuery,
      }}>
    </SearchContext.Provider> 
  );
}
