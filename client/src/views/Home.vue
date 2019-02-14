<template>
  <!-- This div contains the information columns. Has a div for About Us, Hours & Location, and Announcements -->
  <div
    id="home"
    style="display: flex; justify-content: space-evenly; padding-top:
            20px;"
  >
    <!-- About Us  -->
    <AboutUs></AboutUs>

    <!-- Hours & Location  -->
    <Info></Info>

    <!-- Announcements  -->
      <HomeAnnouncements></HomeAnnouncements>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeAnnouncements from "@/components/Home/Announcements.vue";
import AboutUs from '@/components/Home/AboutUs.vue';
import Info from '@/components/Home/Info.vue'

@Component({
  components: {
    HomeAnnouncements,
    AboutUs,
    Info
  }
})
export default class Home extends Vue {}
</script>

<style>
.home-entry {
  border-color: dimgray;
  border-width: 4px;
}
.title {
  text-align: center
}
.h-column {
  display: flex; 
  flex-direction: column; 
  padding-left: 25px;
  padding-right: 25px;
}
.column-center {
  border-left-width: 2px;
  border-right-width: 2px;
  border-color: gray;
}
</style>
