<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h3
          class="mt-1 "
        >BackGround Remover</h3>
      </div>

      
    </v-app-bar>

    <v-main>
      <MainUI />
    </v-main>
  </v-app>
</template>

<script>

import MainUI from './components/MainUI.vue';
export default {
  name: 'App',

  components: {
    MainUI,
  },

  data: () => ({
    imgLoad: false
  }),
};
</script>
