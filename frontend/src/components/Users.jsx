import { Link, useNavigate } from "react-router-dom"

export function Users({users, onChange}){
    const navigate = useNavigate("");

    return <div className="flex flex-col text-left w-5/6 mt-2">
        <div className="text-2xl font-bold pl-2">Users</div>
        <div>
            <input onChange={onChange} className="border border-slate-500 rounded-xl w-full p-2" type="text" placeholder="search users..."></input>
        </div>
        <div className="w-full h-80 border border-slate-500/0 overflow-auto">
            {users.map(user => {
                return <div className="flex flex-row  p-2 items-center">
                    <div className="rounded-full p-2 w-10 h-10 bg-slate-300 text-center text-xl">{user.username.split('')[0].toUpperCase()}</div>
                    <div className="pl-3">{user.username}</div>
                    <div className="ml-auto m-2">
                        <button type="button" key={user._id} class="p-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            <Link to={`/transfer/${user._id}/${user.username}`}>Send Money</Link>
                        </button>
                    </div>
                </div>
            })}
        </div>
    </div>
}