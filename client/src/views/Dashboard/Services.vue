 <template>
  <div id="services">
    <EditService
      v-on:cancel="cancelEdit"
      v-on:post="postService"
      v-on:update="updateService"
      v-bind:editing="editing"
    ></EditService>
    <ServiceList
      v-on:delete="deleteService"
      v-on:edit="selectService"
      v-bind:serviceList="services"
    ></ServiceList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";
import { iService } from "@/models/index";
import ServiceList from "@/components/Service/List.vue";
import EditService from "@/components/Service/Edit.vue";

@Component({
  components: {
    ServiceList,
    EditService
  }
})
export default class Services extends Vue {
  editing: iService | false = false;
  services: iService[] = [];
  error: string | false = false;
  baseUrl = "/services";

  mounted() {
    this.fetchServices();
  }

  selectService(s: iService) {
    this.editing = s;
  }

  deleteService(s: iService) {
    const id = s.id;
    axios.delete(APIConfig.buildUrl(`${this.baseUrl}/${id}`)).then(res => {
      if (res.status === 200) {
        if (this.editing && this.editing.id === id) {
          this.editing = false;
        }
        this.services = this.services.filter(s => s.id !== id);
      } else {
        this.error = "Failed to delete service";
      }
    });
  }

  updateService(s: iService) {
    this.error = false;
    var id = s.id;
    axios
      .put(APIConfig.buildUrl(`${this.baseUrl}/${id}`), {...s})
      .then((res: AxiosResponse<iService>) => {
        this.services = this.services.filter(s => s.id !== res.data.id);
        this.services.push(res.data);
        this.sortServices();
        this.editing = false;
      })
      .catch(res => {
        this.error = res.response && res.response.data.error;
      });
  }

  postService(s: iService) {
      this.error = false;
      axios
      .post(APIConfig.buildUrl(this.baseUrl), {
          ...s
      })
      .then((res: AxiosResponse<iService>) => {
          this.services.push(res.data);
          this.sortServices();
          this.editing = false;
      })
      .catch(res => {
        this.error = res.response && res.response.data.error;
      });
  }

  cancelEdit() {
    this.editing = false;
  }

  fetchServices() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl(this.baseUrl))
      .then((res: AxiosResponse<iService[]>) => {
        this.services = res.data;
      });
  }

  sortServices() {
    this.services = this.services.sort(this.decreasingOrder);
  }

  decreasingOrder(a: iService, b: iService) {
    return b.id - a.id;
  }
}
</script>