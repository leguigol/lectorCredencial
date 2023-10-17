import { defineStore } from "pinia";
import { collection, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';

export const useDatabaseStore=defineStore('database',{
    state: () => ({
        documents: [],
        registerData: [],
    }),
    actions: {
        async addMail(mail){
            try{
                const objetoDoc={
                    email: mail,
                    fecha: new Date().toISOString()
                }
                const docRef=await addDoc(collection(db, "bajas"), objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id,
                });
            }catch(error){
                console.log(error);
            }finally{

            }
        }
    },    
});    