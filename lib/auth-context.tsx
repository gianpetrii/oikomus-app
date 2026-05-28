'use client'

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { 
  User, 
  UserCredential,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  updateProfile,
  googleProvider,
  signInWithPopup
} from './firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

type UserRole = 'user' | 'agent' | 'admin';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Limpiar errores
  const clearError = () => setError(null);

  // Obtener datos adicionales del usuario desde Firestore
  const getUserData = async (uid: string, email?: string | null) => {
    try {
      // Primero, intentar obtener por uid
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return { ...userSnap.data(), uid } as UserData;
      } 
      
      // Si no encontramos por uid y tenemos email, buscar por email
      if (email) {
        console.log('Buscando usuario por email:', email);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Usamos el primer documento que coincide
          const userDoc = querySnapshot.docs[0];
          console.log('Usuario encontrado por email:', userDoc.id);
          
          // También actualizamos el documento para que use el uid correcto
          const userData = userDoc.data() as UserData;
          
          // Si el documento tiene un ID diferente al uid, creamos uno nuevo con el uid correcto
          if (userDoc.id !== uid) {
            console.log('Actualizando documento de usuario con el uid correcto');
            // Crear un nuevo documento con el uid correcto
            const newUserRef = doc(db, 'users', uid);
            await setDoc(newUserRef, {
              ...userData,
              uid: uid
            });
            
            // Opcionalmente, podríamos eliminar el documento anterior
            // await deleteDoc(userDoc.ref);
          }
          
          return { ...userData, uid } as UserData;
        }
      }
      
      // Usuario no tiene datos en Firestore
      return null;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  };

  // Crear o actualizar datos del usuario en Firestore
  const saveUserData = async (user: User, additionalData?: Partial<UserData>) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Si no existe, creamos el documento con datos básicos del usuario
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user', // Rol por defecto
          createdAt: new Date().toISOString(),
          ...additionalData
        });
        console.log('Documento de usuario creado correctamente en Firestore');
      } else {
        // Si ya existe, solo actualizamos campos que no sean el rol
        // Esto evita que un usuario normal pueda sobreescribir su rol
        const updatedData = { ...additionalData };
        delete updatedData.role; // Eliminamos el rol para no sobreescribirlo
        
        if (Object.keys(updatedData).length > 0) {
          await setDoc(userRef, updatedData, { merge: true });
          console.log('Datos de usuario actualizados en Firestore (preservando rol)');
        }
      }
    } catch (error) {
      console.error('Error al guardar datos del usuario:', error);
    }
  };

  // Combinar datos de Auth y Firestore
  const formatUserData = async (user: User | null): Promise<UserData | null> => {
    if (!user) return null;
    
    const userData = await getUserData(user.uid, user.email);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: userData?.role || 'user',
      ...userData
    };
  };

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        const formattedUser = await formatUserData(firebaseUser);
        setUser(formattedUser);
      } catch (err) {
        console.error('Error al formatear usuario:', err);
        setError('Error al cargar el perfil del usuario');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Funciones de autenticación
  const login = async (email: string, password: string) => {
    try {
      clearError();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      let errorMessage = 'Error al iniciar sesión';
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Correo electrónico o contraseña incorrectos';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Intente más tarde';
      }
      
      setError(errorMessage);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      clearError();
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserData(result.user);
      return result;
    } catch (err: any) {
      setError('Error al iniciar sesión con Google');
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      clearError();
      // Crear usuario en Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil
      await updateProfile(user, { displayName: name });
      
      // Guardar datos en Firestore
      await saveUserData(user, { displayName: name });
    } catch (err: any) {
      let errorMessage = 'Error al registrar usuario';
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo electrónico ya está en uso';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      }
      
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      clearError();
      await signOut(auth);
    } catch (err) {
      setError('Error al cerrar sesión');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      clearError();
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      let errorMessage = 'Error al enviar el correo de restablecimiento';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No existe una cuenta con este correo electrónico';
      }
      
      setError(errorMessage);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 