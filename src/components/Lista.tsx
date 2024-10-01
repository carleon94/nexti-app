import { useEffect } from "react";
import { appsettings } from "../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IEvento } from "../interfaces/IEvento";


import { Container , Row , Col , Table , Button } from "reactstrap";
import { useEventos } from "../store";

export function Lista() {

    const eventos = useEventos( state => state.list )
    const {setEventos} = useEventos();

    const obtenerEventos = async () => {
        const response = await fetch(`${appsettings.apiUrl}Evento/Lista`);
        if(response.ok){
            let data: IEvento[] = await response.json();
            data = data.map( (evento: IEvento ) => { 
                evento.fecha = new Date(evento.fecha).toISOString().split('T')[0];
                return evento;
            });
            setEventos(data);
        }
    }

    useEffect( () => {
        obtenerEventos();
    }, [])
    
    const Eliminar = (id:number) => {
        Swal.fire({
            title: "Eliminar evento",
            text: "Esta seguro de eliminar el evento?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Evento/Eliminar/${id}`, {method: 'DELETE'});
                if( response.ok ) obtenerEventos();
                Swal.fire({
                    title: "Eliminado",
                    text: "El evento ha sido eliminado",
                    icon: 'success',
                });
            }
          });
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8 , offset:2}}>
                    <h4>Lista de Eventos</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/nuevoEvento">Nuevo Evento</Link>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Lugar</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>

                                </th>
                            </tr>
                            
                        </thead>

                        <tbody>
                            {
                                eventos.map( (evento: IEvento) => {
                                    return (
                                        <tr key={evento.id}>
                                            <td>{evento.fecha}</td>
                                            <td>{evento.lugar}</td>
                                            <td>{evento.descripcion}</td>
                                            <td>{evento.precio}</td>
                                            <td>
                                            <Link className="btn btn-primary me-2" to={`/editarEvento/${evento.id}`}>Editar</Link>
                                            <Button color="danger" onClick={() => {Eliminar(evento.id!)} }>Eliminar</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}