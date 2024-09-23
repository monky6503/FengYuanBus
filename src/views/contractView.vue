<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import bannerComponent from '@/components/bannerComponent.vue'
import home from '@/assets/businfo/home.svg'
</script>

<template>
  <NavBar />
  <div class="w-full lg:w-[989px] mx-auto mb-[199px] lg:pt-[100px] pt-[57px]">
    <bannerComponent title="旅客運送契約" mdPl="66px" dxlPl="109px" />
    <div
      class="w-full breadcrumbs text-base font-medium leading-[150%] mx-auto px-[30px] py-[15px]"
    >
      <ul class="text-[#818181] gap-3">
        <li>
          <RouterLink to="/" class="gap-2">
            <img :src="home" alt="" />
            首頁
          </RouterLink>
        </li>
        <li class="flex gap-3">
          <a> 旅客服務 </a>
        </li>
        <li class="flex gap-3">
          <span class="inline-flex items-center gap-2 text-[#108313]"> 旅客運送契約 </span>
        </li>
      </ul>
    </div>
    <div
      class="w-full xl:w-[820px] flex flex-col mx-auto gap-[75px] px-12 md:px-[87px] py-[67px] whitespace-normal"
    >
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            ㄧ、購買車票應注意事項
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>旅客得選擇以票證或投現金方式搭車，並依公告票價及收費方式付費，於上車時交付。</li>
            <li>
              客票上應記載有效期間、票價及票號、班車等級，如有污損撕破致其記載不明時應視為無效。
            </li>
            <li>
              旅客購票時，應自行查閱客票上所載乘車日期、起訖站名、班車時間、班車等級及所付票款與票價是否相
              符。如有錯誤，應立即向售票員更換或退補，事後不予受理。
            </li>
            <li>
              客票之有效期間以搭乘客票上所載乘車日期期限內之任何一次相當班車為限。對號客票之有效期間以搭乘
              客票上當日指定之車次為限。
            </li>
            <li>
              持用優待票者，應主動出示優待身份證明文件，以供查驗。未依規定使用優待票者，以搭乘該路線全程、
              全票票價補票。
            </li>
            <li>
              優待票使用對象：
              <h4>老人、身心障礙者優待票及兒童票之規定：</h4>
              <ul class="p1">
                <li>年滿六十五歲以上，持有國民身份證或敬老證之老人。</li>
                <li>持有身心障礙手冊之身心障礙者及其監護人或必要陪伴者一人。</li>
                <li>
                  兒童票：
                  <ul class="p2 pl-[86px]">
                    <li class="text-justify">
                      免費：身高未滿一百十五公分者，
                      或身高滿一百十五公分而未滿六歲，經出示身份證件者。搭乘本公司國道6606、153、153副、153區、850路班車，目的地如有行經國道、快速
                      道路且佔位者，應購買半票）
                    </li>
                    <li>
                      半票：身高滿一百十五公分未滿一百五十公分者，或身高滿一百五十公分而未滿十二歲，經出示
                      身份證件者。
                    </li>
                    <li>
                      免費之兒童：須由已購買全票或成年之旅客攜帶，每一旅客最多以攜帶二人為限，逾限者，應購
                      買半票。
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              本公司依旅客不同需求所發售之各種類客票，其使用規定與限制在客票上已載明者，旅客應依其規定使
              用。
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            二、補票、退票及手續費
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>
              旅客無票乘車或持用失效票，應自旅客起程站補收票價；如無正當理由，並得加收百分之五十(隨相關規定
              調整)票價。
            </li>
            <li>旅客辦理退票時，不對號之車票，應在有效日期末次車開車前向車站申請退還票價。</li>
            <li>
              旅客下車時，應將客票交由站車人員收回；持用長期票證者，應於下車時交站車人員查驗。如在行程中遺
              失客票，並同意依下列方式處理：
              <ul class="list-disc list-outside pl-5 marker:text-xs">
                <li>旅客應向站車人員說明，並按原購票價補票，未向站車人員說明者，以無票乘車論。</li>
                <li>如在下車收票前尋獲者，應退還其所補之票價。</li>
                <li>
                  搭乘點對點中途無停靠站車次之對號車旅客，如在行程中遺失客票者，無庸另行補票。
                </li>
              </ul>
            </li>
            <li>
              旅客誤乘班車時，應按誤乘里程補收票價，本公司並應免費送回原起程站或與原定路線距離最近之銜站，
              其原購客票須經站車人員簽字並註明「路程錯誤」方可延期有效，如旅客不願回起程或銜接站者，其誤乘
              路段之票價與原購票價發生差額時，應分別補收或退還。
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            三、旅客有左列情形之一者，本公司得拒絕其搭乘
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>身患傳染病者。</li>
            <li>兒童過於幼小無人護送者。</li>
            <li>酗酒或狀似瘋癲者。</li>
            <li>攜帶違禁品、危險品、易生變壞或破損之物品、不潔或易污損他物之物品、厭惡品。</li>
            <li>不適宜隨車運送之動物類，但引導視障乘客之導盲犬除外。</li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold text-left leading-6">
            四、旅客攜帶之小動物， 鳥禽類除外，得比照半票價格收費（視障者攜帶之導盲犬免費）
            但有下列情形之一者，經站車人員勸阻無效者，得拒絕其攜帶乘車，並退還票款全數
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>患重疾、劣疾者。</li>
            <li>未用籠、簍、網盛裝者。</li>
            <li>不清潔或易於污損他人、他物者。</li>
            <li>足以防害公共衛生及其他旅客安寧或具有侵略性、危險性者。</li>
            <li>不適宜隨客車運送者。</li>
          </ul>
          <br />
          <p>
            旅客攜帶小動物，需自備籠、簍、網盛裝，每位購票旅客以攜帶一件，且體積以不超過二十七立方公寸為限。旅客攜帶之小動物，應就近置放身邊委慎照顧，不得置放於座位或行李架上或車廂通道；盛裝小動物之籠、簍、網，須加防水膠布包紮，並隨時清除其排怈物，以免妨害公共衛生；旅客違反上例情事經站車人員勸阻無效者，得勒令下車其所持客票即行作廢。為維護視障者搭乘公共交通工具之基本權益，不得拒絕視障者攜帶導盲犬，且導盲犬不予收費。
          </p>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            五、旅客乘車規定
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>
              搭車時請握穩扶桿、勿隨意走動、勿緊靠車門站立及將頭手伸出車外，下車請提早按(拉)鈴。
            </li>
            <li>不得無故佔用老殘婦孺專用座位。</li>
            <li>車內禁止吸煙。</li>
            <li>遇有緊急事故，請依駕駛人員之引導及操作說明使用安全設備。</li>
            <li>前座乘客請繫安全帶。</li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            六、班車行車規定：
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>
              班車之行駛之路線、停靠站及行車班距，如路線圖及站牌標示，均按路線行駛、停靠及按時發車。但如遇集會地區、臨時交通管制區致無法通行，機械故障、氣候變化致無法行駛，或其他必要情況，得加以調整變更，
              並適時於車站或大眾媒體公告。
            </li>
            <li>
              班車行至中途非因可歸責於旅客之事由，致不能運送旅客至到達站時，本公司應依下列規定辦理：
              <ul class="list-disc list-outside pl-5">
                <li>旅客願在停行地點下車者，其未經行路段之票價應予退還。</li>
                <li>旅客願在停行地點等候搭乘下次班車者，得改搭下次班車。</li>
                <li>旅客願在停行地點等候搭乘其他可到達其目的地之班車者，得改搭其他路線班車。</li>
                <li>旅客願返回原起程站者，應免費送回原起程站，並退還全程票價。</li>
                <li>退還客票均應由站車人員負責簽字，並註明經過及原因。</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            七、行李攜帶、交運及毀損賠償：
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>
              旅客隨身攜帶之行李及小件物品，能置於座位下或行李架上而
              不妨礙其他旅客者得攜帶上車，並應自行照料。
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            八、行車事故賠償：
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>
              旅客運送遇有行車事故，致旅客傷亡或財物毀損、喪失時，其損害賠償責任，依「汽車運輸業行車事故損害賠償金額及醫療補助費發給辦法」由本公司負責乘客之損害賠償。旅客向法院提起損害賠償訴訟者，依照法院判決之金額償。
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">九、誤點處理：</h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5">
            <li>
              本公司因路阻或其他事故致可能造成之運送遲延(誤點)時，除應立即採行補救措施適時調整接替外，應及時公告旅客週知。前項因故造成運送遲延(誤點)時，得經協議解決相關問題，若協議不成得依相關法令規定辦理。
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            十、旅客毀損本公司公車及車站各項設備者，應依法負損害賠償責任。
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5"></ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            十一、本公司客車上均有標示服務電話，並於車站及客車上置備旅客意見箱以便於旅客申訴或改進服務建議。
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5"></ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            十二、本公司服務缺失致造成乘客權益受損，除先由本公司查明改進外，乘客亦得向公主管機關、消費者保護機關、團體等申訴，俾求衡平合理之解決。
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5"></ul>
        </div>
      </div>
      <div class="w-full flex flex-col mx-auto gap-[11px]">
        <div class="flex flex-col gap-1">
          <h3 class="text-xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
            十三、本契約如有未盡事宜，悉依其他相關法令、習慣、誠信原則處理。
          </h3>
          <div class="flex items-end justify-start">
            <hr class="w-[91px] h-[2px] bg-[#4F5ED2] border-0" />
            <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
          </div>
        </div>
        <div class="text-base font-normal tracking-[1px] leading-6">
          <ul class="list-decimal list-outside pl-5"></ul>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
  <RouterView />
</template>

<style scoped>
.breadcrumbs > ul > li + *:before {
  width: 10.63px;
  height: 10.63px;
  padding: 0px;
  margin: 2px 5px;
  color: #818181;
  opacity: 1;
  border-top: 2px solid;
  border-right: 2px solid;
}
.p1 {
  list-style: none;
  counter-reset: my-counter;
}
.p1 > li {
  counter-increment: my-counter;
  text-indent: -0.5em;
}
.p1 > li::before {
  content: '（' counter(my-counter, cjk-ideographic) '）';
  color: black;
  font-weight: noraml;
}
.p2 {
  list-style: none;
  counter-reset: my-counter;
}
.p2 > li {
  counter-increment: my-counter;
  text-indent: 2.5em;
}
.p2 > li::before {
  content: '（' counter(my-counter) '）';
  color: black;
  font-weight: noraml;
  margin-left: -90px;
}
</style>
