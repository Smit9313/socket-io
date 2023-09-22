import { useEffect, useState } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isPost, setIsPost] = useState(true);
    const [task, setTask] = useState("");

    async function getData() {
        try {
            const data = await axios("http://localhost:8989/task");
            // console.log(data.data.tasks);
            setTasks(data.data.tasks);
        } catch (err) {
            console.log(err);
            setTasks([]);
        }
    }

    useEffect(() => {
        getData();
        const socket = openSocket("http://localhost:8989");
        socket.on("tasks", (data) => {
            if (data.action == "create") {
                setTasks((prev) => [...prev, data.task]);
            } else if (data.action == "delete") {
                getData();
            } else {
            }
        });
        return;
    }, []);

    const handleToggle = () => {
        setIsPost(false); //toggles the state of ispost to true or false
    };

    const handleDelete = (id) => {
        const res = axios.delete(`http://localhost:8989/task/delete/${id}`);
        console.log(res);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task) {
            return;
        }

        const res = await axios.post("http://localhost:8989/task/add", { task });
        if (res.status == 201) {
            setTask("");
            setIsPost(true);
        }
    };

    return (
        <>
            <div className="header__main">
                <div className="header__sub">
                    <h1 id="titulo">My Task</h1>
                </div>
                <div className="header__sub">
                    <button onClick={handleToggle} id="contact-submit">
                        add new task
                    </button>
                </div>
            </div>
            <br />
            <hr />
            <br />

            {isPost ? (
                <>
                    <ul>
                        {tasks &&
                            tasks.map((val, index) => (
                                <li key={val._id} onClick={() => handleDelete(val._id)}>
                                    <h2>Task #{index + 1}</h2>
                                    <p>{val.task}</p>
                                </li>
                            ))}
                    </ul>
                </>
            ) : (
                <>
                    <div className="container">
                        <form id="contact" onSubmit={handleSubmit}>
                            <h3>Add New Task</h3>
                            {/* <h4>Contact us for custom quote</h4> */}
                            <fieldset>
                                <input placeholder="Your task" onChange={(e) => setTask(e.target.value)} type="text" autoFocus />
                            </fieldset>
                            <fieldset>
                                <button name="submit" type="submit" style={{ width: "100%" }}>
                                    Submit
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}

export default App;
