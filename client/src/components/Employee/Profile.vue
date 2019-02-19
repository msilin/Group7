<template>
  <div class="profile columns">
    <div class="column">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="first name" v-model="user.firstName">
        </div>
      </div>
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="last name" v-model="user.lastName">
        </div>
      </div>
      <div class="field">
        <label class="label">Email Address</label>
        <div class="control">
          <input
            class="input"
            type="email"
            required
            placeholder="Email"
            v-model="user.emailAddress"
          >
        </div>
      </div>
      <div v-if="viewerPriveleges == 2" class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Permissions</label>
        </div>
        <div class="field-body">
          <div class="control">
            <label class="radio">
              <input type="radio" value="2" name="permission" v-model="user.userType">
              Admin
            </label>
            <label class="radio">
              <input type="radio" value="1" name="permission" v-model="user.userType">
              Employee
            </label>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="control">
          <button v-on:click="patchUser" class="button is-primary is-outlined">Save</button>
          &nbsp;
          <button v-on:click="cancel" class="button is-danger is-outlined">Cancel</button>
        </div>
      </div>
    </div>
    <div class="profilePhoto column">
      <form enctype="multipart/form-data" novalidate>
        <figure class="image" style="max-width: 15vw">
          <img :src="profileUrl">
        </figure>
        <div class="file">
          <label class="file-label">
            <input
              type="file"
              name="profilePhoto"
              :disabled="isSaving"
              v-on:change="filesChanged"
              accept="image/*"
              class="input-file file-input"
            >
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon icon="upload"/>
              </span>
              <span class="file-label">Upload Image…</span>
            </span>
          </label>
          <p v-if="isSaving">Uploading file...</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { APIConfig } from "@/utils/api.utils";
import { iUser, userType } from "@/models/index";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

@Component
export default class Profile extends Vue {
  error: string | boolean = false;
  fileCount: number = 0;
  currentStatus: number | null = null;
  uploadError: string | null = null;
  uploadedFile: any = null;
  viewerPriveleges: userType = userType.ANON;

  @Prop({ default: null })
  user!: iUser | null;

  patchUser() {
    this.error = false;
    if (this.user) {
      const url = `${APIConfig.url}/users/${this.user.id}`;
      axios
        .patch(url, {
          user: this.user
        })
        .then((response: AxiosResponse<iUser>) => {
          this.$emit("success");
        })
        .catch((errorResponse: any) => {
          this.error = errorResponse.response.data.reason;
        });
    }
  }

  cancel() {
    this.$router.back();
  }

  upload(formData: FormData) {
    if (this.user) {
      const url = `${APIConfig.url}/users/${this.user.id}`;
      return axios
        .post(url, formData, {
          headers: { token: this.$store.state.userToken }
        })
        .then((res: AxiosResponse<{ user: iUser }>) => {
          this.$store.dispatch("fetchUser", { userid: res.data.user.id });
        });
    }
    return Promise.reject({ response: "no user logged in" });
  }

  save(formData: FormData) {
    // upload data to the server
    this.currentStatus = STATUS_SAVING;
    this.upload(formData)
      .then(() => {
        this.currentStatus = STATUS_SUCCESS;
      })
      .catch(err => {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      });
  }

  filesChanged(event: any) {
    const name = event.target.name;
    const files = event.target.files;
    this.fileCount = event.target.files.length;
    // handle file changes
    const formData = new FormData();

    if (!files.length) return;

    // append the files to FormData
    Array.from(Array(files.length).keys()).map(x => {
      formData.append(name, files[x], files[x].name);
    });

    // save it
    this.save(formData);
  }

  reset() {
    // reset form to initial state
    this.currentStatus = STATUS_INITIAL;
    this.uploadError = null;
    this.viewerPriveleges = this.$store.state.user.userType;
  }

  mounted() {
    this.reset();
  }

  //computed
  get isInitial() {
    return this.currentStatus === STATUS_INITIAL;
  }

  get isSaving() {
    return this.currentStatus === STATUS_SAVING;
  }

  get isSuccess() {
    return this.currentStatus === STATUS_SUCCESS;
  }

  get isFailed() {
    return this.currentStatus === STATUS_FAILED;
  }

  get profileUrl(): string {
    if (this.user) {
      return APIConfig.buildUrl(`/${this.user.profileUrl}`);
    }
    return "";
  }
}
</script>
