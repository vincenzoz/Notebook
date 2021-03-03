import { createContext, useEffect, useState } from "react";
import React = require("react");
import { Item } from "../../../shared/models/Item";
import NoteService from "../../services/NoteService";
import getMockedUser from '../../services/UserService';

export const NoteContext = createContext(null);

export type NoteContextType = {
    noteList: Item[],
    updateNoteList: Function
}

const { Provider } = NoteContext;
const NoteProvider = ({ children }: any) => {

    const [noteList, setNoteList] = useState<Item[]>([]);
    const username = getMockedUser()['username']
    let initNoteList: Item[] = []

    useEffect(() => {
        NoteService.retrieveNotesByUsername(username).then(res => {
            initNoteList = res.notes
            setNoteList((initNoteList != undefined) ? initNoteList : [])
        })
    }, [])

    return <Provider
        value={{
            noteList: noteList,
            updateNoteList: (newNoteList: Item[]) => {
                setNoteList(newNoteList)
            },
        }}> {children} </Provider>

}

NoteProvider.context = NoteContext;

export default NoteProvider
