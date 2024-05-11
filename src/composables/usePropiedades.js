import { ref, computed } from "vue";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";

export default function usePropiedades() {
  const hasPiscina = ref(false);

  const storage = useFirebaseStorage();
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, "propiedades"));

  async function deletePropiedad(id, urlImage) {
    if(confirm('¿Estás seguro de que quieres eliminar esta propiedad?') === false) return;
    const imageRef = storageRef(storage, urlImage);
    const docRef = doc(db, "propiedades", id);

    await Promise.all([
      deleteDoc(docRef),
      deleteObject(imageRef),
    ]);
  }

  const propiedadesFiltradas = computed(() =>{
    return hasPiscina.value
      ? propiedadesCollection.value.filter((propiedad) => propiedad.piscina)
      : propiedadesCollection.value;
  }
  );

  return {
    hasPiscina,
    propiedadesFiltradas,
    propiedadesCollection,
    deletePropiedad,
  };
}
