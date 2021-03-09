import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify); 
 
export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
    theme: {
        themes:
        {
            light: {
                background: colors.grey.lighten2,
                primary: '#506A87',
                past_orange: '#EB8300', 
                toolbartextcolor: '#f3f3f3',
                zehraninbuldugurenk: '#4B6480',
                itemactive: '#789FCC',
                cardtext: '#f3f3f3',
                seradey: '#506A87'
            },
            dark: {
                background: colors.shades.white,
                primary: '#506A87',
                past_orange: '#EB8300', 
                toolbartextcolor: '#f3f3f3',
                zehraninbuldugurenk: '#4B6480',
                itemactive: '#789FCC',
                cardtext: '#f3f3f3',
                seradey: '#506A87'
            },
            toolbartextcolor: '#f3f3f3'


            
        }
        
    },
    
    
});
