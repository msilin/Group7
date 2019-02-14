<template>
  <!-- This div contains the information columns. Has a div for About Us, Hours & Location, and Announcements -->
  <div
    id="home"
    style="display: flex; justify-content: space-evenly; padding-top:
            20px;"
  >
    <!-- About Us  -->
    <div style="display: flex; flex-direction: column;
                padding: 50px;">
      <h2 style="text-align: center">ABOUT US</h2>
      <img
        src="@/assets/aboutUs.jpeg"
        style="height: 183; width: 275;
                    align-self: center; padding-top: 20px"
      >
      <p style="width: 300px; padding-top: 20px">
        Located on Foothill Boulevard, we are
        the
        closest bike shop
        to Cal Poly, a quick ride from Downtown San Luis Obispo, and
        an easy commute from Cuesta College.
      </p>
      <p style="width: 300px">
        No bike rack? No Problem! If you can't
        get
        your bike to us,
        we'll come to you! We offer pickup and delivery for repairs
        and new bike purchases! Contact us for details.
      </p>
    </div>

    <!-- Hours & Location  -->
    <div
      style="display: flex; flex-direction: column; padding: 50px;
                border-left: 2px solid gray; border-right: 2px solid
                gray; align-items: center"
    >
      <h2>HOURS</h2>
      <p>Monday to Friday 10 AM - 6 PM</p>
      <p>Saturday 10 AM - 5 PM</p>
      <p>Sunday 12 PM - 5 PM</p>
      <h2 style="padding-top: 20px">LOCATION</h2>
      <p>767 East Foothill Blvd Ste B</p>
      <p style="padding-bottom: 20px">San Luis Obispo, CA 93405</p>

      <img
        src="@/assets/location.png"
        style="height: 300; width: 300;
                    align-self: center"
      >
    </div>

    <!-- Announcements  -->
    <div style="display: flex; flex-direction: column; padding: 50px">
      <h2 style="text-align: center">ANNOUNCEMENTS</h2>
      <br>
      <p>THESE ARE ANNOUNCEMENTS!!!!</p>
      <br>
      <p>MORE ANNOUNCEMENTS!!!!</p>
      <br>
      <p>ANOTHER ANNOUNCEMENT!!!!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeAnnouncements from "@/components/HomeAnnouncements.vue";
export default class Home extends Vue {}
</script>
