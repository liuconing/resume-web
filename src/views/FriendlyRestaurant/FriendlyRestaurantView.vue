<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { useFriendlyStore } from '@/queries/useFriendlyStore'
import Loading from '@/components/Loading.vue'
const searchKey: Array<string> = [
  'Free WiFi',
  '便利支付',
  '友善廁所',
  '哺集乳友善',
  '性別友善',
  '日文友善',
  '無障礙友善',
  '穆斯林友善',
  '素食友善',
  '英文友善',
  '行動裝置充電',
  '韓文友善',
  '自行車友善',
  '公平貿易友善',
  '月經友善'
]
const selectItem = ref<string>('請選擇友善項目')
const { data: friendlyStore, isLoading, refetch } = useFriendlyStore(selectItem)
const center = ref<Array<number>>([120.8802849418061, 23.713189243519583])
const centerRef = ref<any>([])
const projection = ref<string>('EPSG:4326')
const zoom = ref<number>(8)
const rotation = ref<number>(0)
const selectedFeature = ref<any>(null)
watch(selectItem, () => {
  refetch()
})
watchEffect(() => {
  if (!isLoading.value && friendlyStore.value) {
    centerRef.value = friendlyStore.value.map((item: any) => {
      const feature = new Feature({
        geometry: new Point([item['經度'] * 1, item['緯度'] * 1])
      })
      feature.setProperties(item)
      return feature
    })
  }
})
const handleMapClick = async (event: any) => {
  const feature = event.map.forEachFeatureAtPixel(event.pixel, (feature: any) => feature)
  if (feature) {
    selectedFeature.value = feature
  } else {
    selectedFeature.value = null
  }
}
</script>
<template>
  <Loading v-if="isLoading" />
  <div class="flex flex-col">
    <h1 class="flex items-center justify-center text-3xl">友善商店查詢</h1>
    <select name="cars" id="cars" class="w-full border-2 border-black p-3" v-model="selectItem">
      <option value="請選擇友善項目" selected>請選擇友善項目</option>
      <option v-for="(item, key) in searchKey" :value="item" :key="key">
        {{ item }}
      </option>
    </select>
    <div class="flex" v-if="!isLoading">
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        @singleclick="handleMapClick"
        style="height: calc(100vh - 86px); width: 400px"
      >
        <ol-view
          ref="view"
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />
        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>
        <ol-vector-layer>
          <ol-source-cluster>
            <ol-source-vector :features="centerRef">
              <ol-feature v-for="(item, key) in centerRef" :key="key">
                <ol-geom-point
                  :coordinates="[item.values_['經度'] * 1, item.values_['緯度'] * 1]"
                />
              </ol-feature>
            </ol-source-vector>
          </ol-source-cluster>
          <ol-style>
            <ol-style-fill color="rgba(255,255,255,0.1)" />
            <ol-style-icon
              src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
              :scale="0.5"
            />
          </ol-style>
        </ol-vector-layer>
      </ol-map>
      <div v-if="selectedFeature" class="w-full w-">
        <ul>
          <li v-for="(item, key) in selectedFeature.values_.features" :key="key">
            <p v-if="item.values_['友善店家名稱']">店家名稱：{{ item.values_['友善店家名稱'] }}</p>
            <p v-if="item.values_['友善店家名稱']">簡介：{{ item.values_['簡介'] }}</p>
            <p v-if="item.values_['友善店家名稱']">地址：{{ item.values_['地址'] }}</p>
            <p class="mb-3" v-if="item.values_['友善店家名稱']">電話：{{ item.values_['電話'] }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
