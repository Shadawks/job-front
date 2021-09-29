<template>
  <v-app dark>
    <Navigation v-if="!isMobile"/>
    <Appbar/>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Phonebar v-if="isMobile"/>
  </v-app>
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