<template>
  <v-bottom-navigation app shift>
    <v-btn v-for="item in items" :key="item.title" link :to="item.link">
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
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
        {
          title: 'Login',
          icon: 'mdi-account-lock',
          link: "/login"
        },
        {
          title: 'Register',
          icon: 'mdi-account-plus',
          link: "/register"
        },
      ],
    }),
  }

</script>
