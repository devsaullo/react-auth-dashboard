export const ButtonComponent = ({ children, ...props }) => {
    return (
        <>
            <button className={`flex disabled:opacity-50 disabled:cursor-not-allowed items-center text-base justify-center gap-1 w-full md:w-3/5 lg:w-2/5 xl:w-1/4 p-3 my-1 rounded-lg font-semibold bg-slate-800 text-slate-300 transition-opacity duration-300 ease-in-out  `}  {...props} >
                {children}
            </button>
        </>
    )
}