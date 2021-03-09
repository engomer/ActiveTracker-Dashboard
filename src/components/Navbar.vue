<template>
    
    <nav>
        <v-toolbar color='zehraninbuldugurenk'>
            
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click.stop="drawer = !drawer"
                permanent right
            ></v-app-bar-nav-icon>
            <v-container class="text-center toolbartextcolor--text"><h2>Active Tracker v2</h2></v-container>
        </v-toolbar>
        <v-navigation-drawer v-model="drawer" width="150"   :mandatory="$vuetify.breakpoint.mdAndUp" color='#f3f3f3' app>
            <v-list>
                <v-list-item class="mb-15">
                    <v-list-item-action></v-list-item-action>
                </v-list-item>
            </v-list>
            <v-list flat>
                <v-list-item router to="/Dashboard">
                    <v-list-item-content>
                        <v-icon class="mb-2">dashboard</v-icon>
                        <v-list-item-subtitle align="center">Dashboard</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item router to="/Device">
                    <v-list-item-content>
                        <v-icon class="mb-2">build</v-icon>
                        <v-list-item-subtitle align="center">Device <br/>Managament</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item router to="/Profile">
                    <v-list-item-content>
                        <v-icon class="mb-2">person</v-icon>
                        <v-list-item-subtitle align="center">Profile</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="toggle();" >
                    <v-list-item-content>
                        <v-icon class="mb-2">power_settings_new</v-icon>
                        <v-list-item-subtitle align="center">Logout</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

    </nav>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Navbar',
  components: {
  },
  data(){
      return{
        drawer: null
    }
  },
  methods: {
      toggle()
      {
          console.log("ye");
          localStorage.redirect = false;
          localStorage.user = null;
          localStorage.password = null;
          this.$router.push("/login");
      }
  }
}
</script>
