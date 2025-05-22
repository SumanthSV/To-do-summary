import React,{useState,useCallback } from 'react';
import {SummarizeTodos} from './Summarizer.jsx';
import _ from 'lodash';

const My_components=()=>{

    const[tasks,setTask]=useState([]);
    const[newTask,setNewTask]=useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);


    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function handleAddTask(){
        if(newTask.trim()!==""){
            setTask(t=>[...t,newTask]);
            setNewTask("");
        } 
    }
    
    function handleKeyPress(event){
        if(event.key ==='Enter'){
            handleAddTask();
        }
    }
    function handleEditTask(index) {
        setEditingIndex(index);
        setEditedText(tasks[index]);
    }

    function handleEditChange(event) {
        setEditedText(event.target.value);
    }

    function handleEditSave(index) {
        if (editedText.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[index] = editedText;
            setTask(updatedTasks);
        }
        setEditingIndex(null);
        setEditedText("");
    }


    function handleDeleteTask(index){
        const updatedTasks = tasks.filter((_,i)=>i!==index);
        setTask(updatedTasks);
    }

    function handleMoveUp(index){
        if(index>0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setTask(updatedTasks);
        }
    }

    function handleMoveDown(index){
        if(index<tasks.length -1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
            setTask(updatedTasks);
        }
    }

    const handleSummarizer = async () => {
        setLoading(true);
        try {
            const result = await SummarizeTodos(tasks);
            setSummary(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };



    return(
        <div className='to-do-list'>
            <h1>Prioritize your Work</h1>

            <input type="text" value={newTask} placeholder='Enter your task....' onChange={(event)=>handleInputChange(event)} onKeyDown={handleKeyPress}/>
            <button onClick={handleAddTask} className='add-button'>Add</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                    <span className='text'>
                        {editingIndex === index ? (
                        <input
                            type="text"
                            value={editedText}
                            onChange={handleEditChange}
                            onBlur={() => handleEditSave(index)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditSave(index);
                            }}
                            autoFocus
                        />
                        ) : (
                        task
                        )}
                    </span>
                    <span className='buttons'>
                        <button onClick={() => handleEditTask(index)} className='edit-button'>Edit</button>
                        <button onClick={() => handleDeleteTask(index)} className='delete-button'>Delete</button>
                        <button onClick={() => handleMoveUp(index)} className='move-button'>👆</button>
                        <button onClick={() => handleMoveDown(index)} className='down-button'>👇</button>
                    </span>
                    </li>
                ))}
            </ul>

            <button onClick={handleSummarizer}disabled={loading} className='Summarize'>{loading ? "Summarizing..." : "Summarize"}</button>
            {summary && (
                <div style={{colour:"white"}}>
                    <h3>Summary</h3>
                    <p >{summary}</p>
                </div>
            )}

        </div>
    );
}


export default My_components;