<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token');
    const passageUser = new PassageUser(authToken);
    const user = await passageUser.userInfo(authToken);
    if (user) {
      await authStore.setToken(authToken);
    } else {
      authStore.unsetToken();
    }
  } catch (error) {
    authStore.unsetToken();
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
<main>
  <h1>Garagem</h1>
  <img src="https://i.pinimg.com/564x/0f/76/1e/0f761e864e5b743c38b6faeaca18ceee.jpg" alt="">

</main>
</template>
<style scoped>
img{
  width: 20vw;
  height: 30vh;
  margin-bottom: 5vh;
}
</style>