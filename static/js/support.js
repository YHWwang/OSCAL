$(function () {
  let ds = $('.newsPagination .page-item')
  let len = ds.length - 2
  $('.page-item-current').click(function () {
    if ($(this).hasClass('next')) { // next下一页
      if ($('.newsPagination .page-item.active').text() == len) {
        $(this).addClass('disabled')
        return false
      } else {
        $(this).removeClass('disabled')
      }
      ds.eq(parseInt($('.newsPagination .page-item.active').text()) + 1).addClass('active').siblings().removeClass('active')
    } else { // prev上一页
      if ($('.newsPagination .page-item.active').text() == 1) {
        $('.newsPagination li:nth-child(0)').addClass('disabled')
        return false
      } else {
        $('.newsPagination li:nth-child(0)').removeClass('disabled')
      }
      ds.eq(parseInt($('.newsPagination .page-item.active').text()) - 1).addClass('active').siblings().removeClass('active')
    }
  })
  $('.newsPagination li.index').click(function () { //点击跳转页码
    $(this).addClass('active').siblings().removeClass('active')
    if ($('.newsPagination .page-item.active').text() == len) {
      $('.newsPagination li:nth-child(' + len + 2 + ')').addClass('disabled')
    } else {
      $('.newsPagination li:nth-child(' + len + 2 + ')').removeClass('disabled')
    }
    if ($('.newsPagination .page-item.active').text() == 1) {
      $('.newsPagination li:nth-child(1)').addClass('disabled')
    } else {
      $('.newsPagination li:nth-child(1)').removeClass('disabled')
    }
  })
  setTimeout(() => {
    $('.sup-ContentBox .leftBox .pro_type .pro_ul li').eq(0).click()
}, 10);
  var faq_list = [
    `
  <li>
  <img class="lazyload" data-src="/img/support_icon_1.png" alt="oscal">
  <p class="number">
      Shopping FAQs
  </p>
      <p class="msg">
          Payment,orders,shipping and warranty policies.
      </p>
  </li>
  <li>
  <a href="./faqs/faq.html&pho_1" target="_blank">
      <p>
          1.Do I still need to pay custom fee?
      </p>
  </a>
  </li>
  <li>
  <a href="./faqs/faq.html&pho_2" target="_blank">
      <p>
          2.What is the version of items ?
      </p>
  </a>
  </li>
  <li>
  <a href="./faqs/faq.html&pho_3" target="_blank">
      <p>
          3.How can I get other discounts?
      </p>
  </a>
  </li>
  `
    , `
  <li>
  <img class="lazyload" data-src="/img/support_icon_1.png" alt="oscal">
  <p class="number">
      Shopping FAQs
  </p>
      <p class="msg">
          Payment,orders,shipping and warranty policies.
      </p>
  </li>
  <li>
  <a href="./faqs/faq.html&tab_1" target="_blank">
      <p>
          1.Touchpad gestures
      </p>
  </a>
  </li>
  <li>
  <a href="./faqs/faq.html&tab_2" target="_blank">
      <p>
          2.Viewing the location of programs and apps downloaded from the Microsoft Store
      </p>
  </a>
  </li>
  <li>
  <a href="./faqs/faq.html&tab_3" target="_blank">
      <p>
          3.Viewing the Windows system activation time
      </p>
  </a>
  </li>
  `,`
  <li>
  <img class="lazyload" data-src="/img/support_icon_1.png" alt="oscal">
  <p class="number">
      Shopping FAQs
  </p>
      <p class="msg">
          Payment,orders,shipping and warranty policies.
      </p>
  </li>
  <li>
  <a href="./faqs/faq.html&lap_1" target="_blank">
      <p>
      The tablet's battery drains quickly and has a short standby time
      </p>
  </a>
  </li>
  <li>
  <a href="./faqs/faq.html&lap_2" target="_blank">
      <p>
      My tablet gets overheated
      </p>
  </a>
  </li>
  `,`
  <li>
  <img class="lazyload" data-src="/img/support_icon_1.png" alt="oscal">
  <p class="number">
      Shopping FAQs
  </p>
      <p class="msg">
          Payment,orders,shipping and warranty policies.
      </p>
  </li>
  <li>
  <a href="./faqs/faq.html&acc_1" target="_blank">
      <p>
      What is the weight of the AirBuds 3?
      </p>
  </a>
  </li>
  <li>
  <a href="./faqs/faq.html&acc_2" target="_blank">
      <p>
      How to charge AirBuds 3?
      </p>
  </a>
  </li>
  `
  ]
  var preSale_list = [
    `
  <li>
  <img class="lazyload" data-src="/img/support_icon_2.png" alt="oscal">
  <p class="number">
      Troubleshooting
  </p>
      <p class="msg">
          Your go-to stop for suggestionsto help solve your problem
      </p>
  
</li>
<li>
  <a href="./faqs/faq.html&pho_4" target="_blank">
      <p>
         1.What to do if my phone gets heat?
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&pho_5" target="_blank">
      <p>
          2.How to solve the application error?
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&pho_6" target="_blank">
      <p>
          3.What's the difference between Doke OS and the original Android OS?
      </p>
  </a>
</li>
  `,
    '',
    `
  <li>
  <img class="lazyload" data-src="/img/support_icon_2.png" alt="oscal">
  <p class="number">
      Troubleshooting
  </p>
      <p class="msg">
          Your go-to stop for suggestionsto help solve your problem
      </p>
  
</li>
<li>
  <a href="./faqs/faq.html&lap_3" target="_blank">
      <p>
      1.My tablet is slow to respond when I surf the Internet
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&lap_4" target="_blank">
      <p>
      2.Find the serial number (SN) on tablets
      </p>
  </a>
</li>
  `,`
  <li>
  <img class="lazyload" data-src="/img/support_icon_2.png" alt="oscal">
  <p class="number">
      Troubleshooting
  </p>
      <p class="msg">
          Your go-to stop for suggestionsto help solve your problem
      </p>
  
</li>
<li>
  <a href="./faqs/faq.html&acc_3" target="_blank">
      <p>
      1.Do both the AirBuds 3 headphones and charging case have batteries?
      </p>
  </a>
</li>
  `]
  var afterSale_list = [
    `
  <li>
  <img class="lazyload" data-src="/img/support_icon_3.png" alt="oscal">
  <p class="number">
      OS FAQs
  </p>
      <p class="msg">
          Get the latest os updates
          for your device
      </p>
</li>
<li>
  <a href="./faqs/faq.html&pho_7" target="_blank">
      <p>
          1.Will it get stuck when running the OS?
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&pho_8" target="_blank">
      <p>
          2.What's the key features of the OS?
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&pho_9" target="_blank">
      <p>
          3.What to do if my voice cannot be heard when calling? 
      </p>
  </a>
</li>
  `, `
  <li>
  <img class="lazyload" data-src="/img/support_icon_3.png" alt="oscal">
  <p class="number">
      OS FAQs
  </p>
  
      <p class="msg">
          Get the latest os updates
          for your device

      </p>
 
</li>
<li>
  <a href="./faqs/faq.html&tab_4" target="_blank">
      <p>
          1.Displaying or hiding the language bar on the home screen
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&tab_5" target="_blank">
      <p>
          2.Cleaning up a disk on the laptop
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&tab_6" target="_blank">
      <p>
          3.Care tips for you laptop
      </p>
  </a>
</li>
  `,`
  <li>
  <img class="lazyload" data-src="/img/support_icon_3.png" alt="oscal">
  <p class="number">
      OS FAQs
  </p>
      <p class="msg">
          Get the latest os updates
          for your device
      </p>
</li>
<li>
  <a href="./faqs/faq.html&lap_5" target="_blank">
      <p>
      1.How to enable TalkBack/Screen Reader
      </p>
  </a>
</li>
<li>
  <a href="./faqs/faq.html&lap_6" target="_blank">
      <p>
      2.How to reset a tablet to its factory settings
      </p>
  </a>
</li>
  `,`
  <li>
  <img class="lazyload" data-src="/img/support_icon_3.png" alt="oscal">
  <p class="number">
      OS FAQs
  </p>
      <p class="msg">
          Get the latest os updates
          for your device
      </p>
</li>
<li>
  <a href="./faqs/faq.html&acc_4" target="_blank">
      <p>
      1.Working range of Bluetooth
      </p>
  </a>
</li>

  `]
  let index = 0
  selectProSort = function (selProName) {
    //0-phone,1-Tablets,2-Laptops,3-Accessories
    switch (selProName) {
      case 'Phones': index = 0; break;
      case 'Tablets': index = 1; break;
      case 'Laptops': index = 2; break;
      case 'Accessories': index = 3; break;
    }
    index == 1 ? $('.preSale-list').hide() : $('.preSale-list').show()

    $('.faq-list').html(faq_list[index])
    $('.preSale-list').html(preSale_list[index])
    $('.afterSale-list').html(afterSale_list[index])
  }

  var typeData = []
  var typeData_1 = [
    {
      tit: 'Do I still need to pay custom fee?',
      msg: "Shipping from CN, the order price doesn't include custom tax fee. Different countries have different custom rules. After we hand your package to the shipping carrier, the carrier will adjust the declaration based on your local custom policies."
    },
    {
      tit: 'What is the version of items ?',
      msg: 'Please look carefully at the title of product, if it says Global Version, then it is the officially global version with global firmware. '
    },
    {
      tit: 'How can I get other discounts?',
      msg: 'A. Get the store coupons on store home page; B. Contact with us to get more information about daily promo codes'
    },
    {
      tit: 'What to do if my phone gets heat?',
      msg: `
      1.The mobile phone running high-power applications (such as demanding games) will generate heat. If it is overheated, please pause it for a while before using it.<br>
      2.The heat dissipation effect of the mobile phone with the metal bottom case is higher than that with the plastic bottom case, so in general, the temperature of the metal bottom case will be higher than that of the plastic bottom case. The phone with metal bottom case will radiate the heat through the case and it heats up and dissipates quickly. If you find heat generation during use, it is recommended to clean the background of the phone and then let it stand for a period of time before running. If the temperature is high and you are worried, you can directly shut down the phone and place it on the cool and ventilate places like the floor for heat dissipation.<br>
      3.The phone will be very hot when it is running for a long time. At this time, you need to close some running apps (such as games, videos, music, etc.)<br>
      4.Remember not to use the mobile phone when charging, let alone charging while talking, because playing while charging can cause great damage to the battery, and the heat emitted by the phone at this time is much higher than the heat emitted during normal use.<br>
      5.Using the mobile phone under the sun or on a quilt will cause more heat than normal. Under the sun, the heat will be absorbed by the phone; on a quilt, it’s easy to generate accumulated temperature and cause heat.
      `
    },
    {
      tit: 'How to solve the application error?',
      msg: `
    1.It’s the third-party application. Unstall it and download on the app website.<br>
2.Long press and enter into the application to find the storage. Then clean the storage and cache.<br>
3.Enter Google account to update the apk. <br>
4.If it’s the error from the apps that come with the system, just restore the factory settings or flash the phone. `
    },
    {
      tit: 'What’s the difference between Doke OS and the original Android OS?',
      msg: 'Doke OS is developed based on the Android OS and provides a more user-friendly interface with clear icons, a smarter control and smoother operation. '
    },
    {
      tit: 'Will it get stuck when running the OS?',
      msg: 'No. Our OS optimizes the interaction and brings a better operation experience to our users. '
    },
    {
      tit: 'What’s the key features of the OS?',
      msg: 'The main feature of Doke OS features is the System manager. If provides a smart control over the trash cleaning, battery performance, gaming boosting and app management. '
    },
    {
      tit: 'What to do if my voice cannot be heard when calling? ',
      msg: `
      1.The calling environment or the calling environment of the receiver is not good. You can check whether the phone has signal or not when you can't hear the sound. Change to a place where there is a signal and dial again.
2.If the mute permission is turned on for a mobile phone call, the receiver will not hear the sound. During the call, you can turn off the mute setting.
3.Use the phone recorder to check whether the microphone is broken. The pointer swings during recording, which means it is normal (you can check whether the receiver’s handset is silent). If it’s not, it means that there is a problem with the microphone and needs to be disassembled for repair.
4.If the pointer does not swing when recording, and it can be tested on the charging and speakers. If there is no sound, it means the cable is loose and you can go to the local repair shop for repair. If all are no problem, you can go to the local shop to repair the microphone. If the speaker has no sound but the charging is no problem, you need to return it for analysis.
      `
    },
    {
      tit: 'What to do if my voice cannot be heard when calling? ',
      msg: `
      1.The calling environment or the calling environment of the receiver is not good. You can check whether the phone has signal or not when you can't hear the sound. Change to a place where there is a signal and dial again.
2.If the mute permission is turned on for a mobile phone call, the receiver will not hear the sound. During the call, you can turn off the mute setting.
3.Use the phone recorder to check whether the microphone is broken. The pointer swings during recording, which means it is normal (you can check whether the receiver’s handset is silent). If it’s not, it means that there is a problem with the microphone and needs to be disassembled for repair.
4.If the pointer does not swing when recording, and it can be tested on the charging and speakers. If there is no sound, it means the cable is loose and you can go to the local repair shop for repair. If all are no problem, you can go to the local shop to repair the microphone. If the speaker has no sound but the charging is no problem, you need to return it for analysis.
      `
    },
  ]
  var typeData_2 = [
    {
      tit: 'Touchpad gestures',
      msg: `
      The keyboard touchpad supports gesture controls and works like a mouse for more convenient laptop operations.<br>
Common touchpad gestures:<br>
a.Slide with one finger: move the cursor<br>
b.Tap with one finger: left-click on the mouse<br>
c.Double-tap with one finger: double-click on the left mouse button<br>
d.Tap with two fingers: right-click the mouse<br>
e.Double-tap with two fingers: double-click on the right mouse button<br>
f.Slide with two fingers: scroll up or down and left or right on the page<br>
g.Spread or pinch with two fingers: zoom in or out<br>
h.Tap with three fingers: Invoke Cortana<br>
i.Slide up with three fingers: show all tasks<br>
j.Slide down with three fingers: display the desktop<br>
k.Slide to the left or right with three fingers: switch between apps<br>
l.Tap with four fingers: open Action center
      `
    },
    {
      tit: 'Viewing the Windows system activation time',
      msg: `
      In normal cases, the system is automatically activated when a new device is connected to the Internet. You can estimate the activation time of the system by using the time when the laptop is connected to the Internet for the first time.<br>
      After the laptop is activated, your activation information will be stored on the Microsoft activation server. You can also contact Microsoft, for example, calling their hotline, to confirm the activation time of your laptop system.  
      `
    },
    {
      tit: 'Viewing the location of programs and apps downloaded from the Microsoft Store',
      msg: `
      Programs and apps downloaded from the Microsoft Store are installed in the following path by default: C:/Program Files/WindowsApps (Hidden items). To check hidden items, open This PC, click View and select Hidden items.<br>
      Note: You need to obtain permission to view this folder: To obtain the permission:<br>
      Double-click WindowsApps, go to Continue > security tab > Advanced > Change. Enter the current account name in the pop-up window and click OK.
      `
    },
    {
      tit: 'Displaying or hiding the language bar on the home screen',
      msg: `
      By default, the language bar is enabled on your computer. You can see the language bar of the input method on the right corner of the taskbar.
To hide the language bar, perform the following steps:
1.Click the Windows icon and the Settings icon, and select Devices.
2.Select Typing and click Advanced keyboard settings.
3.Select Use the desktop language bar when it's available. You can also deselect the option to display the language bar.
      `
    }
    ,
    {
      tit: 'Cleaning up a disk on the laptop',
      msg: `
      1.Enter disk cleanup in the search box on the taskbar and select Disk Cleanup.

2.Select the disk you want to clean up, for example, the C drive, and select OK.

3.Select the file you want to delete and select OK. In the displayed dialog box, select Delete Files.
      `
    }
    ,
    {
      tit: 'Care tips for you laptop',
      msg: `
      Use a laptop cleaning brush and neutral, non-corrosive cleaner to clean the surface of your laptop. Prevent liquid from entering your laptop during cleaning.
      `
    }
    ,
    {
      tit: 'Creating a partition',
      msg: `
      1.Press the Win and E keys at the same time to display the File Explorer.

2.Right-click the Windows icon, or press the Win and the X key at the same time and click Disk Management.

3.You are able to check the disk partition in the pop-up Disk Management window. Right-click on the disk you want to partition, select Shrink Volume, and the system will automatically check for available shrink space.

4.Enter the amount you need to reduce in Enter the amount of space to shrink in MB. For example, if you want shrink space by 10 GB, enter 10240 and then click Shrink.

5.Right-click any blank area on Unlocated and select New Simple Volume.

6.In the New Simple Volume Wizard, click Next.

7.Enter the volume size you want to create in Simple volume size in MB and click Next.

8.Select your desired drive letter from the drop-down box for Assign the following drive letter and click Next.

9.Select a specific file system. NTFS is selected by default. Click Next.

10.Click Finish.
      `
    }
  ]
  var typeData_3 = [
    {
      tit: "The tablet's battery drains quickly and has a short standby time",
      msg: `
      msg:  from CN, the order price doesn't include custom tax fee. Different countries have different custom rules. After we hand your package to the shipping carrier, the carrier will adjust the declaration based on your local custom policies."
      `
    },
    {
      tit: 'My tablet gets overheated',
      msg: `It is normal that your device heats up. The faster your tablet consumes power, the more heat it generates. It is recommended that you reduce your tablet's power consumption to prevent it from overheating.

      Solution:
      Go to Settings > Battery , and check the tablet status, and optimize tablet settings as instructed.
      Go to Settings > Battery, and enable Power saving mode or Ultra saving mode.
      Your device will then consume less power and generate less heat. However, this operation may affect user experience. Perform this operation based on the actual usage situation.
      
      Suggestions for daily use:
      1.Avoid placing your device in a hot environment or in direct sunlight.
      2.Avoid placing your device in a poorly ventilated place, such as on a bed or blanket.
      3.Avoid using your device while charging it.
      4.Close background apps that are not in use.
      5.It is recommended that you do not play music, videos, or games at a high volume for a long time.
      `
    },
    {
      tit: 'My tablet is slow to respond when I surf the Internet',
      msg: `
      Please perform the steps below to troubleshoot:
1.Check the network conditions
If this issue occurs when using an audio or video player, use a similar app and check whether the issue persists.
If the issue does not occur again, the server of the app in question may not be responding promptly, or there may be an issue with the audio or video file itself. It is recommended that you switch to a lower image quality or sound quality, or update the app to the latest version and try again. If the issue persists, report the issue to the app's customer service.
If all apps requiring an Internet connection fail to run smoothly, check whether your Mobile data network or Wi-Fi signal is sufficiently strong. If not, connect your device to a network with a stronger signal. Or alternatively, enable Airplane mode, wait for a short while and disable it, and then try again.
You can also reset the network settings and try again.
2.Clean up storage space
If your device's RAM or storage space is insufficient, the app may freeze while being used. Go to System Manager((Via OTA to update) and clean your device's storage space.
3.Clear background apps
If this issue occurs when a large number of apps are running in the background, close the apps that you are not using and try again.`
    },
    {
      tit: 'Find the serial number (SN) on tablets',
      msg: `
      What is an SN?
      SN, or serial number, is a unique number that records information like the date of production and the warranty status of the product. Each product has only one corresponding serial number.
      How to find it?
      Enter *#06# on the dialer and the SN will appear on your screen (applicable to the phones and tablets that support SIM cards).      
      `
    },
    {
      tit: 'How to enable TalkBack/Screen Reader',
      msg: `
      What is TalkBack?
      TalkBack is an Android service that gives spoken feedback and notifications for users with visual impairments. With TalkBack enabled, your device will automatically read the content you touch, select, and activate. While TalkBack is enabled, you will be able to navigate across your device in a significantly different way from the regular mode.
      The voice feedback provided by TalkBack is determined by the language engine pre-installed in the system. This means that voice feedback may not be available for all languages.
      Enable TalkBack
      Go to Settings > Accessibility, and enable TalkBack.
      If Talkback or Screen Reader is not enabled on your device, your device does not support this function.
       `
    },
    {
      tit: 'How to reset a tablet to its factory settings',
      msg: `
      Go to Settings >System > Reset options> Factory reset to erase all data.
A factory reset will erase all data from the storage space of your device, including:
1.Your accounts
2.App data and system settings
3.Installed apps, music files, photos, and all files in the internal storage
Make sure to back up your data before a factory reset.`
    },
  ]
  var typeData_4 = [
    {
      tit: 'What is the weight of the AirBuds 3?',
      msg: `
      The weight of a single AirBuds 3 earbud is 3 grams(g) while the entire device weighs 30g.`
    },
    {
      tit: 'How to charge AirBuds 3?',
      msg: 'The headphones charge while in the charging case. To charge, place the headphones in the charging case, and close the charging case cover.'
    },
    {
      tit: 'Do both the AirBuds 3 headphones and charging case have batteries?',
      msg: 'The headphones and case both have batteries. The buds have a 30mAh battery and the charging case has a 220mAh battery.'
    },
    {
      tit: 'Working range of Bluetooth',
      msg: `
      You are advised to perform all Bluetooth operations while keeping your headphones within a 10 meter radius from your other Bluetooth device(s).
      This distance may vary according to the environment in which you use these devices. For example, there may be possible sources of wireless interference (such as microwave ovens) or physical obstacles (such as walls or human bodies), which affect the effective range of your Bluetooth.       `
    }

  ]
  ProductType = function (name) {
    let html = ''
    let proname = ''
    switch (name) {
      case 'Phones': { typeData = typeData_1; proname = 'pho' }; break;
      case 'Tablets': { typeData = typeData_2; proname = 'tab' }; break;
      case 'Laptops': { typeData = typeData_3; proname = 'lap' }; break;
      case 'Accessories': { typeData = typeData_4; proname = 'acc' }; break;
    }
    for (let i = 0; i < typeData.length; i++) {
      html += `
      <li>
                                <h3>
                                    <a href="./faqs/faq.html&${proname + '_' + (i + 1)}" target="_blank">
                                        ${typeData[i].tit}
                                    </a>
                                </h3>
                                <p class="msg">
                                ${typeData[i].msg}
                                </p>
                            </li>
      `
    }
    $('.rightBox .problem_list .dataList').html(html)
  }

  $('.supportBox .productBox ul li').click(function () {
    $('.supportBox .productBox .faq_box').show()
  })

  $('.sup-ContentBox .pro_li').click(function () {
    $('.sup-ContentBox .pro_li').removeClass('active')
    $(this).addClass('active')
  })
  var flag_1 = false
  $('.sup-ContentBox .leftBox .pro_type .name').click(function () {
    if (flag_1) {
      $(this).parent().find('.name span').text('-')
      $(this).parent().find('.pro_ul').show('fast')
      flag_1 = false
    } else {
      $(this).parent().find('.name span').text('+')
      $(this).parent().find('ul').hide('fast')
      flag_1 = true
    }
  })
  var flag_2 = false
  $('.sup-ContentBox .leftBox .art_type .name').click(function () {
    if (flag_2) {
      $(this).parent().find('.name span').text('-')
      $(this).parent().find('ul').show('fast')
      flag_2 = false
    } else {
      $(this).parent().find('.name span').text('+')
      $(this).parent().find('ul').hide('fast')
      flag_2 = true
    }
  })
})