<template>
  <div class="container">
    <LogoHero></LogoHero>
    <div class="content">
      <h1 class="has-text-centered">Services</h1>
    </div>
    <div class="scrollable">
        <div v-for="service in myServices" v-bind:key="service.id">
            <ServiceElement v-bind:service="service"></ServiceElement>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { iService } from "@/models/service.interface"
import ServiceElement from "@/components/Service.vue"
import LogoHero from "@/components/LogoHero.vue";
import axios,{ AxiosResponse } from 'axios';
import { APIConfig } from '@/utils/api.utils';

@Component({
  components: { ServiceElement, LogoHero }
})
export default class ServicesPage extends Vue {
  myServices: iService[] = [];

  mounted() {
    axios.get(APIConfig.buildUrl("/services")).then((res: AxiosResponse<iService[]>) => {
      if (res.status == 200) {
        this.myServices = res.data;
      }
    })
  }
}
</script>