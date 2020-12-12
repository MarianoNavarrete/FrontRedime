import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Select, MenuItem} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
const baseUrl = "http://127.0.0.1:8000/api/materials";
const baseUrl2 = "http://127.0.0.1:8000/api/categoria";
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor : theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding:theme.spacing(2,4,3),
    top: '50%',
    left: '50%',
    transform:'translate(-50%, -50%)'
  },
  iconos:{
    cursor:'pointer'
  },
  inputMaterial:{
    width: '100%'
  }
}))
function App() {
  const styles = useStyles();
  //hooks
  const[data, setData] = useState([]);
  const[modalInsertar, setModalInsertar] = useState(false);
  const[modalEditar, setModalEditar] = useState(false);
  const[modalEliminar, setModalEliminar] = useState(false);
  const[modalCategoria, setModalCategoria] = useState(false);
  const [materialSeleccionado, SetMaterialSeleccionado]=useState({
    estado: '',
    nombre:'',
    descripcion:'',
    stock_minimo:'',
    categoria_id:''
  })
  const [categoriaSeleccionada, setCategoriaSeleccionada]=useState({
    estado: '',
    nombre:'',
  })
  //handle change
  const handleChange = e => {
    const{name, value}=e.target
    SetMaterialSeleccionado(prevState=>({
      ...prevState,
      [name]:value
    }))
    console.log(materialSeleccionado)
  }

  const handleChangeCategoria = e =>{
    const{name, value}=e.target
    setCategoriaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
    console.log(categoriaSeleccionada) 
  }

  const seleccionarMaterial =(materialSeleccionado, caso) =>{
    SetMaterialSeleccionado(materialSeleccionado);
    (caso==='Editar')?abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  }
  //peticiones
  const peticionCategoria = async() => {
    await axios.post(baseUrl2, categoriaSeleccionada)
    .then( response=>{
      
      abrirCerrarModalCategoria()
    }
    )
  }
  const peticionGet=async()=>{
    axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }
  const peticionDelete=async()=>{
    await axios.delete(baseUrl, materialSeleccionado).
    then(response=> {
      setData(data.filter(material=> material.id!== materialSeleccionado.id));
      abrirCerrarModalEliminar()
    })
  }

  const peticionPost = async() => {
    await axios.post(baseUrl, materialSeleccionado)
    .then( response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    }
    )
    
  }

  const peticionPut = async()=>{
    await axios.put(baseUrl, materialSeleccionado)
    .then(response=>{
      var dataNueva = data
      dataNueva.map(material => {
        if(materialSeleccionado.id === material.id){
          material.nombre=materialSeleccionado.nombre;
          material.estado=materialSeleccionado.estado;
          material.descripcion = materialSeleccionado.descripcion;
          material.stock_minimo = materialSeleccionado.stock_minimo;
          material.categoria_id=materialSeleccionado.categoria_id;
        }
      })
      setData(dataNueva)
      abrirCerrarModalEditar()
    })
  }
  // abrir cerrar los modales
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  const abrirCerrarModalCategoria=()=>{
    setModalCategoria(!modalCategoria);
  }
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }  
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  useEffect(async()=>{
    await peticionGet();
  },[])
  //body de los modales
  const bodyInsertar =(
    <div className={styles.modal}>
      <h3>Crear Material</h3>
      <TextField className={styles.inputMaterial} name="estado" label="estado" onChange={handleChange}/>
      <br/>
      <TextField className={styles.inputMaterial} name="nombre" label="nombre" onChange={handleChange}/>
      <br/>
      <TextField className={styles.inputMaterial} name="descripcion" label="descripcion" onChange={handleChange}/>
      <br/>
      <TextField className={styles.inputMaterial} name="stock_minimo"label="stock_minimo" onChange={handleChange}/>
      <br/>
      <TextField className={styles.inputMaterial} name="categoria_id" label="categoria_id" onChange={handleChange}/>
      <br/><br/>
      <div align='right'>
        <Button color='primary' onClick={()=>peticionPost()}>Guardar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div> 
    </div>
  )
  const bodyCategoria =(
    <div className={styles.modal}>
      <h3>Crear Categoria</h3>
      <TextField className={styles.inputMaterial} name="estado" label="estado" onChange={()=>handleChangeCategoria()}/>
      <br/>
      <TextField className={styles.inputMaterial} name="nombre" label="nombre" onChange={()=>handleChangeCategoria()}/>
      
      <br/><br/>
      <div align='right'>
        <Button color='primary' onClick={()=>peticionCategoria()}>Guardar</Button>
        <Button onClick={()=>abrirCerrarModalCategoria()}>Cancelar</Button>
      </div> 
    </div>
  )
  const bodyEditar =(
    <div className={styles.modal}>
      <h3>Editar Material</h3>
      <TextField className={styles.inputMaterial} name="estado" label="estado" onChange={handleChange} value = {materialSeleccionado && materialSeleccionado.estado} />
      <br/> 
      <TextField className={styles.inputMaterial} name="nombre" label="nombre" onChange={handleChange}value = {materialSeleccionado && materialSeleccionado.nombre}/>
      <br/>
      <TextField className={styles.inputMaterial} name="descripcion" label="descripcion" onChange={handleChange} value = {materialSeleccionado && materialSeleccionado.descripcion}/>
      <br/>
      <TextField className={styles.inputMaterial} name="stock_minimo"label="stock_minimo" onChange={handleChange} value = {materialSeleccionado && materialSeleccionado.stock_minimo}/>
      <br/>
      <TextField className={styles.inputMaterial} name="categoria_id" label="categoria_id" onChange={handleChange} value = {materialSeleccionado && materialSeleccionado.categoria_id}/>
      <br/><br/>
      <div align='right'>
        <Button color='primary' onClick={()=>peticionPut()}>Guardar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div> 
    </div>
  )
  
  const bodyEliminar =(
    <div className={styles.modal}>
      <p>Estas Seguro de eliminar el material{materialSeleccionado&&materialSeleccionado.nombre}</p>
      <br/><br/>
      <div align='right'>
        <Button color='secondary' onClick={()=>peticionDelete()}>Si, Eliminar</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No, Cancelar</Button>
      </div> 
    </div>
  )

  return (
    <div className='App'>
      <br/>
      <Button onClick={()=>abrirCerrarModalInsertar()}>
        Agregar Material
      </Button>
      {/* <Button onClick={()=>abrirCerrarModalCategoria()}>
        Agregar Categoria
      </Button> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Acciones</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Stock Minimo</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Creado a</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(material=>(
              <TableRow key={material.id}>
                <TableCell>{material.id}</TableCell>
                <TableCell>
                  <Edit className={styles.iconos} onClick={()=>seleccionarMaterial(material, 'Editar')}/>
                    &nbsp;&nbsp;&nbsp;
                  <Delete className={styles.iconos} onClick={()=>seleccionarMaterial(material, 'Eliminar')}/>
                </TableCell>
                <TableCell>{material.nombre}</TableCell>
                <TableCell>{material.estado}</TableCell>
                <TableCell>{material.descripcion}</TableCell>
                <TableCell>{material.stock_minimo}</TableCell>
                <TableCell>{material.categoria_id}</TableCell>
                <TableCell>{material.creado_a}</TableCell>
                
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
          {bodyInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
          {bodyEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
          {bodyEliminar}
      </Modal>
      <Modal
        open={modalCategoria}
        onClose={abrirCerrarModalCategoria}
      >
          {bodyCategoria}
      </Modal>
    </div>
  );
}

export default App;
