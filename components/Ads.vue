<template>
  <v-card class="mx-auto mt-5" max-width="600" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-2 text-uppercase text-h6 font-weight-bold">
          <v-icon class="mx-2">mdi-home-search</v-icon>{{adv.company.name}}
        </div>
        <v-list-item-title class="text-h5 mb-1 text-capitalize">{{adv.title}}</v-list-item-title>
        <v-list-item-subtitle class="text-capitalize" v-if="!reveal">{{adv.short_desc}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar size="65">
        <v-img :src="adv.company.logo.name"></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-row>
        <v-col cols="12" sm="6" md="12" lg="12">
          <v-chip-group active-class="primary--text" column>
            <v-chip class="text-capitalize" label>
              <v-icon left>mdi-map-marker</v-icon>{{adv.location}}
            </v-chip>
            <v-chip class="text-capitalize" label>
              <v-icon left>mdi-note-edit</v-icon>{{adv.type}}
            </v-chip>
            <v-chip class="text-capitalize" label>
              <v-icon left>mdi-cash</v-icon>{{adv.wages}}$
            </v-chip>
            <v-chip class="text-capitalize" label>
              <v-icon left>mdi-clock</v-icon>{{adv.working_time}}h/week
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" @keyup="dialog=false" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined text v-bind="attrs" v-on="on" :disabled="$strapi.user ? false : true">
            Apply
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Apply form</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row v-if="!this.$strapi.user">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Full Name" required color="white"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Email" required color="white"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Phone" required color="white"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field id="message" v-model="message" label="Message" required color="white"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog=false">
              Close
            </v-btn>
            <v-btn outlined color="white" @click="handleForm(adv.company.id, adv.id)">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn outlined dark @click="reveal = !reveal">Learn More</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
        <v-card-text class="pb-0">
          <p class="text-h5 text--primary">
            Description
          </p>
          <p>{{adv.full_desc}}</p>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      reveal: false,
      dialog: false,
      message: "",
    }),
    methods: {
      handleClick() {
        console.log("click")
      },
      async handleForm(company_id, adv_id) {
        if (this.$strapi.user) {
          try {
            await this.$strapi.$http.$post(`/companies/${company_id}/apply`, {
                message: this.message,
                adv_id: adv_id
              })
              .then(response => console.log(response))
          } catch (error) {
            console.log(error)
          }
        }
      },
    },
    props: ['adv'],
  }

</script>
