import { useState } from "react"

export default function Home() {
    //username初始值為Kelvin
    const [username, setUsername] = useState('Kelvin')
    const handleChangeUser = () => {
        setUsername('Tony')
        console.log(username)
    }

    return (
        <div>
            <div className='flex justify-center'>
                <h1>Home</h1>
            </div>
            <div className='flex justify-center'>
                <h2>Hi! {username}</h2>
            </div>
            <div className='flex justify-center'>
                <button onClick={handleChangeUser}>Change User</button>
            </div>
        </div>
    );
}