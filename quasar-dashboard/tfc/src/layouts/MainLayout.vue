<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="my-toolbar">

        <q-img
          src="/src/assets/logotipo-horizontal-centro-universitario-lisboa-branco-png.png"
          alt="Logo"
          class="logo-img"
          :style="{ width: '350px', height: 'auto' }"
        />

        <q-space />



      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      currentDate: '',
    };
  },
  created() {

  },
  methods: {

  },
};
</script>

<style scoped>
.my-toolbar {
  height: 100px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  max-height: 100%;
  object-fit: contain;
}

</style>
