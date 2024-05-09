export function InputBox({label, placeholder, type, onChange}){
    return <div className="pb-3 px-4">
        <div class=" font-bold text-md">
            {label}
        </div>
        <input onChange={onChange} className="rounded-md border border-slate-500/50 p-1 " type={type} placeholder={placeholder}></input>
    </div>
}