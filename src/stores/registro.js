import { defineStore } from 'pinia';
import { query, getFirestore, collection, getDocs, where, doc,deleteDoc } from 'firebase/firestore/lite';
import firebaseApp from '@/firebase';

const db = getFirestore(firebaseApp); 

// Define el store
export const useRegistroStore = defineStore('registro', {
  state: () => ({
    registros: [],
    beneficios: []

  }),
  actions: {
    async fetchRegistros(id) {
        try{
            const q = query(
                collection(db, 'registro'), 
                where("user","==", id)
            );
            const querySnapshot=await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id,doc.data());
                this.registros.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        }catch (error) {
        console.error('Error al obtener registros:', error);
      }
    },
    async getBeneficios(id){

        this.loadingDoc=true;
        try {
            const q = query(
                collection(db, 'beneficios'), 
                where("user","==", id)
            );
            const querySnapshot=await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id,doc.data());
                this.beneficios.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        }catch(error){
            console.log(error);
        }finally{
            this.loadingDoc=false;
        }
    },
    async baja(id){
        console.log(id);
        try{
            await deleteDoc(doc(db,"users",id));
        }catch(error){
            console.log("error: "+error);
        }
    }

  },
});

