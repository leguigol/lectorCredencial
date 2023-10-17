<template>
        <a-layout-header :style="{ height: '150px', margin: '0', padding: '0'}">
          <img src="../assets/header.jpg" class="responsive-img">
        </a-layout-header>

        <a-row :style="{textAlign: 'center'}">
            <a-col :xs="{span: 24}" :sm="{span:24}">
                <div v-if="registros.length > 0">
                    <div v-for="registro in registros" :key="registro.user">
                            <h2>{{ registro.apellido }} {{ registro.nombre }}</h2>
                            <h3>DNI: {{ registro.dni }}</h3>
                            <h3>Forma de Suscripción: {{ registro.forma_suscripcion }}</h3>
                            <p>Fecha de Registro: {{ formatearFecha(registro.fecha_registro.toDate()) }}</p>
                    </div>
                </div>
            </a-col>    

        </a-row>
        <a-row v-if="registroStore.beneficios.length>0">
            <a-col :xs="{span: 24}" :sm="{span:12, offset:6}">
                    <a-card :style="{textAlign: 'center'}">
                        <h2>BENEFICIOS</h2>
                        <div v-for="item of registroStore.beneficios" :key="item.id">
                            {{ item.descripcion }}
                        </div>
                    </a-card>
            </a-col>    
        </a-row>
        

</template>
<style>
.responsive-img {
  width: 100%; 
  height: 100%; 
  
}

</style>
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {useRegistroStore} from '../stores/registro';

  const result = ref('');
  const id=ref('');

  const registroStore = useRegistroStore();
  const registros = ref([]); // Declarar como ref reactivo
  
  const router = useRouter();

  onMounted(() => {
  const idParam = router.currentRoute.value.query.id; // Obtener el valor del parámetro 'id'
  if (idParam) {
    result.value = `ID extraído de la URL: ${idParam}`;
    id.value=idParam;
    registroStore.fetchRegistros(id.value);
    registroStore.getBeneficios(id.value);
    console.log('idparam:'+id.value);
  }

  registros.value = registroStore.registros;
});
function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
}
  
</script>
  