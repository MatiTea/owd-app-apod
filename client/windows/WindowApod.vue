<template>
  <WindowApp>
    <div v-if="errored">
      <p>
        Not able to retrieve this information at the moment, please try again
        later.
      </p>
    </div>

    <div v-else id="image-container">
      <v-img id="pic" :src="info.url" alt="A Year of Sunrises" height="100%" />
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
          <!-- se non è presente nulla: NASA -->
          ©
          <span id="copyright">
            {{ info.copyright }}
          </span>
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
      errored: false,
      image: true,
    };
  },
  mounted() {
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then((response) => (this.info = response.data))
      .catch(function (error) {
        // handle error
        console.log(error);
        this.errored = true;
      });
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
</style>