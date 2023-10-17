<template>
        <a-layout-header :style="{ height: '150px', margin: '0', padding: '0'}">
          <img src="../assets/header.jpg" class="responsive-img">
        </a-layout-header>

        <a-row :style="{textAlign: 'center'}">
            <a-col :xs="{span: 24}" :sm="{span:24}">
              <a-form
                @submit.prevent="confirmDelete"
                name="baja"
                autocomplete="off"
              >

              <a-form-item
                  name="email"
                  label="Ingrese su email"
                  :rules="[{required: true, message: 'Por favor ingrese su correo electronico'},
                  {type: 'email', message: 'Por favor ingrese un correo valido', trigger: 'change'}]"
                >
                  <a-input v-model:value="email" @change="validateEmail"></a-input>
                  </a-form-item>
                <div>
                    <button :disabled="!isValidEmail" type="submit" class="btn btn-danger mt-2">BAJA</button>
                </div>
              
              </a-form>  
            </a-col>    

        </a-row>

</template>

<script setup>
  
  import { ref  } from 'vue';
  import { useDatabaseStore } from '../stores/database';
  import Swal from 'sweetalert2';

  const databaseStore=useDatabaseStore();
  const email=ref('')
  const isValidEmail = ref(false);

const confirmDelete = () => {
  console.log(email.value)
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
    databaseStore.addMail(email.value);
    Swal.fire('¡Eliminado!', 'El elemento ha sido eliminado con éxito.', 'success');
};

const validateEmail = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  isValidEmail.value = emailRegex.test(email.value);
};

</script>

<style>
.responsive-img {
  width: 100%; 
  height: 100%; 
  
}
</style>