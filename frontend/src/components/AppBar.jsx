export function AppBar({label}){
    return <div className="flex flex-row justify-between w-5/6 p-1.5 border rounded-2xl text-lg border-slate-400">
        <div className="p-2 text-center ">PayTM App</div>
        <div className="flex flex-row w-max mr-2">
            <div className="p-2 text-center">Hello</div> 
            <div className="rounded-full p-2 w-10 h-10 bg-slate-300 text-center text-xl">{label.split('')[0].toUpperCase()}</div>
        </div>
    </div>
}