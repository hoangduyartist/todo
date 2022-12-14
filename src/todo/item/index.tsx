import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faFolderPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Folder } from "../../types/Folder.type";
import './item.css'
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../providers/todo.provider";
import ConfirmModal from "../../modal/confirm.modal";

interface FolderItemProps {
    data: Folder,
    parentId?: number
}

const FolderItem = (props: FolderItemProps) => {
    const todoCtx = useContext(TodoContext);
    const { name, id, children } = props.data;
    const [edit, setEdit] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [expand, setExpand] = useState(true);

    useEffect(() => {
        if (edit) {
            setFolderName(name)
        }
    }, [edit])

    // console.log('parent', props.parentId)

    return (
        <div>
            <div className="folder" onClick={() => setExpand(!expand)}>
                {edit ? (
                    <input value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
                ) : (
                    <p>{name || id}</p>
                )}

                <div onClick={(e) => e.stopPropagation()}>
                    {!props.parentId && (
                        <FontAwesomeIcon icon={faFolderPlus} width={40} onClick={() => todoCtx.addNewFolder({ name: name + '-child' }, id)}/>
                    )}

                    {edit ? (
                        <FontAwesomeIcon 
                            icon={faCheck} width={40} 
                            onClick={() => {
                                todoCtx.updateFolder(id || 0, { name: folderName }, props.parentId);
                                setEdit(false);
                            }}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faPen} width={40} onClick={() => setEdit(true)}/>
                    )}

                    <FontAwesomeIcon icon={faTrashCan} width={40} onClick={() => setConfirm(true)}/>
                </div>
            </div>
            <div style={{ paddingLeft: 24 }}>
                {expand && Object.values(children || {}).filter(it => it).map((c: any, i: number) => (
                    <FolderItem key={i} data={c} parentId={id}/>
                ))}
            </div>
            <ConfirmModal isOpen={confirm} onClose={() => setConfirm(false)} onSubmit={() => todoCtx.deleteFolder(id || 0, props.parentId)}/>
        </div>
    )
}

export default FolderItem;