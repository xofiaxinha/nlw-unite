import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'>{}
interface TableHeaderProps extends ComponentProps<'th'>{}
interface TableCellProps extends ComponentProps<'td'>{}
interface TableRowProps extends ComponentProps<'tr'>{}

export function Table(props: TableProps){
    return(
        <div className="border border-white/20 rounded-lg">
            <table className="w-full" {...props}/>
        </div>
    );
}
export function TableHeader(props: TableHeaderProps){
    return(
        <th className="py-3 px-4 text-sm font-semibold text-left" {...props}/>
    );
}
export function TableCell(props: TableCellProps){
    let classN = "py-3 px-4 text-sm text-zinc-300" + (props.className ? props.className : "")
    return(
        <td {...props} className={classN}/>
    );
}
export function TableRow(props: TableRowProps){
    return (
        <tr className="border-b border-white/10 hover:bg-white/5" {...props} />
      );
}