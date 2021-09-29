<template>
  <v-bottom-navigation app shift>
    <v-btn v-for="item in items" :key="item.title" link :to="item.link">
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
    <v-btn v-if="!this.$strapi.user" link to="/login">
      <span>Login</span>
      <v-icon>mdi-account-lock</v-icon>
    </v-btn>
    <v-btn v-if="!this.$strapi.user" link to="/register">
      <span>Register</span>
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn v-if="!this.$strapi.user && this.$strapi.user.role.name == 'Recruiter'" link to="/register">
      <span>Recruitement</span>
      <v-icon>mdi-briefcase-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>


<script>
  export default {
    data: () => ({
      items: [{
          title: 'Homepage',
          icon: 'mdi-home',
          link: "/"
        },
        {
          title: 'About',
          icon: 'mdi-information',
          link: "/about"
        },
      ],
    }),
  }

</script>
