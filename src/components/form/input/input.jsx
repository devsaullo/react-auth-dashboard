export const InputComponent = ({ children, classPName, ...props }) => {
    return (
        <>
            <input className={`border-slate-600 border-opacity-50 !text-slate-100 border-2 px-3 placeholder:font-medium placeholder:text-sm disabled:bg-opacity-30 disabled:cursor-not-allowed  focus:outline-none bg-gray-800 rounded-lg w-full h-10 transition-colors duration-300 ease-in-out ${classPName}`} {...props}/>
        </>
    )
}