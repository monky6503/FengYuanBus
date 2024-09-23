<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import earth from '@/assets/homepage/navbar/earth.svg'
import circle from '@/assets/homepage/navbar/circle.svg'
import { useButtonStore } from '@/stores/store.js'

const language = ref(false)
const selectedIndex = ref(null)
const menuOpen = ref(false)

const changelanguage = () => {
  language.value = !language.value
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
const menus = [
  {
    title: '最新公告',
    links: [
      { text: '全部消息', url: '/newestannounce', state: 'all' },
      { text: '市區公車公告', url: '/newestannounce', state: 'bus' },
      { text: '國道客運公告', url: '/newestannounce', state: 'interbus' }
    ]
  },
  {
    title: '路線查詢',
    links: [
      { text: '市區公車', url: '/businfo', state: 'bus' },
      { text: '豐原-臺北', url: '/businfo', state: 'taipei' }
    ]
  },
  {
    title: '旅客服務',
    links: [
      { text: '旅客遺失物招領', url: '/lostproperty' },
      { text: '旅客運送契約', url: '/travelercontract' },
      { text: '意見信箱', url: '/contactus' }
    ]
  },
  {
    title: '公司資訊',
    links: [
      { text: '關於豐客', url: '/aboutus' },
      { text: '與豐客聯繫', url: '/connectfy' },
      { text: '人才招募', url: '/recruitment' }
    ]
  },
  {
    title: '相關服務',
    links: [
      { text: '豐客旅行社', url: '/travelfy' },
      { text: '遊覽車出租', url: '/' },
      { text: '車輛代檢廠', url: '/buscheck' },
      { text: '主管機關宣導計畫', url: 'https://www.youtube.com/watch?v=GxAVRLbXJ9w' }
    ]
  }
]
const isOpen = (index) => {
  return selectedIndex.value === index
}

const toggle = (index) => {
  selectedIndex.value = selectedIndex.value === index ? null : index
}

const clearAllChecks = () => {
  selectedIndex.value = null
}
const handleDocumentClick = (event) => {
  if (!event.target.closest('.navbar')) {
    clearAllChecks()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
const buttonStore = useButtonStore()
const updateState = (btn) => buttonStore.updateSelectedState(btn)

const handleSwitchBtn = (btn) => buttonStore.updateSelectedBtn(btn)
</script>

<template>
  <nav
    class="w-full lg:h-[100px] h-[57px] bg-white flex justify-center items-center shadow-nav fixed z-[999]"
  >
    <div
      class="w-full md:w-[768px] lg:w-[992px] xl:w-[1200px] 2xl:w-[1400px] flex items-center justify-between lg:justify-center lg:gap-[42px] xl:gap-[70px] 2xl:gap-[110px] px-5 lg:px-0"
    >
      <div class="flex items-center justify-center gap-5">
        <RouterLink to="/">
          <picture>
            <source
              srcset="@/assets/homepage/navbar/logo(1200px).svg"
              alt=""
              media="(min-width:768px)"
            />
            <img
              src="@/assets/homepage/navbar/logo(375px).svg"
              class="lg:h-[37px] h-[22px]"
              alt=""
            />
          </picture>
        </RouterLink>
      </div>
      <div class="items-center gap-10 hidden lg:flex">
        <div
          v-for="(item, index) in menus"
          :key="index"
          class="relative flex items-center"
          @click.stop
        >
          <input
            type="checked"
            :id="'announcementToggle' + (index + 1)"
            class="hidden"
            v-model="selectedIndex"
            :value="index"
            @click="toggle(index)"
          />
          <label
            :for="'announcementToggle' + (index + 1)"
            class="rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer hover:text-[#108313]"
            :class="selectedIndex === index ? 'text-[#108313]' : 'text-black'"
          >
            <span
              class="text-sm xl:text-base font-medium tracking-[1px] xl:tracking-[2px] leading-6"
            >
              {{ item.title }}
            </span>
            <i class="fa-solid fa-chevron-down text-[8px]"></i>
          </label>
          <ul
            class="absolute left-0 top-[62px] w-56 bg-white z-20 flex flex-col gap-[10px] pb-[15px]"
            :class="{
              'opacity-100 block': isOpen(index),
              'opacity-0 hidden': !isOpen(index)
            }"
            @click.stop
          >
            <li>
              <div class="flex">
                <div class="flag1"></div>
                <div class="flag2"></div>
                <div class="flag3"></div>
                <div class="flag4"></div>
              </div>
            </li>
            <li v-for="(link, linkIndex) in item.links" :key="linkIndex">
              <component
                :is="link.text === '主管機關宣導計畫' ? 'a' : 'RouterLink'"
                :to="link.text !== '主管機關宣導計畫' ? link.url : undefined"
                :href="link.text === '主管機關宣導計畫' ? link.url : undefined"
                class="flex items-center justify-between px-[13px] py-1 text-black hover:bg-gray-100 cursor-pointer"
                @click="
                  !link.state
                    ? null
                    : item.title === '最新公告'
                      ? updateState(link.state)
                      : handleSwitchBtn(link.state)
                "
                :target="link.text === '主管機關宣導計畫' ? '_blank' : undefined"
                :rel="link.text === '主管機關宣導計畫' ? 'noopener noreferrer' : undefined"
              >
                <div class="flex items-center gap-[10px]">
                  <img :src="circle" alt="" />
                  <span class="text-sm font-medium leading-[150%]">{{ link.text }}</span>
                </div>
                <i class="fa-solid fa-arrow-right text-[#108313]"></i>
              </component>
            </li>
          </ul>
        </div>
      </div>
      <div class="hidden lg:block">
        <button
          v-if="!language"
          @click="changelanguage()"
          class="bg-[#4F5ED2] text-white rounded-[10px] flex items-center justify-center gap-[5px] pt-[3px] pr-[10px] pb-1 pl-[5px]"
        >
          <img :src="earth" alt="" />
          <span class="text-sm font-medium leading-6 hidden xl:block">繁體中文</span>
          <span class="text-sm font-medium leading-6 block xl:hidden">中</span>
        </button>
        <button
          v-else
          @click="changelanguage()"
          class="bg-[#108313] text-white rounded-[10px] flex items-center justify-center gap-[5px] pt-[3px] pr-[10px] pb-1 pl-[5px]"
        >
          <img :src="earth" alt="" />
          <span class="text-sm font-medium leading-6 tracking-[1px] hidden xl:block">English</span>
          <span class="text-sm font-medium leading-6 block xl:hidden">EN</span>
        </button>
      </div>
      <div class="block lg:hidden">
        <div>
          <button @click="toggleMenu" class="menu-button">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div
            v-if="menuOpen"
            class="fixed inset-0 bg-black bg-opacity-50 z-10"
            @click="closeMenu"
          ></div>
          <div
            class="h-[80%] fixed left-0 right-0 bottom-0 bg-white z-20 p-4 shadow-lg rounded-tl-[15px] rounded-tr-[15px] transition-all linear duration-500"
            :class="{ 'translate-y-full': !menuOpen, 'translate-y-0': menuOpen }"
            :style="{ transform: `translateY(${menuOpen ? '0%' : '100%'})` }"
          >
            <div class="flex justify-between">
              <button @click="closeMenu">
                <i class="fa-solid fa-times text-[19px]"></i>
              </button>
              <div class="block lg:hidden">
                <button
                  v-if="!language"
                  @click="changelanguage()"
                  class="bg-[#4F5ED2] text-white rounded-[40px] flex items-center justify-center gap-[5px] pt-[3px] px-[9px] pb-1"
                >
                  <img :src="earth" alt="" />
                  <span class="text-sm font-medium leading-6">繁體中文</span>
                </button>
                <button
                  v-else
                  @click="changelanguage()"
                  class="bg-[#108313] text-white rounded-[40px] flex items-center justify-center gap-[5px] pt-[3px] px-[9px] pb-1"
                >
                  <img :src="earth" alt="" />
                  <span class="text-sm font-medium leading-6 tracking-[1px]">English</span>
                </button>
              </div>
            </div>
            <div
              v-for="(item, index) in menus"
              :key="index"
              class="w-full relative flex flex-col items-center border-b-2 pb-[15px]"
              @click.stop
            >
              <input
                type="checked"
                :id="'announcementToggle' + (index + 1)"
                class="hidden"
                v-model="selectedIndex"
                :value="index"
                @click="toggle(index)"
              />
              <label
                :for="'announcementToggle' + (index + 1)"
                class="w-full text-sm font-medium flex items-center justify-between pt-[15px] gap-2 cursor-pointer hover:text-[#108313]"
                :class="selectedIndex === index ? 'text-[#108313]' : 'text-black'"
              >
                <span
                  class="text-sm xl:text-base font-medium tracking-[1px] xl:tracking-[2px] leading-6"
                >
                  {{ item.title }}
                </span>
                <i class="fa-solid fa-chevron-down text-[8px]"></i>
              </label>
              <ul
                class="w-full bg-white z-20 flex flex-col gap-[10px] pt-[13px] pb-[15px]"
                :class="{
                  'opacity-100 block': isOpen(index),
                  'opacity-0 hidden': !isOpen(index)
                }"
                @click.stop
              >
                <li>
                  <div class="flex">
                    <div class="w-1/4 h-[2px] bg-[#fc0e1e]"></div>
                    <div class="w-1/4 h-[2px] bg-[#108313]"></div>
                    <div class="w-1/4 h-[2px] bg-[#0518bf]"></div>
                    <div class="w-1/4 h-[2px] bg-[#f5d32f]"></div>
                  </div>
                </li>
                <li v-for="(link, linkIndex) in item.links" :key="linkIndex">
                  <component
                    :is="link.text === '主管機關宣導計畫' ? 'a' : 'RouterLink'"
                    :to="link.text !== '主管機關宣導計畫' ? link.url : undefined"
                    :href="link.text === '主管機關宣導計畫' ? link.url : undefined"
                    class="flex items-center justify-between px-[13px] py-1 text-black hover:bg-gray-100 cursor-pointer"
                    @click="
                      !link.state
                        ? null
                        : item.title === '最新公告'
                          ? updateState(link.state)
                          : handleSwitchBtn(link.state)
                    "
                    :target="link.text === '主管機關宣導計畫' ? '_blank' : undefined"
                    :rel="link.text === '主管機關宣導計畫' ? 'noopener noreferrer' : undefined"
                  >
                    <div class="flex items-center gap-[10px]">
                      <img :src="circle" alt="" />
                      <span class="text-sm font-medium leading-[150%]">{{ link.text }}</span>
                    </div>
                    <i class="fa-solid fa-arrow-right text-[#108313]"></i>
                  </component>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
<style scoped>
.flag1 {
  width: 35px;
  height: 6px;
  background-color: #fc0e1e;
  clip-path: polygon(0 0, 82% 0, 100% 100%, 0 100%);
  margin-right: -6.5px;
}
.flag2 {
  width: 35px;
  height: 6px;
  background-color: #108313;
  clip-path: polygon(0 0, 82% 0, 100% 100%, 18% 100%);
  margin-right: -6.5px;
}
.flag3 {
  width: 35px;
  height: 6px;
  background-color: #0518bf;
  clip-path: polygon(0 0, 82% 0, 100% 100%, 18% 100%);
  margin-right: -6.5px;
}
.flag4 {
  width: 35px;
  height: 6px;
  background-color: #f5d32f;
  clip-path: polygon(0 0, 82% 0, 100% 100%, 18% 100%);
}
</style>
