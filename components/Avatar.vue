<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on" class="ma-4">
        <v-avatar color="grey" size="40">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="grey">
            <span class="white--text text-h5">{{ this.$strapi.user.username[0] }}</span>
          </v-avatar>
          <h3 class="mt-1">{{ this.$strapi.user.username }}</h3>
          <p class="text-caption mt-1">
            {{ this.$strapi.user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text>
            Edit Account
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click.stop="logout()">
            Disconnect
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>
<script>
  export default {
    methods: {
      async logout() {
        await this.$strapi.logout()
      },
    }
  }
</script>