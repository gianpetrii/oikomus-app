// Script para inicializar la colección de usuarios y asignar rol de administrador
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, query, where, getDocs } = require('firebase/firestore');
const { getAuth, getUserByEmail } = require('firebase/auth');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

// Imprimir variables de entorno para debug (sin valores sensibles)
console.log('Variables de entorno cargadas:', {
  apiKeyExists: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomainExists: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectIdExists: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log('Inicializando Firebase con project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getExistingUser(email) {
  try {
    // Consultar usuarios por correo electrónico
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Devolver el primer documento que coincide
      return querySnapshot.docs[0];
    }
    return null;
  } catch (error) {
    console.error(`Error al buscar usuario con email ${email}:`, error);
    return null;
  }
}

async function initializeAdmin() {
  try {
    console.log('Inicializando usuarios administradores...');
    
    // Primer usuario administrador - Gian Petrii
    const email1 = 'gianpetrii@gmail.com';
    const existingUser1 = await getExistingUser(email1);
    
    if (existingUser1) {
      // Actualizar el rol si el usuario ya existe
      const userRef1 = doc(db, 'users', existingUser1.id);
      await setDoc(userRef1, { role: 'admin' }, { merge: true });
      console.log(`Usuario existente ${email1} actualizado como administrador (ID: ${existingUser1.id})`);
    } else {
      // Si no existe, crear un documento temporal con un ID genérico
      const adminData1 = {
        email: email1,
        displayName: 'Gian Petrii',
        role: 'admin',
        createdAt: new Date().toISOString(),
        photoURL: null
      };
      
      // Crear documento para el usuario (usamos el email como ID provisional)
      const userRef1 = doc(db, 'users', email1.replace(/[@.]/g, '_'));
      await setDoc(userRef1, adminData1);
      console.log(`Usuario ${email1} configurado como administrador`);
    }
    
    // Segundo usuario administrador - Lautaro Fuentes
    const email2 = 'Lautaro.fuentes.nqn@gmail.com';
    const existingUser2 = await getExistingUser(email2);
    
    if (existingUser2) {
      // Actualizar el rol si el usuario ya existe
      const userRef2 = doc(db, 'users', existingUser2.id);
      await setDoc(userRef2, { role: 'admin' }, { merge: true });
      console.log(`Usuario existente ${email2} actualizado como administrador (ID: ${existingUser2.id})`);
    } else {
      // Si no existe, crear un documento temporal con un ID genérico
      const adminData2 = {
        email: email2,
        displayName: 'Lautaro Fuentes',
        role: 'admin',
        createdAt: new Date().toISOString(),
        photoURL: null
      };
      
      // Crear documento para el usuario (usamos el email como ID provisional)
      const userRef2 = doc(db, 'users', email2.replace(/[@.]/g, '_'));
      await setDoc(userRef2, adminData2);
      console.log(`Usuario ${email2} configurado como administrador`);
    }
    
    console.log('Script completado exitosamente');
    console.log('IMPORTANTE: Para que estos cambios surtan efecto, asegúrate de cerrar sesión y volver a iniciar sesión');
  } catch (error) {
    console.error('Error al configurar administradores:', error);
  } finally {
    // Salir del proceso
    process.exit(0);
  }
}

// Ejecutar la función
initializeAdmin(); 