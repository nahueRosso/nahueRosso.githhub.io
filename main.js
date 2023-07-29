// main.js

// Configurar Firebase
const firebaseConfig = {
    // Tus credenciales de Firebase aquí
  };
  
  firebase.initializeApp(firebaseConfig);
  const db1 = firebase.firestore();
  const storage1 = firebase.storage();
  
  // Función para enviar datos a Firestore
  const setFirestore = async (params) => {
    await db1.collection("texts").doc(`id-${Math.floor(Math.random() * 9000000000)}`).set({
      text: params,
    });
  };
  
  // Función para cargar una imagen a Firebase Storage
  const uploadImageToStorage = async (file) => {
    const storageRef = storage1.ref(`images/${Date.now()}_${file.name}`);
    await storageRef.put(file);
  };
  
  // Event listener para enviar a Firestore
  const firestoreForm = document.getElementById("firestoreForm");
  firestoreForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputValue = document.getElementById("textInput").value;
    await setFirestore(inputValue);
    document.getElementById("textInput").value = ""; // Reiniciar el valor del input
  });
  
  // Event listener para cargar imagen a Storage
  const storageForm = document.getElementById("storageForm");
  storageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      await uploadImageToStorage(file);
    }
  });
  