import React, { Component } from 'react'
import axios from 'axios'
import Global from './../Global';


export default class TablaDoctores extends Component {
    selectEspecialidadRef = React.createRef();
    incrementarRef = React.createRef();


    state = {
        especialidades: [],
        statusEsp: false,
        statusUpdate: false,
        doctores: [],
        statusDoc: false

    }
    loadEspecialidades = () => {
        var request = "/api/Doctores/Especialidades";
        var url = Global.urlDoctores + request;
        axios.get(url).then(res => {
            this.setState({
                especialidades: res.data,
                statusEsp: true
            });
        });
    }

    loadDoctores = (e) => {
        //MUESTRA LA TABLA
       e.preventDefault();
        var especialidad = this.selectEspecialidadRef.current.value;
        var request = "/api/Doctores/DoctoresEspecialidad/"+ especialidad ;
        var url = Global.urlDoctores + request;
        
        axios.get(url).then(res => {
            this.setState({
                doctores: res.data,
                statusDoc: true
            })
        })

        //INCREMENTO 
        var especialidad1 = this.selectEspecialidadRef.current.value;
        var salario1 = parseInt(this.incrementarRef.current.value);        
        var url1 = Global.urlDoctores+"/api/Doctores/"  + especialidad1 + "/" + salario1      
        axios.put(url1).then(res => {
            this.setState({
                statusUpdate: true,
                mensaje: especialidad1 +" incrementando "+ salario1
            })
        })
    }

    
    componentDidMount = () => {
        this.loadEspecialidades();
        
    }

    render() {
        return (
            <div>
                <h1>Incremento salarial doctores</h1>
                <form>
                    <label>Seleccione una especialidad: </label>
                    <select ref={this.selectEspecialidadRef}>
                        {this.state.statusEsp == true &&
                            this.state.especialidades.map((esp, index) => {
                                return (<option key={index}>
                                    {esp}
                                </option>)
                            })
                        }
                    </select>
                    <br />
                    <label>Incremento salarial</label>
                    <input type="number" ref={this.incrementarRef} />
                    <br />
                    
                    <button className='btn btn-info' onClick ={this.loadDoctores}>
                        Incrementar salarios
                    </button>
                </form>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            this.state.statusDoc == true &&
                            (
                                this.state.doctores.map((doctores, index) => {
                                    return (<tr key={doctores.idDoctor}>
                                        <td>{doctores.apellido}</td>
                                        <td>{doctores.especialidad}</td>
                                        <td>{doctores.salario}</td>
                                    </tr>);
                                })
                            )
                        }
                    </tbody>
                </table>

                {
                    this.state.statusUpdate &&
                    <h2 style={{ color: "blue" }}>{this.state.mensaje}</h2>
                }
            </div>
        )
    }
}
