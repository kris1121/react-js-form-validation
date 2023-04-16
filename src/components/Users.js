import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivarate";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effRan = useRef(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
            
        if (effRan.current === true) {


            const getUsers = async () => {
                try {
                    const response = await axiosPrivate.get("/users", {
                        signal: controller.signal
                    })
                    console.log(response.data);
                    isMounted && setUsers(response.data);
                } catch (error) {
                    console.error(error);
                    navigate("/login", { state: { from: location }, replace: true });
                }
            }
    
            getUsers();

        }
    
            return () => {
                isMounted = false;
                controller.abort();
                effRan.current = true;
            }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    )
}

export default Users
