import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'>{
    transparent?: boolean
}

export function IconButton({transparent, ...props}: IconButtonProps){
    return (
        <button 
        {...props} 
        className={
            transparent ?
                "bg-black/20 border border-white/20 rounded-md px-1 w-6"
                :
                "bg-white/10 border border-white/20 rounded-md px-1 w-20"
        }>
            {props.children}
        </button>
    )
}