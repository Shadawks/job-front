<template>
    <v-app-bar app elevate-on-scroll v-if="!this.$strapi.user && !isMobile">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" to="/login"><v-icon>mdi-account-lock</v-icon>Login</v-btn>
        <v-btn outlined class="ma-2" to="/register"><v-icon>mdi-account-plus</v-icon>Register</v-btn>
    </v-app-bar>
    <v-app-bar app elevate-on-scroll v-else-if="this.$strapi.user">
      <v-toolbar-title>JobBoard</v-toolbar-title>
      <v-spacer></v-spacer>
      <Avatar/>
    </v-app-bar>
</template>
<script>

export default {
  data: () => ({
    isMobile: false,
  }),
  created() {
    window.innerWidth < 800 ? this.isMobile = true : this.isMobile = false
  }
}
</script>