firebase.initializeApp({
   apiKey: "AIzaSyCxaCIjfwDmHAFUeOq9qJ8F6A431daAvBQ",
    authDomain: "final-3ac35.firebaseapp.com",
    projectId: "final-3ac35"
});

var db = firebase.firestore();

function guardar(){

	var nombre = document.getElementById('nombre').value;
	//var apellido = document.getElementById('apellido').value;
	//var fecha = document.getElementById('fecha').value;

	db.collection("ets").add({
    first: nombre,
   // last: apellido,
   // born: fecha
	})
		.then(function(docRef) {
    		console.log("Document written with ID: ", docRef.id);
    		document.getElementById('nombre').value='';
    		//document.getElementById('apellido').value='';
    		//document.getElementById('fecha').value='';
	})
		.catch(function(error) {
    		console.error("Error adding document: ", error);
	});
}

if (document.getElementById('tabla')){
	var tabla = document.getElementById('tabla');
db.collection("ets").onSnapshot((querySnapshot) => {
	tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `<tr>
		     		<th scope="row"><a href="#" onclick="editar('${doc.id}', '${doc.data().first}')">${doc.data().first}</a></th>
		   	   		
		      		<td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
		      		<td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}')">Editar</button></td>
		    	</tr>`
    });
});
}

if (document.getElementById('tabla2')){
	var tabla2 = document.getElementById('tabla2');
db.collection("ets").onSnapshot((querySnapshot) => {
	tabla2.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla2.innerHTML += `<tr>
		     		<th scope="row">${doc.data().first}</th>
		   	   		
		    	</tr>`
    });
});
}



function eliminar(id){
	db.collection("ets").doc(id).delete().then(function() {
	    console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});
}


function editar(id, nombre){

	document.getElementById('nombre').value = nombre;
	//document.getElementById('apellido').value = apellido;
	//document.getElementById('fecha').value = fecha;

	var boton = document.getElementById('boton');
	boton.innerHTML = 'Editar';

	

	boton.onclick = function(){

		var washingtonRef = db.collection("ets").doc(id);

		var nombre = document.getElementById('nombre').value;
		//var apellido = document.getElementById('apellido').value;
		//var fecha = document.getElementById('fecha').value;

		return washingtonRef.update({
	    first: nombre,
    	//last: apellido,
    	//born: fecha
		})
		.then(function() {
		    console.log("Document successfully updated!");
		    boton.innerHTML = 'Editar';
		    document.getElementById('nombre').value='';
    		//document.getElementById('apellido').value='';
    		//document.getElementById('fecha').value='';
		})
		.catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating document: ", error);
		});
	}
	// Set the "capital" field of the city 'DC'
}











