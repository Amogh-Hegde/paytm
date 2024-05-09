export function Amount({onChange}){
    return <div className="flex flex-col items-start w-full py-2">
        <div class=" font-normal pl-2 text-md pb-2">
            Amount (in Rs)
        </div>
        <input onChange={onChange} className="rounded-md w-full border border-slate-500/50 px-3 py-2" type="number" placeholder="Enter Amount"></input>
    </div>
}