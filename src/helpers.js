const hbs = require('hbs');
const fs = require('fs');


hbs.registerHelper('listarCursos', () => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e){
        return " <p> No hay cursos creados <p>";
    }   
    let texto = "<p> Listado de todos los cursos <p> \
                <table> \
                <thead>  \
                <th> id </th> \
                <th> Nombre </th> \
                <th> Descripcion </th> \
                <th> Valor </th> \
                </thead> \
                <tbody>";
     listaCursos.forEach(curso => {
         texto = texto +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td></tr>' 
     });           
     texto = texto + '</tbody></table>';
     return texto
    
})

hbs.registerHelper('listarCursosDisponibles', () => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e){
        return " <p> No hay cursos creados <p>";
    }
    let listaDisponibles = listaCursos.filter(cur => cur.estado == 'disponible') ;
    let texto = "<p> Listado de cursos disponibles<p> \
                <table> \
                <thead>  \
                <th> id </th> \
                <th> Nombre </th> \
                <th> Descripcion </th> \
                <th> Valor </th> \
                <th></th> \
                </thead> \
                <tbody>";
     listaDisponibles.forEach(curso => {
         texto = texto +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td>' +
                '<td> <a href=\"/detalle?id='+curso.id +'\"> Ver detalle </a><td></tr>' 
     });           
     texto = texto + '</tbody></table>';
     return texto
    
})

hbs.registerHelper('detalleCurso', (id) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let curso = listaCursos.find(buscar => buscar.id == id);
     if (curso) {
         texto = '<table>'+
        '<tbody>' +
        '<tr><td>Id:</td><td>' + curso.id + '</td></tr> ' +
        '<tr><td>Nombre:</td><td>' + curso.nombre + '</td></tr>' +
        '<tr><td>Descripcion:</td><td>' + curso.descripcion + '</td></tr>' +
        '<tr><td>Valor:</td><td>' + curso.valor + '</td></tr>' +
        '<tr><td>Modalidad:</td><td>' +curso.modalidad +'<td></tr>'+
        '<tr><td>Intensidad:</td><td>' +curso.intensidad +'<td></tr>'+
        '</tbody></table><br>' +
        '<a href=\"/inscribirse?id='+curso.id +'\">Inscribirse en este curso</a><br>' +
        '<a href=\"/verCursosDisponibles\">Regresar</a>'
        ;
        return texto;
     } else {
         return '<p><b>No existe curso con ese id </b></p>'
     }
})

hbs.registerHelper('crearCurso',(id, nombre, descripcion, valor, intensidad, modalidad) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let cur = {
        id : id,
        nombre : nombre,
        descripcion : descripcion,
        valor : valor,
        modalidad: modalidad,
        intensidad : intensidad,
        estado: 'disponible',
        idsInscritos: []
    };
    let duplicado = listaCursos.find(c => c.id == cur.id);
    if (!duplicado) {
        listaCursos.push(cur);
        let datos = JSON.stringify(listaCursos);
        fs.writeFile('./src/cursos.json', datos, (err) => {
            if (err) throw (err);
           
        })
        return "<h2><p>Curso creado con éxito</p></h2>";
    } else {
         return "<h2><p>Ya existe curso con ese id</p></h2>";
    }

})

//Nubia
hbs.registerHelper('listarCursosAdministrador', () => {
    try {
        listaCursosAdm = require('./cursos.json');
    } catch (e){
        return " <p> No hay cursos creados <p>";
    }
	
    let texto = "<p> <center> <b> <font face='Verdana, Geneva, sans-serif' size='2'> LISTADO DE CURSOS </font> </b> </center> <p> \
                <table border='1' cellspacing='0' font-family:'Courier New'> \
                <thead>  \
                <th> Id </th> \
                <th> Nombre </th> \
                <th> Descripción </th> \
                <th> Valor </th> \
				<th> Modalidad </th> \
				<th> Intensidad </th> \
				<th> Estado </th> \
                <th colspan='2'></th> \
                </thead> \
                <tbody>";
     listaCursosAdm.forEach(curso => {
         texto = texto +
                '<tr>' +
                '<td style="width:3%">' + curso.id + '</td>' +
                '<td style="width:20%">' + curso.nombre + '</td>' +
                '<td style="width:25%">' + curso.descripcion + '</td>' +
                '<td style="width:7%">' + curso.valor + '</td>' + 
				'<td style="width:7%">' + curso.modalidad + '</td>' +
                '<td style="width:7%">' + curso.intensidad + '</td>' +
				'<td style="width:7%">' + curso.estado + '</td>' +
                '<td style="width:8%"> <a href=\"/inscritos?id='+curso.id +'\"> Ver Inscritos </a></td>' +
				'<td style="width:10%"> <a href=\"/actCurso?id='+curso.id +'\"> Actualizar Estado </a></td></tr>'
     });           
     texto = texto + '</tbody></table>';
     return texto
    
})

//Nubia
hbs.registerHelper('inscritosCurso', (id) => {
    try {
        listaInscritosCurso = require('./inscritosCurso.json');
    } catch (e) {
        listaInscritosCurso = [];
    }
    let inscritos = listaInscritosCurso.filter(buscar => buscar.id == id);
	  
     if (inscritos) {
		 
     let texto = "<p> <center> <b> <font face='Verdana, Geneva, sans-serif' size='2'> LISTADO DE INSCRITOS POR CURSO </font> </b> </center> <p> \
                <table style='width:80%' border='1' cellspacing='0' font-family:'Courier New'> \
                <thead>  \
                <th> Id </th> \
                <th> Nombre Curso </th> \
                <th> Documento </th> \
                <th> Nombre </th> \
				<th> Correo </th> \
				<th> Teléfono </th> \
                <th colspan='2'></th> \
                </thead> \
                <tbody>";
     inscritos.forEach(inscrito => {
         texto = texto +
                '<tr>' +
                '<td style="width:3%">' + inscrito.id + '</td>' +
                '<td style="width:20%">' + inscrito.nombreCurso + '</td>' +
                '<td style="width:15%">' + inscrito.documento + '</td>' +
                '<td style="width:15%">' + inscrito.nombre + '</td>' + 
				'<td style="width:15%">' + inscrito.correo + '</td>' +
                '<td style="width:15%">' + inscrito.telefono + '</td>' +
                '<td style="width:17%"> <a href=\"/elimInscrito?id='+inscrito.id+'&documento='+ inscrito.documento +'\"> Eliminar inscrito </a></td></tr>'
     });           
     texto = texto + '</tbody></table>' +
	 '<p> <a href=\"/verCursosAdministrador\"> Regresar </a> </p>'; 
	 
     return texto
     } else {
         return '<p><b>No hay estudiantes inscritos para el curso con ese id </b></p>'
     }
})

//Nubia
hbs.registerHelper('actualizarCurso', (id) => {
    try {
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaCursos = [];
    }
    let curso = listaCursos.find(buscar => buscar.id == id);
     if (curso) {
		 
		if(curso.estado == 'cerrado'){
		curso.estado = 'disponible';
		} else {
		curso.estado = 'cerrado';	
		}
		
		guardar()
		 
         texto = '<table>'+
        '<tbody>' +
        '<tr><td>Id:</td><td>' + curso.id + '</td></tr> ' +
        '<tr><td>Nombre:</td><td>' + curso.nombre + '</td></tr>' +
        '<tr><td>Descripcion:</td><td>' + curso.descripcion + '</td></tr>' +
        '<tr><td>Valor:</td><td>' + curso.valor + '</td></tr>' +
        '<tr><td>Modalidad:</td><td>' +curso.modalidad +'<td></tr>'+
        '<tr><td>Intensidad:</td><td>' +curso.intensidad +'<td></tr>'+
		'<tr><td>Intensidad:</td><td><b>' +curso.estado +'</b><td></tr>'+
        '</tbody></table><br>' +	
		'<h2><p>Estado actualizado con éxito</p></h2> <br>' +
        '<a href=\"/verCursosAdministrador\">Regresar</a>'
        ;
        return texto;
     } else {
         return '<p><b>No existe curso con ese id </b></p>'
     }
})

//Nubia
hbs.registerHelper('eliminarInscrito', (documento, id) => {
    try {
        listaInscritos = require('./inscritosCurso.json');
    } catch (e) {
        listaInscritos = [];
    }
	
    let inscritos = listaInscritos.filter(buscar => (buscar.documento != documento || buscar.id != id));
	let inscrito1 = listaInscritos.find(buscar => (buscar.documento == documento || buscar.id == id));
	let inscritosCurso= inscritos.filter(buscar => (buscar.id == id));
		 
	if (inscritos.length == listaInscritos.length){
        console.log('Ningún estudiante tiene el documento ' + documento);
    } else {
      listaInscritos = inscritos;
      guardarInscritos(listaInscritos)
	  
	   let texto = '<table>'+
        '<tbody>' +
        '<tr><td>Id:</td><td>' + inscrito1.id + '</td></tr> ' +
        '<tr><td>Nombre:</td><td>' + inscrito1.nombre + '</td></tr>' +
        '<tr><td>documento:</td><td>' + inscrito1.documento + '</td></tr>' +
        '<tr><td>correo:</td><td>' + inscrito1.correo + '</td></tr>' +
        '<tr><td>telefono:</td><td>' +inscrito1.telefono +'<td></tr>'+
        '</tbody></table><br>' +	
		'<h2><p>Inscrito eliminado con éxito</p></h2> <br>';
		
		texto = texto + "<p> <center> <b> <font face='Verdana, Geneva, sans-serif' size='2'> LISTADO DE INSCRITOS POR CURSO </font> </b> </center> <p> \
                <table style='width:80%' border='1' cellspacing='0' font-family:'Courier New'> \
                <thead>  \
                <th> Id </th> \
                <th> Nombre Curso </th> \
                <th> Documento </th> \
                <th> Nombre </th> \
				<th> Correo </th> \
				<th> Teléfono </th> \
                <th colspan='2'></th> \
                </thead> \
                <tbody>";
     inscritosCurso.forEach(inscrito => {
         texto = texto +
                '<tr>' +
                '<td style="width:3%">' + inscrito.id + '</td>' +
                '<td style="width:20%">' + inscrito.nombreCurso + '</td>' +
                '<td style="width:15%">' + inscrito.documento + '</td>' +
                '<td style="width:15%">' + inscrito.nombre + '</td>' + 
				'<td style="width:15%">' + inscrito.correo + '</td>' +
                '<td style="width:15%">' + inscrito.telefono + '</td></tr>'
     });           
     texto = texto + '</tbody></table>' +
	 '<p> <a href=\"/verCursosAdministrador\"> Regresar </a> </p>'; 
	 
     return texto
		}
})

//Nubia
const guardar = () => {
	listaCursos = require('./cursos.json');
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./src/cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo almacenado con éxito');
    })
}

//Nubia
const guardarInscritos = (lista) => {
	  
     listaInscritos = require('./inscritosCurso.json');
    let datos = JSON.stringify(lista);
    fs.writeFile('./src/inscritosCurso.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo almacenado con éxito');
    })
}



//Edisson
hbs.registerHelper('inscribirCurso',(documento, nombre, correo, telefono, curso) => {
    try {
        listaInscritos = require('./inscritosCurso.json');
        listaCursos = require('./cursos.json');
    } catch (e) {
        listaInscritos = [];
        listaCursos = [];
    }

let selCurso = listaCursos.find(buscar => buscar.id == curso);
     if (selCurso) {
        console.log('Informacion del curso a inscribir');
        console.log(selCurso);
     } else {
         return "<p><b>Selecciones un curso </b></p>" + 
                "<br><a href=\"/inscribirse\"> Regresar </a>";
     }

    let registroCurso = {
        id: selCurso.id,
        nombreCurso: selCurso.nombre,
        documento : documento,
        nombre : nombre,
        correo : correo,
        telefono : telefono
    };

    let duplicado = listaInscritos.find(inscritos => inscritos.documento == registroCurso.documento && inscritos.id == registroCurso.id);
    if (!duplicado) {
        listaInscritos.push(registroCurso);
        let datos = JSON.stringify(listaInscritos);
        fs.writeFile('./src/inscritosCurso.json', datos, (err) => {
            if (err) throw (err);
           
        })
        return "<h2><p>Estudiante " + registroCurso.nombre + " inscrito con exito en el curso de " + registroCurso.nombreCurso + "</p></h2>";
    } else {
         return "<h2><p>Ya esta registrado en este curso</p></h2>" + 
                "<br><a href=\"/inscribirse\"> Regresar </a>";
    }
})

    
//Edisson
hbs.registerHelper('selectLstCursos', () => {

    try {
        listaCursos = require('./cursos.json');
    } catch (e){
        let dsb = "<option name='curso' required>Seleccione un curso</option>";
        return "<select name=lstCursos>" + dsb + "</select>";
        
    } 
    
    let opciones = "";
    listaCursos.forEach(curso => {
        opciones = opciones +
               "<option value=" + curso.id + ">" + curso.nombre + "</option>";
    });
    let texto = "<select name=lstCursos requuired min=" + opciones + "</select>";
   
     return texto    
})
