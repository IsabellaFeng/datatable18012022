import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify, { VTextField } from 'vuetify/lib';
import { UserVuetifyPreset } from 'vuetify';

Vue.use(Vuetify, {
  components: {
    VTextField
  }
});


const opts: Partial<UserVuetifyPreset> = {
  icons: {
    iconfont: 'mdiSvg' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  }
};

export default new Vuetify(opts);
