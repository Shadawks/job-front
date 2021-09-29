<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col v-for="adv in advs" :key="adv.id" cols="12" sm="12" md="12" lg="6">
          <v-card class="mx-auto mt-5" max-width="600" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 text-uppercase">
                  {{adv.company.name}}
                </div>
                <v-list-item-title class="text-h5 mb-1 text-capitalize">
                  {{adv.title}}
                </v-list-item-title>
                <v-list-item-subtitle class="text-capitalize">{{adv.short_desc}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar size="65">
                <v-img :src="adv.company.logo.name"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="6" md="12" lg="12">
                  <v-chip-group active-class="primary--text" column>
                    <v-chip class="text-capitalize">
                      <v-icon left>mdi-map-marker</v-icon>{{adv.location}}
                    </v-chip>
                    <v-chip class="text-capitalize">
                      <v-icon left>mdi-note-edit</v-icon>{{adv.type}}
                    </v-chip>
                    <v-chip class="text-capitalize">
                      <v-icon left>mdi-cash</v-icon>{{adv.wages}}$
                    </v-chip>
                    <v-chip class="text-capitalize">
                      <v-icon left>mdi-clock</v-icon>{{adv.working_time}}h/week
                    </v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>
              <v-btn outlined text>
                Apply
              </v-btn>
            </v-card-actions>
          </v-card>
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
