<script setup>
import logo1200 from '@/assets/homepage/navbar/logo(1200px).svg'
import logo768 from '@/assets/homepage/footer/logo(768px).svg'
import slogan1200 from '@/assets/homepage/footer/slogan(1200px).svg'
import slogan992 from '@/assets/homepage/footer/slogan(992px).svg'

import icon375 from '@/assets/homepage/footer/icon(375px).svg'
import logowi375 from '@/assets/homepage/footer/logowithouticon(375px).svg'
</script>

<template>
  <footer class="w-full bg-[#EFEFEF] mt-16">
    <div class="relative xl:w-[1200px] 2xl:w-[1400px] mx-auto">
      <div class="w-full h-[190px] flex items-center justify-center md:justify-between mx-auto">
        <div
          class="flex flex-col lg:flex-row items-center gap-[17px] lg:gap-[31px] xl:gap-[60px] py-[22px] md:py-0 md:pl-[70px] xl:pl-[100px]"
        >
          <div class="md:self-start">
            <img :src="logo1200" alt="" class="w-[278.51px] hidden lg:block" />
            <img :src="logo768" alt="" class="hidden md:block lg:hidden" />
            <div class="flex flex-col gap-[17px] items-center md:hidden">
              <img :src="icon375" alt="" class="w-[34.56px]" />
              <img :src="logowi375" alt="" />
            </div>
          </div>
          <div
            class="text-gray-600 text-center self-start md:text-start text-[10px] md:text-xs lg:text-sm leading-[18px] md:leading-6 font-medium"
          >
            <p>住&nbsp;&nbsp;&nbsp;址&nbsp;|&nbsp;臺中市豐原區三民路46號</p>
            <div class="hidden md:block">
              <p>電&nbsp;&nbsp;&nbsp;話&nbsp;|&nbsp;04-25234175</p>
              <p>傳&nbsp;&nbsp;&nbsp;真&nbsp;|&nbsp;04-25281621</p>
            </div>
            <p class="md:hidden flex gap-2">
              <span>電&nbsp;&nbsp;&nbsp;話&nbsp;|&nbsp;04-25234175</span>
              <span>傳&nbsp;&nbsp;&nbsp;真&nbsp;|&nbsp;04-25281621</span>
            </p>
            <p>Email&nbsp;|&nbsp;service@fybus.com.tw</p>
          </div>
        </div>
        <div class="hidden md:flex items-center justify-center self-end pb-[50px] pr-[99px]">
          <picture>
            <source :srcset="slogan1200" alt="" class="self-end" media="(min-width:1200px)" />
            <img :src="slogan992" alt="" class="self-end" />
          </picture>
        </div>
      </div>
      <picture
        class="absolute md:left-[60%] lg:left-[55%] xl:left-[48%] 2xl:left-[51%] md:-top-[17%] lg:-top-[48%] xl:-top-[50%] 2xl:-top-[62%] z-30"
      >
        <source srcset="@/assets/homepage/footer/flaglogo.svg" alt="" media="(min-width:1400px)" />
        <source
          srcset="@/assets/homepage/footer/flaglogo(1200px).svg"
          alt=""
          media="(min-width:1200px)"
        />
        <source
          srcset="@/assets/homepage/footer/flaglogo(992px).svg"
          alt=""
          media="(min-width:992px)"
        />
        <source
          srcset="@/assets/homepage/footer/flaglogo(768px).svg"
          alt=""
          media="(min-width:768px)"
        />
        <img src="" alt="" />
      </picture>
    </div>
    <div class="w-full bg-green-700">
      <div
        class="xl:w-[1200px] 2xl:w-[1400px] h-10 md:h-[37px] lg:pr-[33px] pr-0 mx-auto flex justify-center md:justify-center lg:justify-end items-center"
      >
        <p class="text-white text-[10px] lg:text-xs font-light hidden md:block">
          豐原汽車客運股份有限公司 © Fengyuan Bus Transportation Co., Ltd. All Rights Reserved.
        </p>
        <p
          class="flex md:hidden flex-col items-center text-white text-[10px] font-light leading-[150%] -tracking-[1%]"
        >
          <span>豐原汽車客運股份有限公司 ©</span>
          <span> Fengyuan Bus Transportation Co., Ltd. All Rights Reserved. </span>
        </p>
      </div>
    </div>
  </footer>
</template>
