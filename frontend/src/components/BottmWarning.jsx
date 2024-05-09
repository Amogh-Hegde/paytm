import { Link } from "react-router-dom";

export function BottomWarning({label,to, label1}){
    return <div class="flex flex-row text-slate-600 text-sm font-medium pb-2">
        {label} <Link to={to}><p className="underline">{label1}</p></Link>
    </div>
}