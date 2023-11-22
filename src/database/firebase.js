import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, doc , updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyAozZm8FRSn9uMa6plxuL0PXlGYH2b9Sos",

    authDomain: "prueba-e44fc.firebaseapp.com",

    projectId: "prueba-e44fc",

    storageBucket: "prueba-e44fc.appspot.com",

    messagingSenderId: "439748782067",

    appId: "1:439748782067:web:2eb066c3fb5cb3992a5486"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reportesContainer = document.getElementById("reportes-container");


const obtenerReportes = async () => {
    const querySnapshot = await getDocs(collection(db, 'reportes'));
    return querySnapshot;
};

const onGetReportes = (callback) => {
    const query = collection(db, 'reportes');

    const unsubscribe = onSnapshot(query, (querySnapshot) => {
        callback(querySnapshot);
    });

    // Devolvemos la función para desuscribirse cuando sea necesario
    return unsubscribe;
}


const actualizarEstadoReporte = async (id, nuevoEstado) => {
    const reporteRef = doc(db, 'reportes', id);
    console.log("LLEGA AQUI")
    try {
        await updateDoc(reporteRef, { estado: nuevoEstado });
        console.log("Estado actualizado para el reporte:", id, "Nuevo estado:", nuevoEstado);
    } catch (error) {
        console.error("Error al actualizar estado para el reporte:", id, "Error:", error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Agregar el estado "no publicado" antes de mostrar los reportes
        const querySnapshot = await obtenerReportes();
        querySnapshot.forEach(async (doc) => {
            const reporte = doc.data();
            await actualizarEstadoReporte(doc.id, "no publicado");

        });

        // Mostrar los reportes
        const unsubscribe = onGetReportes((querySnapshot) => {
            reportesContainer.innerHTML = "";
            let i = 0;
            querySnapshot.forEach((doc) => {
                const reporte = doc.data();
                reportesContainer.innerHTML += `<div class="car card-body mt-2 border-primary"> 
        <h1>${i += 1}</h1>
        <img src="${reporte.imagenURL}" ></img >
        <p>${reporte.ubicacion}</p>
        <p>${reporte.descripcion}</p>
    </div>`;
            });

            // Después de mostrar los reportes, cambiar el estado a "publicado"
            querySnapshot.forEach(async (doc) => {
                await actualizarEstadoReporte(doc.id, "publicado");
            });
        });

        // Puedes usar `unsubscribe` para dejar de escuchar los cambios en algún momento
        // Por ejemplo, si dejas la página o dejas de necesitar las actualizaciones en tiempo real
        // unsubscribe();
    } catch (error) {
        console.error('Error al obtener reportes:', error);
    }
})