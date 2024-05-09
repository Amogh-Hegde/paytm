export function To({to}){
    return <div className="flex flex-row w-full justify-start m-2 pl-2 items-center pt-2 mt-20">
        <div className="rounded-full p-2 w-10 h-10 bg-green-500 text-white text-center text-xl">{to.split('')[0].toUpperCase()}</div>
        <div className="pl-2 text-xl font-medium">{to}</div>
    </div>
}