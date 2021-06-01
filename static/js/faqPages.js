$(function () {
  var faqData = ''
  var lapData = {
    'lap_1': {
      tit: 'Touchpad gestures',
      msg: `
      The keyboard touchpad supports gesture controls and works like a mouse for more convenient laptop operations.<br><br>
Common touchpad gestures:<br><br>
a.Slide with one finger: move the cursor<br><br>
b.Tap with one finger: left-click on the mouse<br><br>
c.Double-tap with one finger: double-click on the left mouse button<br><br>
d.Tap with two fingers: right-click the mouse<br><br>
e.Double-tap with two fingers: double-click on the right mouse button<br><br>
f.Slide with two fingers: scroll up or down and left or right on the page<br><br>
g.Spread or pinch with two fingers: zoom in or out<br><br>
h.Tap with three fingers: Invoke Cortana<br><br>
i.Slide up with three fingers: show all tasks<br><br>
j.Slide down with three fingers: display the desktop<br><br>
k.Slide to the left or right with three fingers: switch between apps<br><br>
l.Tap with four fingers: open Action center
      `
    },
    'lap_2': {
      tit: 'Viewing the Windows system activation time',
      msg: `
      In normal cases, the system is automatically activated when a new device is connected to the Internet. You can estimate the activation time of the system by using the time when the laptop is connected to the Internet for the first time.<br><br>
      After the laptop is activated, your activation information will be stored on the Microsoft activation server. You can also contact Microsoft, for example, calling their hotline, to confirm the activation time of your laptop system.  
      `
    },
    'lap_3': {
      tit: 'Viewing the location of programs and apps downloaded from the Microsoft Store',
      msg: `
      Programs and apps downloaded from the Microsoft Store are installed in the following path by default: C:/Program Files/WindowsApps (Hidden items). To check hidden items, open This PC, click View and select Hidden items.<br><br>
      Note: You need to obtain permission to view this folder: To obtain the permission:<br><br>
      Double-click WindowsApps, go to Continue > security tab > Advanced > Change. Enter the current account name in the pop-up window and click OK.
      `
    },
    'lap_4': {
      tit: 'Displaying or hiding the language bar on the home screen',
      msg: `
      By default, the language bar is enabled on your computer. You can see the language bar of the input method on the right corner of the taskbar.<br><br>
To hide the language bar, perform the following steps:<br><br>
1.Click the Windows icon and the Settings icon, and select Devices.<br><br>
2.Select Typing and click Advanced keyboard settings.<br><br>
3.Select Use the desktop language bar when it's available. You can also deselect the option to display the language bar.
      `
    },
    'lap_5': {
      tit: 'Cleaning up a disk on the laptop',
      msg: `
      1.Enter disk cleanup in the search box on the taskbar and select Disk Cleanup.<br><br>

2.Select the disk you want to clean up, for example, the C drive, and select OK.<br><br>

3.Select the file you want to delete and select OK. In the displayed dialog box, select Delete Files.
      `
    },
    'lap_6': {
      tit: 'Care tips for you laptop',
      msg: `
      Use a laptop cleaning brush and neutral, non-corrosive cleaner to clean the surface of your laptop. Prevent liquid from entering your laptop during cleaning.
      `
    },
    'lap_7': {
      tit: 'Creating a partition',
      msg: `
      1.Press the Win and E keys at the same time to display the File Explorer.<br><br>

2.Right-click the Windows icon, or press the Win and the X key at the same time and click Disk Management.<br><br>

3.You are able to check the disk partition in the pop-up Disk Management window. Right-click on the disk you want to partition, select Shrink Volume, and the system will automatically check for available shrink space.<br><br>

4.Enter the amount you need to reduce in Enter the amount of space to shrink in MB. For example, if you want shrink space by 10 GB, enter 10240 and then click Shrink.<br><br>

5.Right-click any blank area on Unlocated and select New Simple Volume.<br><br>

6.In the New Simple Volume Wizard, click Next.<br><br>

7.Enter the volume size you want to create in Simple volume size in MB and click Next.<br><br>

8.Select your desired drive letter from the drop-down box for Assign the following drive letter and click Next.<br><br>

9.Select a specific file system. NTFS is selected by default. Click Next.<br><br>

10.Click Finish.
      `
    }
  }
  var phoData = {
    'pho_1': {
      tit: 'Do I still need to pay custom fee?',
      msg: "Shipping from CN, the order price doesn't include custom tax fee. Different countries have different custom rules. After we hand your package to the shipping carrier, the carrier will adjust the declaration based on your local custom policies."
    },
    'pho_2': {
      tit: 'What is the version of items?',
      msg: 'Please look carefully at the title of product, if it says Global Version, then it is the officially global version with global firmware. '
    },
    'pho_3': {
      tit: 'How can I get other discounts?',
      msg: 'A. Get the store coupons on store home page; B. Contact with us to get more information about daily promo codes'
    },
    'pho_4': {
      tit: 'What to do if my phone gets heat?',
      msg: `
      1.The mobile phone running high-power applications (such as demanding games) will generate heat. If it is overheated, please pause it for a while before using it.<br><br>
      2.The heat dissipation effect of the mobile phone with the metal bottom case is higher than that with the plastic bottom case, so in general, the temperature of the metal bottom case will be higher than that of the plastic bottom case. The phone with metal bottom case will radiate the heat through the case and it heats up and dissipates quickly. If you find heat generation during use, it is recommended to clean the background of the phone and then let it stand for a period of time before running. If the temperature is high and you are worried, you can directly shut down the phone and place it on the cool and ventilate places like the floor for heat dissipation.<br><br>
      3.The phone will be very hot when it is running for a long time. At this time, you need to close some running apps (such as games, videos, music, etc.)<br><br>
      4.Remember not to use the mobile phone when charging, let alone charging while talking, because playing while charging can cause great damage to the battery, and the heat emitted by the phone at this time is much higher than the heat emitted during normal use.<br><br>
      5.Using the mobile phone under the sun or on a quilt will cause more heat than normal. Under the sun, the heat will be absorbed by the phone; on a quilt, it’s easy to generate accumulated temperature and cause heat.
      `
      // tit: 'How to track my logistic information?',
      // msg: 'If you choose the aliexpress standard shipping, then you can check the tracking information on this site: global.cainiao.com/?spm=5261.8152913.0.0.f76e316d0nW7hB (Copy the link address and paste to your web browser) '
    },
    'pho_5': {
      tit: 'How to solve the application error?',
      msg: `
    1.It’s the third-party application. Unstall it and download on the app website.<br><br>
2.Long press and enter into the application to find the storage. Then clean the storage and cache.<br><br>
3.Enter Google account to update the apk. <br><br>
4.If it’s the error from the apps that come with the system, just restore the factory settings or flash the phone. `
    },
    'pho_6': {
      tit: 'What’s the difference between Doke OS and the original Android OS?',
      msg: 'Doke OS is developed based on the Android OS and provides a more user-friendly interface with clear icons, a smarter control and smoother operation. '

    },
    'pho_7': {
      tit: 'Will it get stuck when running the OS?',
      msg: 'No. Our OS optimizes the interaction and brings a better operation experience to our users. '
    },
    'pho_8': {
      tit: 'What’s the key features of the OS?',
      msg: 'The main feature of Doke OS features is the System manager. If provides a smart control over the trash cleaning, battery performance, gaming boosting and app management. '
    },
    'pho_9': {
      tit: 'What to do if my voice cannot be heard when calling? ',
      msg: `
      1.The calling environment or the calling environment of the receiver is not good. You can check whether the phone has signal or not when you can't hear the sound. Change to a place where there is a signal and dial again.<br><br>
2.If the mute permission is turned on for a mobile phone call, the receiver will not hear the sound. During the call, you can turn off the mute setting.<br><br>
3.Use the phone recorder to check whether the microphone is broken. The pointer swings during recording, which means it is normal (you can check whether the receiver’s handset is silent). If it’s not, it means that there is a problem with the microphone and needs to be disassembled for repair.<br><br>
4.If the pointer does not swing when recording, and it can be tested on the charging and speakers. If there is no sound, it means the cable is loose and you can go to the local repair shop for repair. If all are no problem, you can go to the local shop to repair the microphone. If the speaker has no sound but the charging is no problem, you need to return it for analysis.
      `
    }
  }
  var tabData = {
    'tab_1': {
      tit: "The tablet's battery drains quickly and has a short standby time",
      msg: `
      msg:  from CN, the order price doesn't include custom tax fee. Different countries have different custom rules. After we hand your package to the shipping carrier, the carrier will adjust the declaration based on your local custom policies."
      `
    },
    'tab_2': {
      tit: 'My tablet gets overheated',
      msg: `It is normal that your device heats up. The faster your tablet consumes power, the more heat it generates. It is recommended that you reduce your tablet's power consumption to prevent it from overheating.<br><br>
      Solution:<br><br>
      Go to Settings > Battery , and check the tablet status, and optimize tablet settings as instructed.<br><br>
      Go to Settings > Battery, and enable Power saving mode or Ultra saving mode.<br><br>
      Your device will then consume less power and generate less heat. However, this operation may affect user experience. Perform this operation based on the actual usage situation.<br><br>
      Suggestions for daily use:<br><br>
      1.Avoid placing your device in a hot environment or in direct sunlight.<br><br>
      2.Avoid placing your device in a poorly ventilated place, such as on a bed or blanket.<br><br>
      3.Avoid using your device while charging it.<br><br>
      4.Close background apps that are not in use.<br><br>
      5.It is recommended that you do not play music, videos, or games at a high volume for a long time.
      `
    },
    'tab_3': {
      tit: 'My tablet is slow to respond when I surf the Internet',
      msg: `
      Please perform the steps below to troubleshoot:<br><br>
1.Check the network conditions<br><br>
If this issue occurs when using an audio or video player, use a similar app and check whether the issue persists.<br><br>
*If the issue does not occur again, the server of the app in question may not be responding promptly, or there may be an issue with the audio or video file itself. It is recommended that you switch to a lower image quality or sound quality, or update the app to the latest version and try again. If the issue persists, report the issue to the app's customer service.<br><br>
*If all apps requiring an Internet connection fail to run smoothly, check whether your Mobile data network or Wi-Fi signal is sufficiently strong. If not, connect your device to a network with a stronger signal. Or alternatively, enable Airplane mode, wait for a short while and disable it, and then try again.<br><br>
You can also reset the network settings and try again.<br><br>
2.Clean up storage space<br><br>
*If your device's RAM or storage space is insufficient, the app may freeze while being used. Go to System Manager((Via OTA to update) and clean your device's storage space.<br><br>
3.Clear background apps<br><br>
If this issue occurs when a large number of apps are running in the background, close the apps that you are not using and try again.`
    },
    'tab_4': {
      tit: 'Find the serial number (SN) on tablets',
      msg: `
      What is an SN?<br><br>
      SN, or serial number, is a unique number that records information like the date of production and the warranty status of the product. Each product has only one corresponding serial number.<br><br>
      How to find it?<br><br>
      Enter *#06# on the dialer and the SN will appear on your screen (applicable to the phones and tablets that support SIM cards).      
      `
    },
    'tab_5': {
      tit: 'How to enable TalkBack/Screen Reader',
      msg: `
      What is TalkBack?<br><br>
      TalkBack is an Android service that gives spoken feedback and notifications for users with visual impairments. With TalkBack enabled, your device will automatically read the content you touch, select, and activate. While TalkBack is enabled, you will be able to navigate across your device in a significantly different way from the regular mode.<br><br>
      *The voice feedback provided by TalkBack is determined by the language engine pre-installed in the system. This means that voice feedback may not be available for all languages.<br><br>
      Enable TalkBack<br><br>
      Go to Settings > Accessibility, and enable TalkBack.<br><br>
      *If Talkback or Screen Reader is not enabled on your device, your device does not support this function.
       `
    },
    'tab_6': {
      tit: 'How to reset a tablet to its factory settings',
      msg: `
      Go to Settings >System > Reset options> Factory reset to erase all data.<br><br>
A factory reset will erase all data from the storage space of your device, including:<br><br>
1.Your accounts<br><br>
2.App data and system settings<br><br>
3.Installed apps, music files, photos, and all files in the internal storage<br><br>
*Make sure to back up your data before a factory reset.`
    },
  }
  var accData = {
    'acc_1': {
      tit: 'What is the weight of the AirBuds 3?',
      msg: `
      The weight of a single AirBuds 3 earbud is 3 grams(g) while the entire device weighs 30g.`
    },
    'acc_2': {
      tit: 'How to charge AirBuds 3?',
      msg: 'The headphones charge while in the charging case. To charge, place the headphones in the charging case, and close the charging case cover.'
    },
    'acc_3': {
      tit: 'Do both the AirBuds 3 headphones and charging case have batteries?',
      msg: 'The headphones and case both have batteries. The buds have a 30mAh battery and the charging case has a 220mAh battery.'
    },
    'acc_4': {
      tit: 'Working range of Bluetooth',
      msg: `
      You are advised to perform all Bluetooth operations while keeping your headphones within a 10 meter radius from your other Bluetooth device(s).
      This distance may vary according to the environment in which you use these devices. For example, there may be possible sources of wireless interference (such as microwave ovens) or physical obstacles (such as walls or human bodies), which affect the effective range of your Bluetooth.       `
    }
  }
  if (GetQueryString()) { //url传值
    let html = ''
    if (GetQueryString().includes('pho')) {
      faqData = phoData
    }
    if (GetQueryString().includes('tab')) {
      faqData = tabData
    }
    if (GetQueryString().includes('lap')) {
      faqData = lapData
    }
    if (GetQueryString().includes('acc')) {
      faqData = accData
    }

    for (var key in faqData) {
      if (key == GetQueryString()) {
        html = `
        <div class="BlogContent" style="">
        <p class="tit" style="text-align: center;font-size: 24px; font-weight: bold;">
           ${faqData[key].tit}
        </p>
        <p class="msg" style="text-align: left;font-size: 18px;line-height:1.5;padding: 2vw 0 0 0;">
           ${faqData[key].msg}
        </p>
    </div>`
        $('.mainContent').html(html)
      }
    }
  }
  function GetQueryString() {
    // var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // var r = window.location.search.substr(1).match(regex);
    // if (r != null) return unescape(r[2]);
    // return null;
    var arr = window.location.href.split("/")
    var len = arr.length
    var params = arr[len - 1];
    var name = params.split("&")[1]
    return name;
  }
})