<template>
  <WindowApp>
    <div v-if="errored" class="text-error">
      <p>
        Not able to retrieve this information at the moment. <br />
        Please try again later.
      </p>
    </div>

    <div v-else>
      <div v-if="loading" id="loading-progress">
        <v-progress-circular indeterminate color="b4b4b4"></v-progress-circular>
      </div>

      <div v-else>
        <div id="image-container">
          <v-img id="pic" :src="info.url" contain="false" />
        </div>

        <div>
          <h2 id="title">
            {{ info.title }}
          </h2>

          <p id="exp">
            {{ info.explanation }}
          </p>

          <div id="info">
            <div>
              <p id="date">
                {{ info.date }}
              </p>
            </div>

            <div>
              ©
              <span v-if="info.copyright" id="copyright">
                {{ info.copyright }}
              </span>

              <span v-else id="copyright"> NASA </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WindowApp>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: [],
      loading: true,
      errored: false,
    };
  },
  mounted() {
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then((response) => (this.info = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="scss">
.owd-window-apod .owd-window__content {
  overflow-y: auto;
}
</style>

<style scoped lang="scss">
p {
  margin: 0;
  color: #aaa;
}

h2 {
  margin-bottom: 6px;
}

#main-container {
  padding: 0;
  overflow-y: auto;
}
#loading-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#image-container {
  height: 100%;
  margin-bottom: 12px;
}
#exp {
  margin-bottom: 12px;
}
#info {
  display: grid;
  grid-template-columns: 20% 80%;
}

.text-error {
  position: relative;
  top: 45%;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>