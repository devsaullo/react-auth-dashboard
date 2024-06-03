export const LabelComponent = ({ children, ...props }) => {
    return (
        <>
            <label className={"font-bold text-sm text-slate-300"}  {...props}>
                {children}
            </label>
        </>

    )
}