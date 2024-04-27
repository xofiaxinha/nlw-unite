import { ChangeEvent, useEffect, useState } from 'react'
import search from '../assets/icons8-search.svg'
import { IconButton } from './icon-button'
import { Table, TableCell, TableHeader, TableRow } from './table-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

export function AttendeeList(){
    //Estado: valor que é sempre assistido e que altera em tempo real
    const [valorImput, buscaInput] = useState(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has('search')){
            return url.searchParams.get('search') ?? ""
        }
        return ""
    
    })
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has('page')){
            return Number(url.searchParams.get('page'))
        }
        return 1
    })
    const [attendees, setAtendees] = useState<Attendee[]>([])
    const [total, setTotal] = useState(0)
    const totalPaginas = Math.ceil(total / 10)
    useEffect(() => {
        const url = new URL(`http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees`)
        url.searchParams.set('pageIndex', String(page - 1))
        url.searchParams.set('query', valorImput)

        fetch(url)
        .then((response) => response.json())
        .then(data=>{
            setAtendees(data.attendees)
            setTotal(data.total)
        })
    }, [page, valorImput])
    
    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){  
        setCurrentSearch(event.target.value)
        setPage(1)
    }
    function setCurrentPage(page: number){
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, '', url.toString())
        setPage(page)
    }
    function goToNextPage(){
        //setPage((page + 1))
        setCurrentPage(page + 1)
    }
    function goToPreviousPage(){
        //setPage((page - 1))
        setCurrentPage(page - 1)
    }
    function setCurrentSearch(search: string){
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search)
        window.history.pushState({}, '', url.toString())
        buscaInput(search)
    }

    return (
        <div>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-small flex items-center gap-3">
                    <img src={search} alt=""className="invert size-4"/>
                    <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none text-emerald-200" placeholder="Buscar participante" />
                </div>
            </div>

            <Table>
                <thead >
                    <TableRow>
                        <TableHeader style={{width: 48}}><input type="checkbox" name="" id="" /></TableHeader>
                        <TableHeader >Código</TableHeader>
                        <TableHeader >Participante</TableHeader>
                        <TableHeader >Data de inscrição</TableHeader>
                        <TableHeader >Check-in</TableHeader>
                        <TableHeader ></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id} className="hover:bg-white/10">
                                <TableCell>
                                    <input type="checkbox" name="" id=""/>
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-zinc-50 font-semibold">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{attendee.checkedInAt === null ? "Não fez check-in" : dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        ...
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <TableRow>
                        <TableCell className="text-left" colSpan={3}>Mostrando {attendees.length} de {total}</TableCell>
                        <TableCell className="text-right justify-end" colSpan={3}>
                            <div className='flex flex-row gap-3'>
                                <span>Página {page} de {totalPaginas}</span>
                                <div className='flex flex-row gap-3'>
                                    <IconButton onClick={goToPreviousPage} disabled={page==1}>Anterior</IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page==totalPaginas}>Próximo</IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </tfoot>
            </Table>
        </div>
    )
}