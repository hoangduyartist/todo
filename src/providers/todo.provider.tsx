import { createContext, ReactNode, useEffect, useState } from "react";
import { Folder } from "../types/Folder.type";

interface DataValue {
    folders: Array<Folder>;
    addNewFolder(data: Folder): void;
    deleteFolder(id: number): void;
    updateFolder(id: number, data: any): void;
}
const initialValues: DataValue = {
    folders: [],
    addNewFolder: (data: Folder) => {},
    deleteFolder: (id: number) => {},
    updateFolder: (id: number, data: any) => {},
}

const TodoContext = createContext(initialValues);

const TodoProvider = ({ children }: { children: ReactNode }) => {
    const foldersLocalRaw = localStorage.getItem('folders');
    const [folders, setFolders] = useState<Array<Folder>>(JSON.parse(foldersLocalRaw || '[]'));

    useEffect(() => {
        if (localStorage) {
            console.log('DID MOUNT')
            const foldersLocal = localStorage.getItem('folders');
            setFolders(JSON.parse(foldersLocal || '[]'))
        }
    }, [])

    useEffect(() => {
        if (localStorage) {
            console.log('SET LOCAL')
            localStorage.setItem('folders', JSON.stringify(folders || '[]'))
        }
    }, [folders])

    const addNewFolder = (data: Folder) => {
        const curFolders = [...folders];
        curFolders.push({
            name: data.name,
            id: Date.now()
        });
        setFolders(curFolders)
    }
    const deleteFolder = (id: number) => {
        let curFolders = [...folders];
        curFolders = curFolders.filter(item => item.id !== id);
        setFolders(curFolders)
    }
    const updateFolder = (id: number, data: any) => {
        let curFolders = [...folders];
        const updatedIdx = curFolders.findIndex(i => i.id === id);
        curFolders[updatedIdx] = {...curFolders[updatedIdx], ...data};
        setFolders(curFolders)
    }

    return (
        <TodoContext.Provider 
            value={{
                folders,
                addNewFolder,
                deleteFolder,
                updateFolder
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export {
    TodoProvider,
    TodoContext
}