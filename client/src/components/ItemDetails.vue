<template>
    <div v-if="item">
        <div class="columns">
            <div class="column is-one-half">
                <img style="margin-bottom: 50px" v-bind:src="item.imageUrl">
            </div>
            <div class="column is-one-half">
                <div class="rows">
                    <div class="row" id="first">
                        {{item.name}} <div id="instr">{{inStoreOnly(item.instore)}}</div>
                    </div>
                    <div class="row" id="second">
                        ${{item.price}}
                    </div>
                    <div class="row" id="third">
                        {{item.desc}}
                    </div>
                    <div class="row" id="bottom">
                        In stock: {{item.stock}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class ItemDetails extends Vue {
    item: iItem | false = false;
    inStoreOnly(boolVal: boolean): string {
        if (boolVal) {
            return "IN-STORE PICK-UP ONLY";
        } else {
            return "";
        }
    }
    mounted() {
        this.fetchItem(this.$route.params.id)
        .then((item: iItem) => this.item = item);
    }

    fetchItem(id: string) {
        return axios
        .get(APIConfig.buildUrl(`/items/${id}`))
        .then((res: AxiosResponse<iItem>) => {
            return res.data;
        });
    }
}

</script>
<style scoped>
.is-one-half {
    display: flex;
    justify-content: center;
    height: 500px;
}
#first {
    font-size: 50px;
    font-weight: 600;
}
#first span {
    font-weight: 900;
    font-size: 30px;
}
#second {
    font-size: 25px;
}
#third {
    color: black;
}
#instr {
    font-size: 15px;
    color: red;
}
</style>