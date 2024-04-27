import { ComponentProps } from "react"

// extende um componente nativo do html
interface NavLinkProps extends ComponentProps <'a'>{
    children: string
}

export function NavLink(props: NavLinkProps){
    return(
        <a {...props} className="font-medium text-sm">{props.children}</a>
    )
}