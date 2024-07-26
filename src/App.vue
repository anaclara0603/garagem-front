<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <header>
    <div class="itens">
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link to="/categorias">Categorias</router-link> |
    <router-link to="/acessorio">Acessorios</router-link> |
    <router-link to="/cor">Cores</router-link> |
    <router-link to="/marca">Marcas</router-link> |
    <router-link to="/modelo">Modelos</router-link> |
    <router-link to="/veiculo">Veiculos</router-link> 
  </div>
    <div class="login">
    <div v-if="authStore.loggedIn">
    <router-link  to="/logout">Logout</router-link> |
      {{ authStore.user.email }}
    </div>
    <router-link v-else to="/login">Login</router-link>
  </div>
  </header>
  <main>
    <div class="formulario">
      <RouterView />
    </div>
  </main>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  color: white;
  padding: 5vh;
  text-align: center;
  height: 2vh;
  font-size: large;
}
main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: auto;
}
.formulario{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: #333;
  width: 20vw;
  margin-top: 10vh;
  border-radius: 10px;
  box-shadow: #333 0px 0px 10px;
  color: white;
  padding: auto;
}
.itens{
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.5rem;
}
.login{
  display: flex;
  justify-content: right;
  align-items: center;
}

</style>