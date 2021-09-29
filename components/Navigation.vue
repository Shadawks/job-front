<template>
  <v-card>
    <v-navigation-drawer app expand-on-hover permanent :mini-variant.sync="mini" mini-variant-width="62">
      <v-list-item class="px-2" v-if="!mini">
        <v-list-item-avatar size="100" class="mx-auto">
          <v-img src="v.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item class="mt-4" v-else>
        <v-avatar>
          <v-img src="v.png"></v-img>
        </v-avatar>
      </v-list-item>
      <v-list class="mt-10">
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon v-if="mini">{{ item.icon }}</v-icon>
            <v-icon v-else x-large>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        items: [{
            title: 'Homepage',
            icon: 'mdi-home',
            to: "/"
          },
          {
            title: 'About',
            icon: 'mdi-information',
            to: "/about"
          },
        ],
        mini: true
      }
    },
  }

</script>
