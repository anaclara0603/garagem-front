<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <main>
    <div class="formulario">
      <RouterView />
    </div>
  </main>
</template>
<style scoped>


</style>