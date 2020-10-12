<template>
  <gmap-map
    ref="map"
    :center="center"
    :zoom="16"
    style="width: 100%; height: 100vh"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUi: false
    }"
    @zoom_changed="zoomChanged"
  >
    <gmap-info-window :options="clusterOptions" :position="clusterPos" :opened="clusterOpen" @closeclick="clusterOpen=false">
      <div class="test">
        <h1 v-for="(job, index) in jobs" :key="job.name">
          {{ index }} - {{ job.name }}
        </h1>
      </div>
    </gmap-info-window>
    <gmap-cluster @click="clickCluster">
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :shape="m"
        @click="toggleInfoWindow(m,index)"
      >
        <gmap-info-window :options="infoOptions" :position="infoWindowPos[index]" :opened="!!infoWindowOpen[index]" @closeclick="infoWindowOpen[index]=false">
          <div class="test">
            <h1>{{ m }}</h1>
            <router-link to="/resume">Sign up</router-link>
          </div>
        </gmap-info-window>
      </gmap-marker>
    </gmap-cluster>
  </gmap-map>
</template>
<script>
import { mapGetters } from 'vuex'

const markers = [
  {
    name: 'House of Aleida Greve',
    description: 'description 1',
    date_build: '',
    position: {
      lat: 40.730610,
      lng: -73.934242
    }
  },
  {
    name: 'House of Aleida Greve 2',
    description: 'description 1',
    date_build: '',
    position: {
      lat: 40.730610,
      lng: -73.935242
    }
  },
  {
    name: 'House of Aleida Greve 3',
    description: 'description 1',
    date_build: '',
    position: {
      lat: 40.730610,
      lng: -73.936242
    }
  }
]

export default {
  name: 'GoogleMap',
  data() {
    return {
      clusterPos: null,
      clusterOpen: false,
      infoWindowPos: [],
      infoWindowOpen: [],
      jobs: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -5
        }
      },
      clusterOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      center: {
        // lat: 41.0798646,
        // lng: -75.196896,
        lat: 40.730610,
        lng: -73.935242
      }
    }
  },
  computed: {
    ...mapGetters([
      'signedIn',
      'user',
      'markers'
    ])
  },
  created() {
    this.$store.dispatch('marker/fetchMarkers', markers)
  },
  mounted() {
    this.$refs.map.panTo({
      lat: 47.912867,
      lng: 106.910723
    })
  },
  methods: {
    zoomChanged(zoom) {
      this.clusterOpen = false
    },
    toggleInfoWindow: function(marker, index) {
      this.$set(this.infoWindowPos, index, marker.position)
      this.$set(this.infoWindowOpen, index, !this.infoWindowOpen[index])
    },
    clickCluster(c) {
      const jobs = []
      const markers = c.markers_
      this.clusterPos = c.center_
      for (let i = 0; i < markers.length; i++) {
        jobs.push(markers[i].shape)
      }
      this.clusterOpen = !this.clusterOpen
      this.jobs = jobs
    }
  }

}
</script>
