import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  getDoc,
  setDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

// Tipos para las entidades principales
export interface Provincia {
  id?: string;
  nombre: string;
  codigo: string;
  pais: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Ciudad {
  id?: string;
  nombre: string;
  codigo: string;
  provinciaId: string;
  provinciaNombre?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Barrio {
  id?: string;
  nombre: string;
  ciudadId: string;
  ciudadNombre?: string;
  provinciaId: string;
  provinciaNombre?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Agente {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  whatsapp?: string;
  especialidad?: string;
  estado: 'activo' | 'inactivo';
  fotoPerfil?: string;
  userId?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Propiedad {
  id?: string;
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: 'ARS' | 'USD';
  tipo: 'casa' | 'departamento' | 'ph' | 'terreno' | 'oficina' | 'local' | 'otro';
  operacion: 'venta' | 'alquiler' | 'alquiler_temporario';
  estado: 'activa' | 'pausada' | 'vendida' | 'alquilada' | 'borrador';
  superficie: number;
  superficieCubierta?: number;
  habitaciones?: number;
  banos?: number;
  ambientes?: number;
  cochera?: boolean;
  cocherasCantidad?: number;
  antiguedad?: number;
  direccion: string;
  latitud?: number;
  longitud?: number;
  provinciaId: string;
  provinciaNombre?: string;
  ciudadId: string;
  ciudadNombre?: string;
  barrioId?: string;
  barrioNombre?: string;
  agenteId?: string;
  agenteNombre?: string;
  caracteristicas?: string[];
  imagenes?: string[];
  imagenPrincipal?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Funciones para PROVINCIAS
export const getProvincias = async (): Promise<Provincia[]> => {
  try {
    const provinciasRef = collection(db, 'provincias');
    const q = query(provinciasRef, orderBy('nombre', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Provincia[];
  } catch (error) {
    console.error('Error al obtener provincias:', error);
    throw error;
  }
};

export const getProvincia = async (id: string): Promise<Provincia | null> => {
  try {
    const docRef = doc(db, 'provincias', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Provincia;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener provincia con ID ${id}:`, error);
    throw error;
  }
};

export const crearProvincia = async (provincia: Provincia): Promise<string> => {
  try {
    const provinciaData = {
      ...provincia,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'provincias'), provinciaData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear provincia:', error);
    throw error;
  }
};

export const actualizarProvincia = async (id: string, provincia: Partial<Provincia>): Promise<void> => {
  try {
    const docRef = doc(db, 'provincias', id);
    await updateDoc(docRef, {
      ...provincia,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error al actualizar provincia con ID ${id}:`, error);
    throw error;
  }
};

export const eliminarProvincia = async (id: string): Promise<void> => {
  try {
    // Primero verificar si hay ciudades que dependan de esta provincia
    const ciudadesRef = collection(db, 'ciudades');
    const q = query(ciudadesRef, where('provinciaId', '==', id));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('No se puede eliminar esta provincia porque hay ciudades que dependen de ella');
    }
    
    const docRef = doc(db, 'provincias', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error al eliminar provincia con ID ${id}:`, error);
    throw error;
  }
};

// Funciones para CIUDADES
export const getCiudades = async (provinciaId?: string): Promise<Ciudad[]> => {
  try {
    const ciudadesRef = collection(db, 'ciudades');
    let q;
    
    if (provinciaId) {
      q = query(
        ciudadesRef, 
        where('provinciaId', '==', provinciaId),
        orderBy('nombre', 'asc')
      );
    } else {
      q = query(ciudadesRef, orderBy('nombre', 'asc'));
    }
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Ciudad[];
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    throw error;
  }
};

export const getCiudad = async (id: string): Promise<Ciudad | null> => {
  try {
    const docRef = doc(db, 'ciudades', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Ciudad;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener ciudad con ID ${id}:`, error);
    throw error;
  }
};

export const crearCiudad = async (ciudad: Ciudad): Promise<string> => {
  try {
    // Obtener el nombre de la provincia para guardarlo
    const provincia = await getProvincia(ciudad.provinciaId);
    
    const ciudadData: Ciudad = {
      nombre: ciudad.nombre,
      codigo: ciudad.codigo,
      provinciaId: ciudad.provinciaId,
      provinciaNombre: provincia?.nombre || '',
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any
    };
    
    const docRef = await addDoc(collection(db, 'ciudades'), ciudadData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear ciudad:', error);
    throw error;
  }
};

export const actualizarCiudad = async (id: string, ciudad: Partial<Ciudad>): Promise<void> => {
  try {
    const docRef = doc(db, 'ciudades', id);
    
    // Si se actualizó la provincia, obtener el nombre
    let provinciaData = {};
    if (ciudad.provinciaId) {
      const provincia = await getProvincia(ciudad.provinciaId);
      if (provincia) {
        provinciaData = { provinciaNombre: provincia.nombre };
      }
    }
    
    await updateDoc(docRef, {
      ...ciudad,
      ...provinciaData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error al actualizar ciudad con ID ${id}:`, error);
    throw error;
  }
};

export const eliminarCiudad = async (id: string): Promise<void> => {
  try {
    // Primero verificar si hay barrios que dependan de esta ciudad
    const barriosRef = collection(db, 'barrios');
    const q = query(barriosRef, where('ciudadId', '==', id));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('No se puede eliminar esta ciudad porque hay barrios que dependen de ella');
    }
    
    const docRef = doc(db, 'ciudades', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error al eliminar ciudad con ID ${id}:`, error);
    throw error;
  }
};

// Funciones para BARRIOS
export const getBarrios = async (ciudadId?: string): Promise<Barrio[]> => {
  try {
    const barriosRef = collection(db, 'barrios');
    let q;
    
    if (ciudadId) {
      q = query(
        barriosRef, 
        where('ciudadId', '==', ciudadId),
        orderBy('nombre', 'asc')
      );
    } else {
      q = query(barriosRef, orderBy('nombre', 'asc'));
    }
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Barrio[];
  } catch (error) {
    console.error('Error al obtener barrios:', error);
    throw error;
  }
};

export const getBarrio = async (id: string): Promise<Barrio | null> => {
  try {
    const docRef = doc(db, 'barrios', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Barrio;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener barrio con ID ${id}:`, error);
    throw error;
  }
};

export const crearBarrio = async (barrio: Barrio): Promise<string> => {
  try {
    // Obtener nombres de ciudad y provincia
    const ciudad = await getCiudad(barrio.ciudadId);
    
    const barrioData: Barrio = {
      nombre: barrio.nombre,
      ciudadId: barrio.ciudadId,
      ciudadNombre: ciudad?.nombre || '',
      provinciaId: ciudad?.provinciaId || '',
      provinciaNombre: ciudad?.provinciaNombre || '',
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any
    };
    
    const docRef = await addDoc(collection(db, 'barrios'), barrioData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear barrio:', error);
    throw error;
  }
};

export const actualizarBarrio = async (id: string, barrio: Partial<Barrio>): Promise<void> => {
  try {
    const docRef = doc(db, 'barrios', id);
    
    // Si se actualizó la ciudad, obtener los datos relacionados
    if (barrio.ciudadId) {
      const ciudad = await getCiudad(barrio.ciudadId);
      if (ciudad) {
        barrio.ciudadNombre = ciudad.nombre;
        barrio.provinciaId = ciudad.provinciaId;
        barrio.provinciaNombre = ciudad.provinciaNombre;
      }
    }
    
    await updateDoc(docRef, {
      ...barrio,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error al actualizar barrio con ID ${id}:`, error);
    throw error;
  }
};

export const eliminarBarrio = async (id: string): Promise<void> => {
  try {
    // Verificar si hay propiedades que usan este barrio
    const propiedadesRef = collection(db, 'propiedades');
    const q = query(propiedadesRef, where('barrioId', '==', id));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('No se puede eliminar este barrio porque hay propiedades que dependen de él');
    }
    
    const docRef = doc(db, 'barrios', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error al eliminar barrio con ID ${id}:`, error);
    throw error;
  }
};

// Funciones para AGENTES
export const getAgentes = async (): Promise<Agente[]> => {
  try {
    const agentesRef = collection(db, 'agentes');
    const q = query(agentesRef, orderBy('apellido', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Agente[];
  } catch (error) {
    console.error('Error al obtener agentes:', error);
    throw error;
  }
};

export const getAgente = async (id: string): Promise<Agente | null> => {
  try {
    const docRef = doc(db, 'agentes', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Agente;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener agente con ID ${id}:`, error);
    throw error;
  }
};

export const crearAgente = async (agente: Agente): Promise<string> => {
  try {
    const agenteData = {
      ...agente,
      estado: agente.estado || 'activo',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'agentes'), agenteData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear agente:', error);
    throw error;
  }
};

export const actualizarAgente = async (id: string, agente: Partial<Agente>): Promise<void> => {
  try {
    const docRef = doc(db, 'agentes', id);
    await updateDoc(docRef, {
      ...agente,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error al actualizar agente con ID ${id}:`, error);
    throw error;
  }
};

export const eliminarAgente = async (id: string): Promise<void> => {
  try {
    // Verificar si hay propiedades asignadas a este agente
    const propiedadesRef = collection(db, 'propiedades');
    const q = query(propiedadesRef, where('agenteId', '==', id));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('No se puede eliminar este agente porque tiene propiedades asignadas');
    }
    
    const docRef = doc(db, 'agentes', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error al eliminar agente con ID ${id}:`, error);
    throw error;
  }
};

// Funciones para PROPIEDADES
export const getPropiedades = async (filtros?: Partial<Propiedad>): Promise<Propiedad[]> => {
  try {
    const propiedadesRef = collection(db, 'propiedades');
    let q = query(propiedadesRef, orderBy('createdAt', 'desc'));
    
    // Aplicar filtros si existen
    // Nota: En una implementación real, deberías aplicar filtros más complejos
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Propiedad[];
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    throw error;
  }
};

export const getPropiedad = async (id: string): Promise<Propiedad | null> => {
  try {
    const docRef = doc(db, 'propiedades', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Propiedad;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener propiedad con ID ${id}:`, error);
    throw error;
  }
};

export const crearPropiedad = async (propiedad: Propiedad): Promise<string> => {
  try {
    // Obtener datos relacionados
    if (propiedad.provinciaId) {
      const provincia = await getProvincia(propiedad.provinciaId);
      propiedad.provinciaNombre = provincia?.nombre || '';
    }
    
    if (propiedad.ciudadId) {
      const ciudad = await getCiudad(propiedad.ciudadId);
      propiedad.ciudadNombre = ciudad?.nombre || '';
    }
    
    if (propiedad.barrioId) {
      const barrio = await getBarrio(propiedad.barrioId);
      propiedad.barrioNombre = barrio?.nombre || '';
    }
    
    if (propiedad.agenteId) {
      const agente = await getAgente(propiedad.agenteId);
      propiedad.agenteNombre = agente ? `${agente.nombre} ${agente.apellido}` : '';
    }
    
    const propiedadData = {
      ...propiedad,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'propiedades'), propiedadData);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear propiedad:', error);
    throw error;
  }
};

export const actualizarPropiedad = async (id: string, propiedad: Partial<Propiedad>): Promise<void> => {
  try {
    const docRef = doc(db, 'propiedades', id);
    
    // Actualizar datos relacionados si cambiaron
    if (propiedad.provinciaId) {
      const provincia = await getProvincia(propiedad.provinciaId);
      propiedad.provinciaNombre = provincia?.nombre || '';
    }
    
    if (propiedad.ciudadId) {
      const ciudad = await getCiudad(propiedad.ciudadId);
      propiedad.ciudadNombre = ciudad?.nombre || '';
    }
    
    if (propiedad.barrioId) {
      const barrio = await getBarrio(propiedad.barrioId);
      propiedad.barrioNombre = barrio?.nombre || '';
    }
    
    if (propiedad.agenteId) {
      const agente = await getAgente(propiedad.agenteId);
      propiedad.agenteNombre = agente ? `${agente.nombre} ${agente.apellido}` : '';
    }
    
    await updateDoc(docRef, {
      ...propiedad,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error al actualizar propiedad con ID ${id}:`, error);
    throw error;
  }
};

export const eliminarPropiedad = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'propiedades', id);
    await deleteDoc(docRef);
    
    // Nota: En una implementación real, también deberías eliminar 
    // las imágenes asociadas de Firebase Storage
  } catch (error) {
    console.error(`Error al eliminar propiedad con ID ${id}:`, error);
    throw error;
  }
};

// Funciones para estadísticas del dashboard
export const getEstadisticas = async () => {
  try {
    // Propiedades
    const propiedadesRef = collection(db, 'propiedades');
    const propiedadesSnapshot = await getDocs(propiedadesRef);
    const propiedades = propiedadesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Propiedad[];
    
    // Agentes
    const agentesRef = collection(db, 'agentes');
    const agentesSnapshot = await getDocs(agentesRef);
    const agentes = agentesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Agente[];
    
    // Ubicaciones
    const provinciasRef = collection(db, 'provincias');
    const provinciasSnapshot = await getDocs(provinciasRef);
    const provincias = provinciasSnapshot.docs.length;
    
    const ciudadesRef = collection(db, 'ciudades');
    const ciudadesSnapshot = await getDocs(ciudadesRef);
    const ciudades = ciudadesSnapshot.docs.length;
    
    const barriosRef = collection(db, 'barrios');
    const barriosSnapshot = await getDocs(barriosRef);
    const barrios = barriosSnapshot.docs.length;
    
    // Calcular estadísticas
    const ahora = new Date();
    const hace7Dias = new Date();
    hace7Dias.setDate(ahora.getDate() - 7);
    
    const hace30Dias = new Date();
    hace30Dias.setDate(ahora.getDate() - 30);
    
    const propiedadesActivas = propiedades.filter(p => p.estado === 'activa').length;
    const propiedadesPendientes = propiedades.filter(p => p.estado === 'borrador').length;
    const propiedadesInactivas = propiedades.filter(p => p.estado === 'pausada' || p.estado === 'vendida' || p.estado === 'alquilada').length;
    const propiedadesNuevas = propiedades.filter(p => {
      const date = p.createdAt?.toDate();
      return date && date > hace7Dias;
    }).length;
    
    const agentesActivos = agentes.filter(a => a.estado === 'activo').length;
    const agentesInactivos = agentes.filter(a => a.estado === 'inactivo').length;
    const agentesNuevos = agentes.filter(a => {
      const date = a.createdAt?.toDate();
      return date && date > hace30Dias;
    }).length;
    
    return {
      propiedades: {
        total: propiedades.length,
        activas: propiedadesActivas,
        pendientes: propiedadesPendientes,
        inactivas: propiedadesInactivas,
        nuevasEstaSemana: propiedadesNuevas
      },
      agentes: {
        total: agentes.length,
        activos: agentesActivos,
        inactivos: agentesInactivos,
        nuevosEsteMes: agentesNuevos
      },
      ubicaciones: {
        provincias,
        ciudades,
        barrios
      }
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
}; 