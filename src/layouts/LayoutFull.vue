<script setup>
  import { useLayout } from '@/composables/screen';
  const { layout } = useLayout();
</script>
<template>
  <component :is="layout" />
</template>