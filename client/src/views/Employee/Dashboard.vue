<template>
    <div id="employee">
        {{user}}
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import { iUser } from '@/models/user.interface';
import { userType } from '@/models/userType.enum';

@Component({
    components: {
        //OrderQueue
        //MyOrders
    }
})
export default class Dashboard extends Vue {
    get user() {
        return this.$store.state.user;
    }

    mounted() {
        if(!this.$store.state.user) {
            this.$router.push({name: "home"})
        }
    }
}
</script>
