<script setup>
import { ref, reactive, onMounted } from "vue";
import MarcasApi from "@/api/marca";
const marcasApi = new MarcasApi();

const defaultMarca = { id: null, nome: "", nacionalidade: "" };
const marcas = ref([]);
const marca = reactive({ ...defaultMarca });

onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas();
});

function limpar() {
  Object.assign(marca, { ...defaultMarca });
}

async function salvar() {
  if (marca.id) {
    await marcasApi.atualizarMarca(marca);
  } else {
    await marcasApi.adicionarMarca(marca);
  }
  marca.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar);
}

async function excluir(id) {
  await marcasApi.excluirMarca(id);
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  limpar();
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Marca</h1>
      <div class="form">
        <input type="text" v-model="marca.nome" placeholder="Descrição" />
        <input type="text" v-model="marca.nacionalidade" placeholder="Nacionalidade" />
        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
      </div>
      <ul>
        <li v-for="marca in marcas" :key="marca.id">
          <span @click="editar(cor)">
            ({{ marca.id }}) - {{ marca.nome }} -{{ marca.nacionalidade }}
          </span>
          <button @click="excluir(marca.id)">X</button>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: auto;
}
.container{
  display: flex;
  flex-direction: column;
  gap: 1vh;
  justify-content: center;
  align-items: center;
  padding: auto;
  background-color: #333;
  color: white;
  border-radius: 1vh;
  padding: 1vh;
  margin-top: 5vh;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  width: 10vw;
  height: 1vh;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
}

select {
  width: 11vw;
  height: 2vh;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
}
</style>
