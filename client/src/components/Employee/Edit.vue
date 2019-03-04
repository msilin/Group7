<template>
  <div class="edit columns">
    <div class="column">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="first name" v-model="firstName">
        </div>
      </div>
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="last name" v-model="lastName">
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
            v-model="email"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            required
            placeholder="Password"
            v-model="password"
          >
        </div>
      </div>
      <div v-if="viewerPriveleges == 2" class="field">
        <label class="label">Permissions</label>
        <div class="control">
          <label class="radio">
            <input type="radio" value="2" name="permission" v-model="userType">
            Admin
          </label>
          <label class="radio">
            <input type="radio" value="1" name="permission" v-model="userType">
            Employee
          </label>
        </div>
      </div>
      <div v-if="user" class="field is-horizontal">
        <div class="control">
          <button v-on:click="patchUser" class="button is-primary is-outlined">Update</button>
          &nbsp;
          <button v-on:click="$emit('cancel')" class="button is-danger is-outlined">Clear</button>
        </div>
      </div>
      <div v-else class="field is-horizontal">
        <div class="control">
          <button v-on:click="postUser" class="button is-primary is-outlined">Save</button>
        </div>
      </div>
    </div>
    <div class="profilePhoto column">
      <form enctype="multipart/form-data" novalidate>
        <figure v-if="profileUrl!==''" class="image" style="max-width: 15vw">
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { APIConfig } from "@/utils/api.utils";
import { iUser, userType } from "@/models/index";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

@Component
export default class EditEmployee extends Vue {
  error: string | boolean = false;
  fileCount: number = 0;
  currentStatus: number | null = null;
  uploadError: string | null = null;
  uploadedFile: any = null;

  firstName: string = ""
  lastName: string = ""
  email: string = ""
  password: string = ""
  typeOfUser: userType = userType.ANON

  @Prop({ default: false })
  user!: iUser | false;

  @Prop()
  viewerPriveleges: userType = userType.ANON;

  refresh() {
    if (this.user != false && this.user != null) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.emailAddress;
      this.password = this.user.password;
      this.typeOfUser = this.user.userType;
    } else {
      this.firstName = ""
      this.lastName = ""
      this.email = ""
      this.password = ""
      this.typeOfUser = userType.ANON
    }
  }

  @Watch('user')
  handleUserChange(newUser: iUser, oldUser: iUser) {
    this.refresh();
  }

  patchUser() {
    if (this.user) {
      this.user.firstName = this.firstName
      this.user.lastName = this.lastName
      this.user.password = this.password
      this.user.emailAddress = this.email
      this.user.userType = this.typeOfUser
      this.$emit('update')
    } else {
      this.error = "Uh oh...."
    }
  }

  postUser() {
    if (this.user == false) {
      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.email,
        password: this.password,
        userType: this.typeOfUser
      }
      this.$emit('post', newUser)
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
  }

  mounted() {
    this.reset();
    this.refresh();
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
    if (this.user && this.user.profileUrl && this.user.profileUrl !== "") {
      return APIConfig.buildUrl(`/${this.user.profileUrl}`);
    }
    return "";
  }
}
</script>
