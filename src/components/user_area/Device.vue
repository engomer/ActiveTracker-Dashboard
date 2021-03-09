<template>
  <v-container justify-center class="device myFont">
    <v-card  class="pa-5 ma-10">
      <v-card-title>
        Active Devices
      </v-card-title>
      <v-btn @click="popAdd()" class="btn primary">Add Device</v-btn>
      <v-card-text>
        <v-item-group>
          <v-row>
            <v-col v-for="(devic,idx) in devices" :key="idx" cols="12" md="4" v-model="colnum">
              <v-item v-slot="toggle">
                <v-card class="ma-1" @click="{{toggle, setCol(idx)}}" :color="devic.color">
                  <v-card-text color="cardtext">
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <p>Device Name</p>
                        </v-list-item-title>
                        <v-text-field readonly placeholder="" v-model="devic.name"></v-text-field>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <p>API Key</p>
                        </v-list-item-title>
                        <v-text-field readonly placeholder="" v-model="devic.uuid"></v-text-field>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
                </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-card-text>
    </v-card>
    <v-dialog v-model="add_pop" max-width="60%">
      <v-card class="justify-center d-block">
        <v-card-title>
          Create New Device
        </v-card-title>
        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-text-field placeholder="Device Name" v-model="dev_name"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field placeholder="Generate or write API key..." v-model="uuid"></v-text-field>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click="generateUUID()" class="btn primary">Generate</v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-combobox
              v-model="model"
              :filter="filter"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              label="Add data labels"
              hide-selected
              multiple
              small-chips
              solo
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip
                    :color="`${colors[nonce - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected}">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.color} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    Name: {{ item.text }}
                  </span><span class="pr-2">
                    ,
                  </span>
                  <span class="pr-2">
                    Type: {{ item.type }}
                  </span>
                  <v-icon
                    small
                    @click="parent.selectItem(item);remove(item);"
                  >
                    close
                  </v-icon>
                </v-chip>
              </template>
            </v-combobox>
          </v-list-item>
          <v-list-item>
            <v-btn @click="createDevice()" class="btn primary">Create</v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-action-text v-show="done_pop">Done</v-list-item-action-text>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog d-block class="block" v-if="show_pop" v-model="show_pop" max-width="60%">
      <v-card class="justify-center d-block">
        <v-card-title>
          Device Properties
        </v-card-title>
        <v-card-text>
            <v-row>  
              <v-col>Name:</v-col>
              <v-col>
                <v-text-field  class="d-table" placeholder="Generate or write API key..." v-model="devices[colnum].name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>  
              <v-col>Key:</v-col>
              <v-col>
                <v-text-field readonly  class="d-table" placeholder="Generate or write API key..." v-model="devices[colnum].uuid"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
              Metadata
              </v-col>
              <v-row>
                <v-col v-for="(metas,idx1) in devices[colnum].metadata" :key="idx1" cols="12" md="4">
                  <v-card class="ma-3">
                    <v-card-text color="cardtext">
                      <v-row>
                        <v-col>
                          Name:
                        </v-col>
                        <v-col>
                          <v-text-field placeholder="" v-model="metas.name"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          Type:
                        </v-col>
                        <v-col>
                          <v-text-field placeholder="" v-model="metas.type"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-row>
            <v-row justify="center">
              <v-btn  @click="updateDevice()" class="btn primary pa-4 ma-1">Update</v-btn>

              <v-btn  @click="deleteDevice()" class="btn past_orange pa-4 ma-1">Delete</v-btn>

            </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    
  </v-container>
</template>
<script>
  import axios from 'axios';
  import store from '@/store.js'
  export default {
    data: () => ({
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange', 'blue', 'pink'],
      editing: null,
      uuid: null,
      meta_data: [],
      colnum: null,
      show_pop: false,
      isadded: null,
      add_pop: false,
      dev_name: null,
      done_pop: false,
      editingIndex: -1,
      items: [
        { header: 'Add label' },
        
      ],
      devices: [],
      nonce: 1,
      menu: false,
      model: [
      ],
      x: 0,
      search: null,
      y: 0,
    }),

    watch: {
      show_pop : function()
      {
        if(this.show_pop == false)
        {
          this.getDevice();
        }
      },
      add_pop : function()
      {
        if(this.add_pop == false)
        {
          this.getDevice();
        }
      },
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            
            v = {
              text: v.split(",")[0],
              color: this.colors[this.nonce - 1],
              type: v.split(",")[1]
            }

            this.items.push(v)
            this.nonce++
          }

          return v
        })
      },
      
    },
    beforeCreate(){
      store.user = localStorage.user;
      store.password = localStorage.password;
    },
    mounted(){
      this.getDevice();
    },
    methods: {
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
      popAdd(){
        this.add_pop = true;
      },
      setCol(i)
      {
        this.colnum = i;
        this.show_pop = true;
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      generator() {
          var colorr = '#' + (Math.random()*0xFFFFFF<<0).toString(16);
          return colorr;
      },
      generateUUID() {
        var d = new Date().getTime();
        if( window.performance && typeof window.performance.now === "function" )
        {
          d += performance.now();
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
          });
        
        this.uuid = uuid;
      },
      getDevice() {
        this.devices = [];
        const data_user = {
          "username" : store.user,
          "password" : store.password
        };
        const options = {
          headers: {"Content-Type" : "application/json"}
        };
        axios.post('http://activetrackerv1.herokuapp.com/api/user/getapi.php',data_user,options)
        .then(response => {
          for(var i = 0; i< response.data.length; i++)
          {
            var meta = JSON.parse(response.data[i].metadata);
            var v = {
              "name" : response.data[i].device,
              "uuid" : response.data[i].uuid,
              "metadata": meta,
              color: this.generator()
            };

            this.devices.push(v); 
          }
        });
      },
      remove(i)
      {
        this.items.splice(this.items.indexOf(i),1);
      },
      createDevice(){
        for(var item in this.items)
        {
          if(!this.items[item].header)
          {
            this.meta_data.push({name: this.items[item].text, type: this.items[item].type});
          }
        }
        const data_user =  {
            "uuid": this.uuid,
            "user": store.user,
            "password": store.password,
            "device" : this.dev_name,
            "metadata": this.meta_data
          };
        const options = {
          headers: {"Content-Type" : "application/json"},
          }
        axios.post('http://activetrackerv1.herokuapp.com/api/user/addapi.php',data_user,options)
        .then(response => {
            if(response.status == 200){
              this.done_pop = true;
              this.isadded = true;
              this.add_pop = false;
            }
        })
      },
      deleteDevice(){
        var tempDev = this.devices[this.colnum];
        const data_user =  {
          "uuid": tempDev.uuid,
          "username": store.user,
          "password": store.password
        };
        const options = {
          headers: {"Content-Type" : "application/json"},
        };
        axios.post('http://activetrackerv1.herokuapp.com/api/user/deleteDevice.php',data_user,options)
        .then(response => {
          if(response.status == 200){
            this.show_pop = false;
          }
        })
      },
      updateDevice(){
        var tempDev = this.devices[this.colnum];
        const data_user =  {
          "uuid": tempDev.uuid,
          "username": store.user,
          "password": store.password,
          "metadata": tempDev.metadata,
          "device": tempDev.name
        };
        const options = {
          headers: {"Content-Type" : "application/json"},
        };
        axios.post('http://activetrackerv1.herokuapp.com/api/user/updateDevice.php',data_user,options)
        .then(response => {
          if(response.status == 200){
            this.show_pop = false;
          }
        })
      }
      
    },
  }
</script>