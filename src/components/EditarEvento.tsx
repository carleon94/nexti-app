import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IEvento } from "../interfaces/IEvento";

import { Container , Row , Col , Form , FormGroup , Label , Input , Button } from "reactstrap";

const initialEvento: IEvento = {
    id: 0,
    fecha: '',
    lugar: '',
    descripcion: '',
    precio: '',
}
export function EditarEvento() {

    const {id} = useParams<{id:string}>();
    const [evento, setEvento] = useState<IEvento>(initialEvento);
    const navigate = useNavigate();

    console.log('render');
    useEffect( () => {
        console.log('use effect')
        const obtenerEvento = async () => {
            const response = await fetch(`${appsettings.apiUrl}Evento/Obtener/${id}`);
            if(response.ok){
                let data: IEvento = await response.json();
                data.fecha = new Date(data.fecha).toISOString().split('T')[0];
                setEvento(data);
            }
        }
        obtenerEvento();
    },[]);

    const inputChangeValue = ( event: ChangeEvent<HTMLInputElement> ) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setEvento({ ...evento , [inputName]: inputValue })
    }

    const volver = () => {
        navigate("/")
    }

    const guardar = async() => {
        const response = await fetch(`${appsettings.apiUrl}Evento/Editar/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(evento)
        })

        if(response.ok) {
            navigate("/")
        } else {
            Swal.fire({
                title: 'Error!!',
                text: 'No se ha podido editar el evento',
                icon: 'question'
            });
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8 , offset:2}}>
                    <h4>Editar Evento</h4>
                    <hr />

                    <Form>
                        <FormGroup>
                            <Label>Fecha</Label>
                            <Input type="date" name="fecha" onChange={inputChangeValue} value={evento.fecha}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Lugar</Label>
                            <Input type="text" name="lugar" onChange={inputChangeValue} value={evento.lugar}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Descripcion</Label>
                            <Input type="email" name="descripcion" onChange={inputChangeValue} value={evento.descripcion}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Precio</Label>
                            <Input type="text" name="precio" onChange={inputChangeValue} value={evento.precio}></Input>
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}>Editar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}