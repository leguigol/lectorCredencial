<template>
          <a-layout-header :style="{ height: '150px', margin: '0', padding: '0'}">
          <img src="../assets/header.jpg" class="responsive-img">
        </a-layout-header>

        <a-row :style="{textAlign: 'center'}">
            <a-col :xs="{span: 24}" :sm="{span:24}">
                <input type="text" id="mail" placeholder="ingrese email a dar de baja" class="form-control" v-model=mail required>              
                <div>
                    <button @click="confirmDelete" class="btn btn-danger mt-2">BAJA</button>
                </div>
            </a-col>    

        </a-row>

</template>

<script setup>
  
  import { ref  } from 'vue';
  import { useDatabaseStore } from '../stores/database';
  import Swal from 'sweetalert2';

  const mail=ref(''); 
  console.log(mail.value)
  const databaseStore=useDatabaseStore();

const confirmDelete = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteElement();
    }
  });
};

const deleteElement = () => {
    console.log('valor de mail: '+mail.value);
    databaseStore.addMail(mail.value);
    Swal.fire('¡Eliminado!', 'El elemento ha sido eliminado con éxito.', 'success');
};
</script>

<style>
.responsive-img {
  width: 100%; 
  height: 100%; 
  
}
</style>