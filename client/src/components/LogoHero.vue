<template>
    <div class="hero">
      <div class="hero-body">
        <div class="container logo">
          <figure class="image">
            <router-link
                to="/"
                exact-active-class="is-active">
              <img src="@/assets/logo.png">
            </router-link>
          </figure>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class LogoHero extends Vue {}
</script>
