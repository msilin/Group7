<template>
    <div id="products">
        <h1>This works!</h1>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Products extends Vue {}
</script>