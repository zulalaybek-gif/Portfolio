/**
 * MZW — No Sense: 3 Player Screens
 * Exact Figma-imported components, pixel-perfect.
 * Each phone is 784.075×1766px at design size, scaled via CSS transform.
 */
import React from "react";
import svgPaths from "../../imports/svg-l30svyiaa0";
import imgCaptureDecran20221011A11041 from "figma:asset/285aae2a2bd3a31891ce93006639e1f4cfc7f16b.png";
import imgImage15 from "figma:asset/b2dc3411ce1d7da5eedb5f043de453cdcea29c1d.png";
import imgImage19 from "figma:asset/26ae25ab6f07e30cafc892d0f17cb14a514a6034.png";
import imgImage11 from "figma:asset/4c9333cbad89d2b7b025a8b2eeb4a232cada0a5a.png";
import imgRectangle3 from "figma:asset/621f4ea03c85e1dd9558f377364da9bed12d680b.png";
import imgImage9 from "figma:asset/fafde56448e896ef13ef6ce3abb1701a45e00563.png";

// ═══════════════════════════════════════════════════
// SHARED SUB-COMPONENTS (status bar icons, etc.)
// ═══════════════════════════════════════════════════

/* --- Phone 1: Splash "NO Sense" --- */

function Header_P1() {
  return (
    <div className="absolute bottom-[calc(87.5%+112.66px)] h-[80.606px] left-0 right-0" data-name="header">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Urbanist:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[64.12px] text-[29.311px] text-white top-[calc(50%-0.15px)] tracking-[0.3664px] whitespace-nowrap">
        <p className="leading-[1.4]">9:41</p>
      </div>
      <div className="-translate-y-1/2 absolute h-[18.319px] right-[157.55px] top-[calc(50%+1.83px)] w-[32.975px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.9746 18.3193"><path d={svgPaths.p130b4500} fill="white" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[20.088px] right-[120.41px] top-[calc(50%+0.88px)] w-[27.979px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9785 20.0879"><path d={svgPaths.p22a3f600} fill="white" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[23.815px] right-[64.12px] top-[calc(50%+0.92px)] w-[45.799px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.7988 23.8154"><path d={svgPaths.p1e016c00} opacity="0.35" stroke="white" strokeWidth="1.83195" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[7.328px] right-[60.49px] top-[calc(50%+1.83px)] w-[2.433px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.4329 7.3278"><path d={svgPaths.p23944880} fill="white" opacity="0.4" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[15.26px] right-[68.7px] top-[calc(50%+0.91px)] w-[37.005px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0053 15.2601"><path d={svgPaths.p3f0ff600} fill="white" /></svg>
      </div>
    </div>
  );
}

function Phone1_Content() {
  return (
    <>
      <Header_P1 />
      {/* Background glows */}
      <div className="absolute h-[570.224px] left-[188.69px] top-[calc(50%+82.44px)] w-[558.618px]">
        <div className="absolute inset-[-70.68%_-72.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1364.68 1376.28">
            <g><g filter="url(#f0_p1)"><path d={svgPaths.pc20d5f0} fill="#5E46F8" /></g><g filter="url(#f1_p1)"><path d={svgPaths.pe4fdd00} fill="#C03EFE" /></g></g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1224.66" id="f0_p1" width="1117.9" x="0" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="201.515" /></filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1233.39" id="f1_p1" width="1117.36" x="247.313" y="142.892"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="201.515" /></filter>
            </defs>
          </svg>
        </div>
      </div>
      {/* Logo outline */}
      <div className="absolute h-[489.131px] left-[150.22px] top-[calc(12.5%+68.7px)] w-[483.635px]">
        <div className="absolute inset-[-86.14%_-87.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1326.33 1331.83">
            <g filter="url(#f2_p1)"><ellipse cx="663.166" cy="665.914" fill="#5E46F8" fillOpacity="0.18" rx="241.817" ry="244.565" /></g>
            <defs><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1331.83" id="f2_p1" width="1326.33" x="0" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="210.674" /></filter></defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[264px] left-[calc(25%+85.98px)] top-[calc(12.5%+150.25px)] w-[221px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 264">
          <g clipPath="url(#cp_p1)"><path d={svgPaths.p28442c40} stroke="white" strokeMiterlimit="10" strokeWidth="2" /></g>
          <defs><clipPath id="cp_p1"><rect fill="white" height="264" width="221" /></clipPath></defs>
        </svg>
      </div>
      {/* "NO Sense" text */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute capitalize flex flex-col font-['Fast_Hand:Regular',sans-serif] justify-center leading-[0] left-[calc(25%+194.66px)] not-italic text-[56.332px] text-center text-white top-[calc(50%+160.41px)] tracking-[-1.1908px] whitespace-nowrap">
        <p className="leading-[1.4]">NO Sense</p>
      </div>
      {/* "Discover our new app" */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Urbanist:Regular',sans-serif] font-normal justify-center leading-[0] left-[calc(25%+194.51px)] lowercase text-[34.807px] text-[rgba(255,255,255,0.8)] text-center top-[calc(62.5%+18.09px)] tracking-[-1.1908px] whitespace-nowrap">
        <p className="leading-[1.4]">Discover our new app</p>
      </div>
      {/* MZW / best music app */}
      <div className="absolute contents leading-[0] left-[calc(25%+121.98px)] top-[calc(87.5%+65.03px)] uppercase whitespace-nowrap">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Urbanist:SemiBold',sans-serif] font-semibold justify-center left-[calc(25%+132.98px)] opacity-80 text-[37.688px] text-white top-[calc(87.5%+91.53px)] tracking-[0.4434px]">
          <p className="leading-[1.4]">MZW</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Urbanist:Medium',sans-serif] font-medium justify-center left-[calc(25%+121.98px)] opacity-80 text-[14.839px] text-[rgba(255,255,255,0.5)] top-[calc(87.5%+126.58px)] tracking-[0.1745px]">
          <p className="leading-[1.4]">best music app</p>
        </div>
      </div>
      {/* "lets Go" CTA */}
      <div className="absolute contents left-[calc(25%+42.13px)] top-[calc(62.5%+132.82px)]">
        <div className="absolute h-[123.858px] left-[calc(25%+42.13px)] rounded-[183.195px] top-[calc(62.5%+132.82px)] w-[307.768px]" style={{ backgroundImage: "linear-gradient(108.388deg, rgb(136, 106, 226) 43.661%, rgb(162, 132, 246) 116.16%)" }} />
        <div className="absolute h-[101.338px] left-[calc(25%+70.11px)] top-[calc(62.5%+159.19px)] w-[251.81px]">
          <div className="absolute inset-[-65.97%_-26.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 385.52 235.048">
              <g filter="url(#f3_p1)" opacity="0.5"><path d={svgPaths.p3afb1980} fill="url(#lg_p1)" /></g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="235.048" id="f3_p1" width="385.52" x="0" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="33.4275" /></filter>
                <linearGradient gradientUnits="userSpaceOnUse" id="lg_p1" x1="54.6268" x2="359.244" y1="44.7685" y2="107.329"><stop stopColor="#5E46F8" /><stop offset="1" stopColor="#C03EFE" /></linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute contents left-[calc(25%+113.44px)] top-[calc(62.5%+167.62px)]">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute capitalize flex flex-col font-['Urbanist:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(25%+180.44px)] text-[42.135px] text-center text-white top-[calc(62.5%+197.12px)] tracking-[-1.1908px] whitespace-nowrap">
            <p className="leading-[1.4]">lets Go</p>
          </div>
          <div className="absolute inset-[72.82%_38.73%_25.48%_59.55%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4635 30.0261"><path d={svgPaths.p3742c580} fill="white" /></svg>
          </div>
        </div>
      </div>
    </>
  );
}

export function PhoneSplash() {
  return (
    <div className="relative bg-[#0f0817] overflow-clip rounded-[82.438px] shadow-[0px_25px_100px_0px_rgba(154,158,172,0.51)]" style={{ width: 784.075, height: 1766 }}>
      <Phone1_Content />
    </div>
  );
}

/* --- Phone 2: Player "Schmetterling" --- */

function Header_P2() {
  return (
    <div className="absolute bottom-[calc(87.5%+112.66px)] h-[80.606px] left-0 right-0" data-name="header">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Urbanist:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[64.12px] text-[29.311px] text-white top-[calc(50%-0.15px)] tracking-[0.3664px] whitespace-nowrap">
        <p className="leading-[1.4]">9:41</p>
      </div>
      <div className="-translate-y-1/2 absolute h-[18.319px] right-[157.55px] top-[calc(50%+1.83px)] w-[32.976px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.9756 18.3193"><path d={svgPaths.p10769f80} fill="white" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[20.088px] right-[120.41px] top-[calc(50%+0.88px)] w-[27.979px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9785 20.0879"><path d={svgPaths.p2c643cc0} fill="white" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[23.815px] right-[64.12px] top-[calc(50%+0.92px)] w-[45.799px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.7988 23.8154"><path d={svgPaths.p1e016c00} opacity="0.35" stroke="white" strokeWidth="1.83195" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[7.328px] right-[60.49px] top-[calc(50%+1.83px)] w-[2.433px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.4329 7.3278"><path d={svgPaths.p23944880} fill="white" opacity="0.4" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[15.26px] right-[68.7px] top-[calc(50%+0.91px)] w-[37.005px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0053 15.2601"><path d={svgPaths.p3f0ff600} fill="white" /></svg>
      </div>
    </div>
  );
}

function Phone2_Content() {
  return (
    <>
      <Header_P2 />
      {/* Background blob */}
      <div className="absolute flex h-[684.147px] items-center justify-center left-[45.8px] top-[calc(75%+111.75px)] w-[683.791px]">
        <div className="flex-none rotate-[-43.55deg]">
          <div className="h-[488.768px] relative w-[478.82px]">
            <div className="absolute inset-[-86.21%_-88%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1321.52 1331.47">
                <g><g filter="url(#f0_p2)"><path d={svgPaths.p2ed68b00} fill="#5E46F8" /></g><g filter="url(#f1_p2)"><path d={svgPaths.p3f724c80} fill="#C03EFE" /></g></g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1201.5" id="f0_p2" width="1110" x="0" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="210.674" /></filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1208.98" id="f1_p2" width="1109.53" x="211.985" y="122.48"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="210.674" /></filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Track info: Schmetterling / MZW */}
      <div className="absolute bottom-[calc(75%+39.45px)] contents leading-[0] left-[62.45px] tracking-[0.5455px] whitespace-nowrap">
        <div className="absolute bottom-[calc(75%+126.5px)] flex flex-col font-['Urbanist:Bold',sans-serif] font-bold justify-center left-[62.45px] text-[40.303px] text-white translate-y-1/2">
          <p className="leading-[1.4]">Schmetterling</p>
        </div>
        <div className="absolute bottom-[calc(75%+62.45px)] flex flex-col font-['Urbanist:Regular',sans-serif] font-normal justify-center left-[62.45px] text-[32.975px] text-[rgba(255,255,255,0.4)] translate-y-1/2">
          <p className="leading-[1.4]">MZW</p>
        </div>
      </div>
      {/* Heart icon */}
      <div className="absolute left-[calc(75%+91.02px)] size-[51.295px] top-[calc(12.5%+101.06px)]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.2946 51.2946"><path d={svgPaths.pee6a5c0} fill="white" /></svg>
      </div>
      {/* Album art */}
      <div className="absolute contents left-[29px] top-[calc(25%+19.5px)]">
        <div className="absolute h-[656px] left-[63px] rounded-[68px] top-[calc(25%+19.5px)] w-[653px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[68px] size-full" src={imgCaptureDecran20221011A11041} />
        </div>
        <div className="absolute inset-[26.1%_4.22%_36.75%_95.4%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 656"><path d={svgPaths.p2802f900} fill="#BAA8ED" /></svg>
        </div>
        <div className="absolute inset-[26.1%_95.92%_36.75%_3.7%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 656"><path d={svgPaths.p2802f900} fill="#BAA8ED" /></svg>
        </div>
      </div>
      {/* Audio spectrum */}
      <div className="absolute contents left-[64px] top-[calc(62.5%+144.41px)]">
        {/* Controls: shuffle, play/pause, repeat + Lyrics */}
        <div className="absolute contents left-[164.12px] top-[calc(87.5%-37.18px)]">
          <div className="absolute h-[160.471px] left-[164.12px] top-[calc(87.5%-37.18px)] w-[455.838px]">
            <div className="absolute inset-[-29.35%_-0.34%_-54.35%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 457.408 294.778">
                <g>
                  <circle cx="231.408" cy="116.865" fill="url(#lg0_p2)" r="69.77" />
                  <g filter="url(#f2_p2)"><circle cx="230.535" cy="147.389" fill="url(#lg1_p2)" fillOpacity="0.5" r="60.1766" /></g>
                  <g filter="url(#f3_p2)">
                    <line stroke="white" strokeWidth="10.4655" x1="219.198" x2="219.198" y1="90.701" y2="143.028" />
                    <line stroke="white" strokeWidth="10.4655" x1="243.617" x2="243.617" y1="90.7009" y2="143.028" />
                  </g>
                  <path d={svgPaths.p325a3100} stroke="#BAA8ED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.13965" />
                  <path d={svgPaths.p1e846700} fill="#BAA8ED" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="294.778" id="f2_p2" width="294.778" x="83.1462" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="43.6063" /></filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="60.3276" id="f3_p2" width="46.8849" x="201.965" y="88.7009"><feFlood floodOpacity="0" result="a" /><feColorMatrix in="SourceAlpha" result="ha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="-8" dy="2" /><feGaussianBlur stdDeviation="2" /><feComposite in2="ha" operator="out" /><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend in2="a" mode="normal" result="ds" /><feBlend in="SourceGraphic" in2="ds" mode="normal" result="shape" /></filter>
                  <linearGradient gradientUnits="userSpaceOnUse" id="lg0_p2" x1="193.267" x2="275.014" y1="172.681" y2="68.8978"><stop stopColor="#5C488D" /><stop offset="1" stopColor="#7F4989" /></linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" id="lg1_p2" x1="197.639" x2="268.146" y1="195.53" y2="106.018"><stop stopColor="#60488E" /><stop offset="1" stopColor="#81498A" /></linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <p className="absolute font-['Urbanist:Regular',sans-serif] font-normal leading-[normal] left-[calc(25%+157.17px)] text-[#c6c6c6] text-[21.49px] top-[calc(87.5%+159.75px)] tracking-[6.447px] whitespace-nowrap">Lyrics</p>
        </div>
        {/* Time + spectrum bars */}
        <p className="absolute font-['Urbanist:Regular',sans-serif] font-normal leading-[normal] left-[64px] text-[#60488e] text-[21.49px] top-[calc(75%+59.41px)] whitespace-nowrap">1:04</p>
        <p className="absolute font-['Urbanist:Regular',sans-serif] font-normal leading-[normal] left-[calc(75%+91.68px)] text-[#c6c6c6] text-[21.49px] top-[calc(75%+59.41px)] whitespace-nowrap">3:29</p>
        <div className="absolute content-stretch flex gap-[5.712px] items-center left-[65.85px] top-[calc(62.5%+144.41px)]">
          {/* 29 purple bars (played) */}
          {[61.592,105.303,89.408,45.698,61.592,49.671,121.198,61.592,61.592,61.592,41.724,53.645,21.855,53.645,113.251,77.487,53.645,33.776,77.487,113.251,77.487,77.487,89.408,113.251,69.54,53.645,77.487,77.487,61.592].map((h, i) => (
            <div key={`pp-${i}`} className="bg-[#60488e] rounded-[185.462px] shrink-0 w-[6.102px]" style={{ height: h }} />
          ))}
          {/* 22 white bars (unplayed) */}
          {[105.303,89.408,69.54,61.592,77.487,121.198,61.592,61.592,61.592,29.803,37.75,13.908,37.75,77.487,53.645,37.75,21.855,53.645,77.487,53.645,53.645,61.592,77.487,49.671,37.75,53.645,53.645].map((h, i) => (
            <div key={`pw-${i}`} className="bg-[rgba(255,255,255,0.75)] rounded-[185.462px] shrink-0 w-[6.102px]" style={{ height: h }} />
          ))}
        </div>
      </div>
      {/* Playlist header */}
      <div className="absolute contents left-[67px] top-[167.33px]">
        <div className="absolute bottom-[calc(87.5%+29.92px)] flex flex-col font-['Urbanist:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[calc(25%+132.98px)] text-[33.369px] text-white tracking-[0.3708px] translate-y-1/2 whitespace-nowrap">
          <p className="leading-[1.4]">Playslist</p>
        </div>
        <div className="absolute flex inset-[9.79%_89.02%_88.32%_8.55%] items-center justify-center">
          <div className="flex-none h-[33.369px] rotate-180 w-[19.068px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0679 33.3689"><path d={svgPaths.p1abbdff0} fill="white" /></svg>
          </div>
        </div>
        <div className="absolute flex inset-[9.75%_7.66%_88.32%_91.3%] items-center justify-center">
          <div className="-rotate-90 flex-none h-[8.161px] w-[34.113px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.1132 8.16054"><path d={svgPaths.p3bd47c00} fill="white" /></svg>
          </div>
        </div>
      </div>
    </>
  );
}

export function PhonePlayer() {
  return (
    <div className="relative bg-[#0f0817] overflow-clip rounded-[82.438px] shadow-[0px_25px_100px_0px_rgba(154,158,172,0.51)]" style={{ width: 784.075, height: 1766 }}>
      <Phone2_Content />
    </div>
  );
}

/* --- Phone 3: Browse/Search screen --- */

function Header_P3() {
  return (
    <div className="absolute bottom-[calc(87.5%+112.66px)] h-[80.606px] left-0 right-0" data-name="header">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Urbanist:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[64.12px] text-[29.311px] text-white top-[calc(50%-0.15px)] tracking-[0.3664px] whitespace-nowrap">
        <p className="leading-[1.4]">9:41</p>
      </div>
      <div className="-translate-y-1/2 absolute h-[18.319px] right-[157.55px] top-[calc(50%+1.83px)] w-[32.975px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.9746 18.3193"><path d={svgPaths.p6308000} fill="white" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[20.088px] right-[120.41px] top-[calc(50%+0.88px)] w-[27.979px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9785 20.0879"><path d={svgPaths.p3f7dbd70} fill="white" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[23.815px] right-[64.12px] top-[calc(50%+0.92px)] w-[45.799px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.7988 23.8154"><path d={svgPaths.p1e016c00} opacity="0.35" stroke="white" strokeWidth="1.83195" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[7.328px] right-[60.49px] top-[calc(50%+1.83px)] w-[2.433px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.4329 7.3278"><path d={svgPaths.p23944880} fill="white" opacity="0.4" /></svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[15.26px] right-[68.7px] top-[calc(50%+0.91px)] w-[37.005px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0053 15.2601"><path d={svgPaths.p3f0ff600} fill="white" /></svg>
      </div>
    </div>
  );
}

/* Album card with blur shadow */
function AlbumCard({ img, title, artist, bold }: { img: string; title: string; artist: string; bold?: boolean }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[0.85px] mt-0 place-items-start relative row-1 tracking-[0.3664px] whitespace-nowrap">
        <div className={`col-1 flex flex-col ${bold ? "font-['Urbanist:Bold',sans-serif] font-bold" : "font-['Urbanist:Bold',sans-serif] font-bold"} justify-center ml-0 mt-0 relative row-1 text-[27.479px] text-white`}>
          <p className="leading-[1.4]">{title}</p>
        </div>
        <div className="col-1 flex flex-col font-['Urbanist:Regular',sans-serif] font-normal justify-center ml-0 mt-[43.64px] relative row-1 text-[25.647px] text-[rgba(255,255,255,0.4)]">
          <p className="leading-[1.4]">{artist}</p>
        </div>
      </div>
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
        <div className="blur-[42.556px] col-1 h-[252.706px] ml-[23.86px] mt-[48.53px] relative rounded-[36.639px] row-1 w-[257.357px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[36.639px] size-full" src={img} />
        </div>
        <div className="col-1 h-[301.239px] ml-0 mt-0 relative rounded-[36.639px] row-1 w-[306.783px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[36.639px] size-full" src={img} />
        </div>
      </div>
    </div>
  );
}

/* Track row in recommendation list */
function TrackRow({ img, title, artist, heartType }: { img: string; title: string; artist: string; heartType: "filled" | "outline" | "gradient" }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      {/* Thumbnail */}
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
        <div className="blur-[18.32px] col-1 h-[91.598px] ml-[8.57px] mt-[20.15px] relative rounded-[20.151px] row-1 w-[85.746px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20.151px] size-full" src={img} />
        </div>
        <div className="col-1 h-[111.749px] ml-0 mt-0 relative rounded-[20.151px] row-1 w-[104.61px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20.151px] size-full" src={img} />
        </div>
      </div>
      {/* Title + Artist */}
      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[132.05px] mt-[11.85px] place-items-start relative row-1 tracking-[0.3664px] whitespace-nowrap">
        <div className="col-1 flex flex-col font-['Urbanist:SemiBold',sans-serif] font-semibold justify-center ml-0 mt-0 relative row-1 text-[27.479px] text-white">
          <p className="leading-[1.4]">{title}</p>
        </div>
        <div className="col-1 flex flex-col font-['Urbanist:Medium',sans-serif] font-medium justify-center ml-0 mt-[47.6px] relative row-1 text-[25.647px] text-[rgba(255,255,255,0.4)]">
          <p className="leading-[1.4]">{artist}</p>
        </div>
      </div>
      {/* Spacer */}
      <div className="col-1 h-[111.749px] ml-0 mt-0 row-1 w-[655.098px]" />
      {/* Heart */}
      <div className="col-1 h-[42.135px] ml-[618.23px] mt-[34.81px] relative row-1 w-[39.443px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4431 42.1349">
          {heartType === "filled" ? (
            <path d={svgPaths.p27c81080 || svgPaths.p139e9100} fill="white" />
          ) : heartType === "gradient" ? (
            <>
              <path d={svgPaths.p1e2e91e0} fill="url(#lg_heart_grad)" />
              <defs><linearGradient gradientUnits="userSpaceOnUse" id="lg_heart_grad" x1="7.88854" x2="35.963" y1="36.517" y2="9.57899"><stop stopColor="#5E46F8" /><stop offset="1" stopColor="#C03EFE" /></linearGradient></defs>
            </>
          ) : (
            <path d={svgPaths.p354da400 || svgPaths.p23822400} stroke="white" strokeWidth="1.83195" />
          )}
        </svg>
      </div>
    </div>
  );
}

function Phone3_Content() {
  return (
    <>
      {/* Background glows */}
      <div className="absolute h-[472.643px] left-[calc(75%+133.73px)] top-[calc(50%+32.98px)] w-[397.205px]">
        <div className="absolute inset-[-97.72%_-116.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1320.94 1396.38">
            <g filter="url(#f0_p3)"><ellipse cx="660.469" cy="698.188" fill="#AA46F8" fillOpacity="0.1" rx="198.602" ry="236.322" /></g>
            <defs><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1396.38" id="f0_p3" width="1320.94" x="0" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="230.933" /></filter></defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[452.492px] left-[-128.24px] top-[calc(25%+93.43px)] w-[386.542px]">
        <div className="absolute inset-[-121.46%_-142.18%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1485.71 1551.66">
            <g filter="url(#f1_p3)"><ellipse cx="742.856" cy="775.831" fill="#5E46F8" fillOpacity="0.3" rx="193.271" ry="226.246" /></g>
            <defs><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1551.66" id="f1_p3" width="1485.71" x="0" y="0"><feFlood floodOpacity="0" result="a" /><feBlend in="SourceGraphic" in2="a" mode="normal" result="b" /><feGaussianBlur result="c" stdDeviation="274.793" /></filter></defs>
          </svg>
        </div>
      </div>
      {/* Search bar background */}
      <div className="absolute bottom-[calc(87.5%-26.56px)] flex h-[115.413px] items-center justify-center left-[64.12px] w-[655.838px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="bg-[rgba(255,255,255,0.06)] h-[115.413px] rounded-[25.647px] w-[655.838px]" />
        </div>
      </div>
      <Header_P3 />
      {/* Search icon */}
      <div className="absolute bottom-[calc(87.5%+14.18px)] h-[32.534px] left-[13.61%] right-[82.36%]">
        <div className="absolute inset-[-5.07%_-5.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.9152 35.8311">
            <circle cx="17.1929" cy="17.1929" r="15.5441" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.29751" />
            <path d={svgPaths.p1e84e670} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.29751" />
          </svg>
        </div>
      </div>
      <p className="absolute bottom-[calc(87.5%+50.38px)] font-['Urbanist:Light',sans-serif] font-light leading-[1.2] left-[181.36px] text-[32.975px] text-[rgba(255,255,255,0.4)] tracking-[1.319px] translate-y-full whitespace-nowrap">search song</p>
      {/* RECENTLY PLAYED */}
      <div className="absolute bottom-[calc(75%+107.24px)] flex flex-col font-['Urbanist:Bold',sans-serif] font-bold justify-center leading-[0] left-[67.78px] text-[31.143px] text-white tracking-[0.3664px] translate-y-1/2 uppercase whitespace-nowrap">
        <p className="leading-[1.4]">recently played</p>
      </div>
      <div className="absolute bottom-[calc(75%+107.57px)] capitalize flex flex-col font-['Urbanist:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(75%+51.29px)] text-[25.647px] text-[rgba(255,255,255,0.5)] tracking-[0.3664px] translate-y-1/2 whitespace-nowrap">
        <p className="leading-[1.4]">see all</p>
      </div>
      {/* Recently played cards */}
      <div className="absolute content-stretch flex gap-[40.303px] items-start leading-[0] left-[64.12px] top-[calc(12.5%+180.45px)]">
        <AlbumCard img={imgImage15} title="Antretor" artist="yann tiarsen" />
        <AlbumCard img={imgImage19} title="No Sense" artist="MZW" />
      </div>
      {/* RECOMMENDATION */}
      <div className="absolute bottom-[calc(37.5%+117.3px)] contents leading-[0] left-[65.95px] tracking-[0.3664px] whitespace-nowrap">
        <div className="absolute bottom-[calc(37.5%+139.63px)] capitalize flex flex-col font-['Urbanist:Medium',sans-serif] font-medium justify-center left-[calc(75%+51.29px)] text-[25.647px] text-[rgba(255,255,255,0.5)] translate-y-1/2">
          <p className="leading-[1.4]">see all</p>
        </div>
        <div className="absolute bottom-[calc(37.5%+139.3px)] flex flex-col font-['Urbanist:Bold',sans-serif] font-bold justify-center left-[65.95px] text-[31.143px] text-white translate-y-1/2 uppercase">
          <p className="leading-[1.4]">recomMendAtion</p>
        </div>
      </div>
      {/* Track list */}
      <div className="absolute content-stretch flex flex-col gap-[38.471px] items-center leading-[0] left-[65.95px] top-[calc(50%+172.2px)]">
        <TrackRow img={imgImage19} title="Schmetterling" artist="MZW" heartType="filled" />
        <TrackRow img={imgImage11} title="Hotling Bling" artist="Billie Eilish" heartType="outline" />
        <TrackRow img={imgImage15} title="Antretor" artist="yann tiarsen" heartType="outline" />
        <TrackRow img={imgRectangle3} title="Neghtmare" artist="Halsey" heartType="filled" />
        <TrackRow img={imgImage9} title="Get You The Moon" artist="KINA" heartType="gradient" />
      </div>
      {/* Bottom fade */}
      <div className="absolute bottom-[-87.93px] h-[249.145px] left-0 w-[784.075px]" style={{ backgroundImage: "linear-gradient(180deg, rgba(15, 8, 24, 0) 0%, rgba(15, 8, 24, 0.69) 17.379%, rgba(15, 8, 24, 0.91) 36.712%, rgb(15, 8, 24) 70.988%)" }} />
      {/* Mini album art overlays */}
      <div className="absolute h-[312px] left-[calc(50%+17.78px)] rounded-[38px] top-[calc(12.5%+176.25px)] w-[310px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[38px] size-full" src={imgCaptureDecran20221011A11041} />
      </div>
      <div className="absolute h-[112px] left-[62.82px] rounded-[24px] top-[calc(50%+172px)] w-[110px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgCaptureDecran20221011A11041} />
      </div>
    </>
  );
}

export function PhoneBrowse() {
  return (
    <div className="relative bg-[#0f0817] overflow-clip rounded-[82.438px] shadow-[0px_95px_250px_-38px_rgba(75,84,109,0.89)]" style={{ width: 784.075, height: 1766 }}>
      <Phone3_Content />
    </div>
  );
}

// ═══════════════════════════════════════════════════
// SCALED WRAPPER — renders all 3 phones side by side
// ═══════════════════════════════════════════════════

const PHONE_W = 784.075;
const PHONE_H = 1766;

function ScaledPhone({ children, scale, className }: { children: React.ReactNode; scale: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: PHONE_W * scale,
        height: PHONE_H * scale,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: PHONE_W,
          height: PHONE_H,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MzwPhoneTriple({ scale = 0.3 }: { scale?: number }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-8">
      <ScaledPhone scale={scale}>
        <PhoneSplash />
      </ScaledPhone>
      <ScaledPhone scale={scale} className="md:mb-12">
        <PhoneBrowse />
      </ScaledPhone>
      <ScaledPhone scale={scale}>
        <PhonePlayer />
      </ScaledPhone>
    </div>
  );
}
