<template>
  <div id="home">
    <LogoHero></LogoHero>
    <div class="columns" style="padding-top: 100px;">
      <AboutUs></AboutUs>
      <Info></Info>
      <HomeList></HomeList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeList from "@/components/Announcement/HomeList.vue";
import AboutUs from "@/components/Home/AboutUs.vue";
import Info from "@/components/Home/Info.vue";
import LogoHero from "@/components/LogoHero.vue";

@Component({
  components: {
    HomeList,
    AboutUs,
    Info,
    LogoHero
  }
})
export default class Home extends Vue {}
</script>
