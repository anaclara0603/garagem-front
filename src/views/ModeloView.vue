<script setup>
import { ref, reactive, onMounted } from "vue";
import ModelosApi from "@/api/modelo";
import CategoriasApi from "@/api/categorias";
import MarcasApi from "@/api/marca";

const marcasApi = new MarcasApi();

const marcas = ref([]);

onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas();
});

const categoriasApi = new CategoriasApi();

const categorias = ref([]);

onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

const modelosApi = new ModelosApi();

const defaultModelo = { id: null, nome: "" };
const modelos = ref([]);
const modelo = reactive({ ...defaultModelo });

onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelos();
});

function limpar() {
  Object.assign(modelo, { ...defaultModelo });
}

async function salvar() {
  if (modelo.id) {
    await modelosApi.atualizarModelo(modelo);
  } else {
    await modelosApi.adicionarModelo(modelo);
  }
  modelos.value = await modelosApi.buscarTodosOsModelos();
  limpar();
}

function editar(modelo_para_editar) {
  Object.assign(modelo, modelo_para_editar);
}

async function excluir(id) {
  await modelosApi.excluirModelo(id);
  modelos.value = await modelosApi.buscarTodosOsModelos();
  limpar();
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Modelo</h1>
      <div class="form">
        <input type="text" v-model="modelo.nome" placeholder="Nome" />
        <select v-model="modelo.categoria">
          <option value="" selected disabled>Categorias</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.descricao }}
          </option>
        </select>
        <select v-model="modelo.marca">
          <option value="" selected disabled>Marcas</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nome }}</option>
        </select>
        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
      </div>
      <ul>
        <li v-for="modelo in modelos" :key="modelo.id">
          <span @click="editar(modelo)">
            ({{ modelo.id }}) - {{ modelo.nome }} -
          </span>
          <button @click="excluir(modelo.id)">X</button>
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
