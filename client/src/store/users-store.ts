import { create } from "zustand";
import { UserType } from "../interfaces";
const usersGlobalStore = create((set)=>({
    currentUser:null,
    setCurrentUser:(user:UserType)=>set({currentUser:user}),
}))

export default usersGlobalStore;


export interface usersStoreType{
    currentUser:UserType|null;
    setCurrentUser:(user:UserType)=>void;
}