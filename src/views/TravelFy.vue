<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/homepage/NavBar.vue'
import FooterView from '@/components/homepage/FooterView.vue'
</script>

<template>
  <NavBar />
  <div clas=" lg:pt-[100px] pt-[57px]">
    <img src="@/assets/traveling/travelfy.svg" alt="" class="mx-auto" />
  </div>
  <FooterView />
  <RouterView />
</template>
