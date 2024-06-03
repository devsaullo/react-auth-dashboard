export const ButtonComponent = ({ children, ...props }) => {
    return (
        <>
            <button className={"flex disabled:opacity-50 disabled:cursor-not-allowed items-center text-base justify-center gap-1 w-2/4 p-3 my-1 rounded-lg font-semibold bg-slate-800 text-slate-300 transition-all  duration-300 ease-in-out "}  {...props} >
                {children}
            </button>
        </>
    )
}

//            <input className='w-fit h-fit' type='checkbox' id='section_init'></input>
