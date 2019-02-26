<template>
  <span id="announcements">
    <EditAnnouncement
      v-on:cancel="cancelEdit"
      v-on:post="postAnnouncement"
      v-bind:editing="editing"
      v-on:update="patchAnnouncement"
    ></EditAnnouncement>
    <AdminList
    v-on:delete="deleteAnnouncement" 
    v-on:edit="selectAnnouncement"
    v-bind:announcements="announcements"></AdminList>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { APIConfig } from "@/utils/api.utils";
import axios, { AxiosResponse } from "axios";
import AdminList from "@/components/Announcement/AdminList.vue";
import EditAnnouncement from "@/components/Announcement/Edit.vue";
import { iAnnouncement } from "@/models/index";

@Component({
  components: {
    AdminList,
    EditAnnouncement
  }
})
export default class Announcements extends Vue {
  editing: iAnnouncement | false = false;
  announcements: iAnnouncement[] = [];
  error: string | false = false;
  baseUrl: string = "/announcements";

  mounted() {
    this.fetchAnnouncements();
  }

  selectAnnouncement(a: iAnnouncement) {
    this.editing = a;
  }

  deleteAnnouncement(a: iAnnouncement) {
    const id = a.id;
    axios.delete(APIConfig.buildUrl(`${this.baseUrl}/${id}`)).then(res => {
      if (res.status === 200) {
        if(this.editing && (this.editing.id === id)) {
          this.editing = false;
        }
        this.announcements = this.announcements.filter(a => a.id !== id);
      } else {
        this.error = "Failed to delete announcement";
      }
    });
  }

  patchAnnouncement(t: string, c: string) {
    this.error = false;
    var id;
    if(this.editing) {
      id = this.editing.id;
    } else {
      this.error = "Something went wrong...";
      return;
    }
    const a = {...this.editing, ...{'title': t, 'content': c}};
    axios
      .patch(APIConfig.buildUrl(`${this.baseUrl}/${id}`), {
        announcement: a
      })
      .then((res: AxiosResponse<iAnnouncement>) => {
        this.announcements = this.announcements.filter(
          a => a.id !== res.data.id
        );
        this.announcements.push(res.data);
        this.sortAnnouncements();
        this.editing = false;
      })
      .catch(res => {
        this.error = res.response && res.response.data.error;
      });
  }

  postAnnouncement(title: string, content: string) {
    axios
      .post(APIConfig.buildUrl(this.baseUrl), {
        newTitle: title,
        newContent: content
      })
      .then((res: AxiosResponse<iAnnouncement>) => {
        this.announcements.push(res.data);
        this.sortAnnouncements();
        this.editing = false;
      })
      .catch(res => {
        return null;
      });
  }

  cancelEdit() {
    this.editing = false;
  }

  fetchAnnouncements() {
    this.error = false;
    axios
      .get(APIConfig.buildUrl(this.baseUrl))
      .then((res: AxiosResponse<iAnnouncement[]>) => {
        this.announcements = res.data;
        this.sortAnnouncements();
      })
      .catch(res => {
        this.error = res.data;
      });
  }

  sortAnnouncements() {
    this.announcements = this.announcements.sort(this.decreasingOrder);
  }

  decreasingOrder(a: iAnnouncement, b: iAnnouncement) {
    return b.id - a.id;
  }
}
</script>
