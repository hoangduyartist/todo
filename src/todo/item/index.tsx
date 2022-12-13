import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faFolderPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Folder } from "../../types/Folder.type";
import './item.css'
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../providers/todo.provider";
import ConfirmModal from "../../modal/confirm.modal";

interface FolderItemProps {
    data: Folder 
}

const FolderItem = (props: FolderItemProps) => {
    const todoCtx = useContext(TodoContext);
    const { name, id } = props.data;
    const [edit, setEdit] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (edit) {
            setFolderName(name)
        }
    }, [edit])

    return (
        <div className="folder">
            {edit ? (
                <input value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
            ) : (
                <p>{name || id}</p>
            )}

            <div>
                <FontAwesomeIcon icon={faFolderPlus} width={40} onClick={() => {}}/>
                {edit ? (
                    <FontAwesomeIcon 
                        icon={faCheck} width={40} 
                        onClick={() => {
                            todoCtx.updateFolder(id || 0, { name: folderName });
                            setEdit(false);
                        }}
                    />
                ) : (
                    <FontAwesomeIcon icon={faPen} width={40} onClick={() => setEdit(true)}/>
                )}
                
                <FontAwesomeIcon icon={faTrashCan} width={40} onClick={() => setConfirm(true)}/>
            </div>

            <ConfirmModal isOpen={confirm} onClose={() => setConfirm(false)} onSubmit={() => todoCtx.deleteFolder(id || 0)}/>
        </div>
    )
}

export default FolderItem;