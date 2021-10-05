<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col v-for="adv in advs" :key="adv.id" cols="12" sm="12" md="12" lg="6">
          <Ads :adv=adv />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
  export default {
    data: () => ({
      advs: [],
    }),
    methods: {
      async getAdv() {
        this.advs = await this.$strapi.find('advertisements', [
          ["_limit", "-1"]
        ])
      }
    },
    async created() {
      await this.getAdv()
    }
  }

</script>
