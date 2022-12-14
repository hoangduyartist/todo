import { createContext, ReactNode, useEffect, useState } from "react";
import { Folder } from "../types/Folder.type";

interface DataValue {
    folders: Array<Folder>;
    addNewFolder(data: Folder, parentId?: number): void;
    deleteFolder(id: number, parentId?: number): void;
    updateFolder(id: number, data: any, parentId?: number): void;
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
            // console.log('DID MOUNT')
            const foldersLocal = localStorage.getItem('folders');
            setFolders(JSON.parse(foldersLocal || '[]'))
        }
    }, [])

    useEffect(() => {
        if (localStorage) {
            // console.log('SET LOCAL')
            localStorage.setItem('folders', JSON.stringify(folders || '[]'))
        }
    }, [folders])

    const addNewFolder = (data: Folder, parentId?: number) => {
        const curFolders = [...folders];
        if (parentId) {
            const updatedIdx = curFolders.findIndex(i => i.id === parentId);
            const childId = Date.now();
            const curChildren = curFolders[updatedIdx]['children'] ? {...curFolders[updatedIdx]['children']} : {};
            curChildren[childId] = { ...data, id: childId };
            curFolders[updatedIdx]['children'] = { ...curChildren };
            setFolders(curFolders)
            return
        }
        curFolders.push({
            name: data.name,
            id: Date.now()
        });
        setFolders(curFolders)
    }
    const deleteFolder = (id: number, parentId?: number) => {
        let curFolders = [...folders];
        if (parentId) {
            const updatedIdx = curFolders.findIndex(i => i.id === parentId);
            curFolders[updatedIdx]['children'][id] = undefined;
            setFolders(curFolders);
            return
        }
        
        curFolders = curFolders.filter(item => item.id !== id);
        setFolders(curFolders)
    }
    const updateFolder = (id: number, data: any, parentId?: number) => {
        let curFolders = [...folders];
        if (parentId) {
            const updatedIdx = curFolders.findIndex(i => i.id === parentId);
            curFolders[updatedIdx]['children'][id] = { ...curFolders[updatedIdx]['children'][id], ...data };
            setFolders(curFolders);
            return
        }
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