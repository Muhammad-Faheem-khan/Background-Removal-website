<template>
  <div>
    <v-row v-if="imgLoad" class="mt-10">
      <v-spacer class="hidden-on-sm-and-down"></v-spacer>
      <v-col class="col-md-6 d-flex flex-column align-center">
        <v-card>
          <v-img :src="previewFull" height="500" width="500" contain></v-img>
          <h3 class="text-h6 text-center py-2">Before</h3>
        </v-card>
        <v-btn
          depressed
          color="secondary"
          class="mt-8 py-5"
          @click="converterFunction"
        >
          Convert Image
        </v-btn>
      </v-col>
      <v-spacer class="hidden-on-sm-and-down"></v-spacer>
      <v-col class="col-md-6 d-flex flex-column align-center">
        <v-card>
          <v-img :src="bgremovedImg" height="500" width="500" contain></v-img>
          <h3 class="text-h6 text-center py-2">After</h3>
        </v-card>
        <a download :href="bgremovedImg" @click="downloadDone"
          ><v-btn depressed color="primary py-5" class="mt-8 py-5">
            Download
          </v-btn></a
        >
      </v-col>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
    </v-row>

    <div
      v-if="!imgLoad"
      class="d-flex justify-center align-center"
      style="height: 80vh"
    >
      <v-card class="p-10 upload-block d-flex flex-column">
        <v-icon size="100"> mdi-cloud-upload </v-icon>

        <v-btn large color="grey" class="mt-4 white--text rounded-pill">
          Upload
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
        <p class="align-self-center mt-4 text-decoration-underline">
          or drop your image
        </p>
        <input
          type="file"
          class="input-box"
          accept="image/png, image/jpeg"
          @change="fileUpload"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
import { store } from "@/store";
export default {
  name: "MainUI",
  data() {
    return {
      previewFull: null,
      imgLoad: false,
    };
  },
  computed: {
    bgremovedImg() {
      return store.state.returnedImg;
    },
  },
  methods: {
    fileUpload(e) {
      if (e.target.files) {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          this.previewFull = e.target.result;
          this.imgLoad = true;
        };
      }
    },
    converterFunction() {
      store.dispatch("removeBg", this.previewFull);
    },
    downloadDone(e) {
      if (this.bgremovedImg.length <= 0) {
        e.preventDefault();
      } else {
        this.imgLoad = false;
        store.state.returnedImg = "";
      }
    },
  },
};
</script>

<style scoped>
.upload-block {
  min-width: 20rem;
  border-radius: 2rem;
  padding: 2rem;
  position: relative;
}
.input-box {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  width: 20rem;
  height: 17rem;
  opacity: 0;
  cursor: pointer;
}
</style>