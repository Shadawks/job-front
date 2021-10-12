<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="1000px" @keyup.esc="dialog=!dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Create a job offer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Post a job offer
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="form.title" label="Title" counter="60" placeholder="React Senior Dev"
              :rules="titleRules" required></v-text-field>
            <v-textarea v-model="form.short_desc" filled label="Short description" :rules="shortDescRules" auto-grow
              required counter="100"></v-textarea>
            <v-textarea v-model="form.full_desc" :rules="fullDescRules" filled label="Full description" auto-grow
              required counter="500"></v-textarea>
            <v-text-field v-model="form.location" :rules="locationRules" label="Location" required></v-text-field>
            <v-text-field v-model="form.wages" :rules="wagesRules" label="Wages" type="number" required></v-text-field>
            <v-text-field v-model="form.working_time" :rules="workingTimeRules" label="Working time" type="number"
              required></v-text-field>
            <v-autocomplete v-model="form.type" :items="types" :rules="typeRules" clearable label="Type of contract"
              required>
            </v-autocomplete>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="success" class="mr-4" @click="validate">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        types: [
          "Permanent",
          "Temporary",
          "Intership",
          "Apprentice"
        ],
        valid: true,
        form: {
          title: "",
          short_desc: "",
          full_desc: "",
          wages: "",
          location: "",
          working_time: "",
          type: ""
        },
        shortDescRules: [(v) => !!v || 'Short description is required.'],
        fullDescRules: [(v) => !!v || 'Full description is required.'],
        locationRules: [(v) => !!v || 'Location is required.'],
        typeRules: [(v) => !!v || 'Type of contract is required.'],
        titleRules: [(v) => !!v || 'Title is required.', (v) => v.length > 10 || 'Title must be longer.'],
        wagesRules: [(v) => !!v || 'Wages is required.', (v) => parseInt(v) > 0 || 'Wages must be greater than 0.'],
        workingTimeRules: [(v) => !!v || 'Working time is required', (v) => parseInt(v) > 0 && parseInt(v) <= 120 ||
          'Working time must be between 1 and 120 hours per week.'
        ]
      }
    },
    methods: {
      async validate() {
        try {
          await this.$strapi.$http.$post(`/advertisements`, {
              title: this.form.title,
              short_desc: this.form.short_desc,
              full_desc: this.form.full_desc,
              wages: this.form.wages,
              location: this.form.location,
              working_time: this.form.working_time,
              type: this.form.type
            })
            .then(response => console.log(response))
        } catch (error) {
          console.log(error)
        }
        this.dialog = false
      }
    },
    middleware: ['recruiter'],
  }

</script>
