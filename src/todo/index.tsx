import { useContext, useState } from "react"
import { TodoContext } from "../providers/todo.provider"
import FolderItem from "./item";
import './index.css';

const Todo = () => {
    const todoCtx = useContext(TodoContext);
    const [folder, setFolder] = useState('');

    return (
        <div>
            <div>
                {todoCtx.folders.map((f, i) => (
                    <FolderItem key={i} data={f} />
                ))}
            </div>
            <div className="flex_row justify-between" style={{ marginTop: 44 }}>
                <input value={folder} onChange={(e) => setFolder(e.target.value)}/>
                <button 
                    onClick={() => { 
                        todoCtx.addNewFolder({ name: folder });
                        setFolder('')
                    }}
                    disabled={!folder}
                    className={(!folder ? 'disabled' : '') + ' primary_button'}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default Todo