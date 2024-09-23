<script setup>
import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import bus_1400 from '@/assets/contactus/bus_1400px.png'
import busnobg_1400 from '@/assets/contactus/busnobg_1400px.png'
import bus_1200 from '@/assets/contactus/bus_1200px.png'
import busnobg_1200 from '@/assets/contactus/busnobg_1200px.png'
import bus_768 from '@/assets/contactus/bus_768px.png'
import bus_375 from '@/assets/contactus/bus_375px.png'
</script>

<template>
  <NavBar />
  <div class="relative w-full h-[1204px] pb-[280px] lg:pt-[100px] pt-[57px] z-20">
    <div
      class="z-0 absolute left-0 top-[126px] w-full xl:w-[80%] h-[923px] rounded-e-0 xl:rounded-e-[30px] bg-white xl:bg-[#D2E3D3] xl:block hidden truncate"
    >
    </div>
    <div class="md:w-[602px] md:h-[200px] w-[343px] h-[146px] rounded-br-[100px] truncate">
      <img :src="bus_768" alt="" class="xl:hidden md:block hidden" />
      <img :src="bus_375" alt="" class="md:hidden" />
    </div>
    <div class="w-full h-auto xl:mt-0 -mt-[20px]">
      <div
        class="xl:absolute xl:z-20 xl:right-[600px] 2xl:right-[680px] xl:top-[190px] xl:w-[635px] xl:h-[659px] xl:pt-0 xl:pb-0 grid justify-items-center pt-[52px] pb-[126px] flex flex-col gap-[20px] bg-scroll bg-cover xl:bg-none bg-[url('@/assets/contactus/background.png')]"
      >
        <div
          class="md:w-[635px] w-[80%] font-semibold font-SerifTC md:text-[46px] text-[22px] md:leading-[60px] leading-[33px] md:px-[110px] px-[6.5%]"
        >
          聯絡我們
        </div>
        <div
          class="md:w-[635px] w-[80%] min-w-[314px] rounded-[30px] xl:rounded-e-[30px] bg-white md:px-[110px] px-[6.4%] py-[45px] shadow-lg xl:shadow-none"
        >
          <div class="font-SansTC flex flex-col md:gap-[33px] gap-[28px]">
            <div
              class="entryarea md:text-[16px] text-[14px] flex justify-between md:h-[27px] h-[22px]"
            >
              <div>
                <input type="text" class="text-input md:w-[260px] w-[66%]" required />
                <div class="labelline md:text-[16px] text-[14px]">姓名</div>
              </div>
              <div class="flex md:w-[82px] w-[20%]">
                <div
                  class="gender-show w-[50%] border-b-[1px] border-b-[#B3B3B3] flex justify-center"
                >
                  <input class="gender-input" type="radio" name="gender" id="gender1" hidden />
                  <label class="gender-label" for="gender1">男</label>
                </div>
                <div
                  class="gender-show w-[50%] border-b-[1px] border-b-[#B3B3B3] flex justify-center"
                >
                  <input
                    class="gender-input"
                    type="radio"
                    name="gender"
                    id="gender2"
                    checked
                    hidden
                  />
                  <label class="gender-label" for="gender2">女</label>
                </div>
              </div>
            </div>
            <div class="entryarea md:text-[16px] text-[14px]">
              <input type="text" class="text-input w-full md:h-[27px] h-[22px]" required />
              <div class="labelline md:mb-[5px] mb-[7px]">電子郵件</div>
              <div class="text-[#108313] text-[12px] leading-[13px]">
                ＊您反應的意見，本公司將以電子郵件回覆
              </div>
            </div>

            <div class="entryarea md:text-[16px] text-[14px]">
              <input type="text" class="text-input w-full md:h-[27px] h-[22px]" required />
              <div class="labelline md:mb-[5px] mb-[7px]">手機號碼</div>
              <div class="text-[#108313] text-[12px] leading-[13px]">
                ＊僅限於發送簡訊驗證碼使用，不留存或電話回覆
              </div>
            </div>

            <div class="entryarea md:text-[16px] text-[14px] flex justify-between">
              <div>
                <input type="text" class="text-input md:w-[194px] w-[50%]" required />
                <div class="labelline">簡訊驗證碼</div>
              </div>
              <button
                class="md:w-[205px] w-[47%] md:h-[30px] h-[27px] bg-[#108313] text-white md:rounded-[10px] rounded-[8px]"
              >
                發送驗證碼
              </button>
            </div>

            <div class="entryarea md:text-[16px] text-[14px] flex justify-between">
              <div>
                <input
                  type="text"
                  class="text-input md:w-[194px] w-[47%] md:h-[27px] h-[22px]"
                  required
                />
                <div class="labelline">主旨標題</div>
              </div>
              <select
                name="questionTpye-select"
                id=""
                class="questionTpye-select md:w-[205px] w-[50%]"
              >
                <option value="">選擇問題分類</option>
                <option value="1">列車班次及時間</option>
                <option value="2">車廂服務</option>
                <option value="3">訂票相關服務</option>
                <option value="4">車站設施</option>
                <option value="5">司機服務態度</option>
                <option value="6">轉乘服務</option>
                <option value="7">車站人員服務態度</option>
                <option value="8">其他</option>
              </select>
            </div>

            <div class="md:text-[16px] text-[14px]">
              <div class="md:h-[27px] h-[22px]">您的建議</div>
              <textarea
                name=""
                id="textarea"
                class="suggestion-input w-full"
                cols="5"
                maxlength="200"
                placeholder="上限200字"
                required
              ></textarea>
            </div>
            <div class="flex justify-between">
              <button class="md:w-[195px] w-[47%] h-[35px] bg-[#6B6B6B] text-white rounded-[10px]">
                清除
              </button>
              <button class="md:w-[195px] w-[47%] h-[35px] bg-[#108313] text-white rounded-[10px]">
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute z-10 right-0 top-[242px] 2xl:w-[768px] xl:w-[677px] h-[652px] rounded-s-[30px] truncate"
      >
        <picture class="inline-block w-full h-full">
          <img :src="bus_1400" alt="" class="hidden 2xl:block" />
          <img :src="bus_1200" alt="" class="hidden xl:block" />
        </picture>
      </div>
      <div class="absolute z-30 right-0 top-[242px] 2xl:w-[768px] xl:w-[677px] h-[652px] truncate">
        <picture>
          <img :src="busnobg_1400" alt="" class="hidden 2xl:block" />
          <img :src="busnobg_1200" alt="" class="hidden xl:block" />
        </picture>
      </div>
    </div>
    <div
      class="xl:z-0 xl:absolute xl:left-0 xl:top-[1049px] xl:w-[80%] h-[27px] px-[20px] xl:justify-end md:w-full flex justify-center md:text-[18px] text-[12px]"
    >
      <div>
        <span class="md:inline block md:w-full w-[314px]">回饋專線：0800-034175</span>
        <span class="md:inline hidden"> ｜ </span>
        <span class="md:inline block md:w-full w-[314px]"
          >服務時間：星期一至五 08:00–12:00／ 13:00–17:00</span
        >
      </div>
    </div>
  </div>

  <FooterView />
  <router-view />
</template>
<style scoped>
.gender-show {
  position: relative;
  border-bottom: 1px solid #b3b3b3;
}

.gender-input:checked + .gender-label::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: #108313;
  pointer-events: none; /* 确保伪元素不会影响鼠标事件 */
}

.entryarea {
  position: relative;
}

.entryarea .text-input {
  position: absolute;
  outline: none;
  line-height: 20px;
  background-color: transparent;
  padding: 2px 10px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #b3b3b3;
  transition: 0.1s ease;
  z-index: 1111;
}

.labelline {
  color: black;
  background-color: white;
  transition: 0.2s ease;
  z-index: 1111;
}

.text-input:focus,
.suggestion-input:focus,
.questionTpye-select:active {
  line-height: 20px;
  border: 2px solid #108313;
}

.text-input:valid {
  color: black;
  line-height: 20px;
  border-bottom: 1px solid #b3b3b3;
  border-top: none;
  border-right: none;
  border-left: none;
}

.text-input:focus + .labelline,
.text-input:valid + .labelline {
  color: #6b6b6b;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  transform: translate(0px, -20px);
}

.questionTpye-select {
  border-bottom: 1px solid #b3b3b3;
}

.suggestion-input {
  border: 1px solid #b3b3b3;
}

.suggestion-input:focus {
  border: 2px solid #108313;
}
</style>
