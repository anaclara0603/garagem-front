<script setup>
import { ref, reactive, onMounted } from "vue";
import CategoriasApi from "@/api/categorias";
const categoriasApi = new CategoriasApi();

const defaultCategoria = { id: null, descricao: "" };
const categorias = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await categoriasApi.atualizarCategoria(categoria);
  } else {
    await categoriasApi.adicionarCategoria(categoria);
  }
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await categoriasApi.excluirCategoria(id);
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Categoria</h1>
      <div class="form">
        <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
      </div>
      <div class="button">
        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
      </div>
      <ul>
        <li v-for="categoria in categorias" :key="categoria.id">
          <span @click="editar(categoria)">
            ({{ categoria.id }}) - {{ categoria.descricao }} -
          </span>
          <button @click="excluir(categoria.id)">X</button>
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

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5vh;
}
</style>
