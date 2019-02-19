<template>
  <!-- This div contains the information columns. Has a div for About Us, Hours & Location, and Announcements -->
  <div id="home">
    <div class="columns" style="padding-top: 100px;">
      <AboutUs></AboutUs>
      <Info></Info>
      <HomeAnnouncements></HomeAnnouncements>
    </div>
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