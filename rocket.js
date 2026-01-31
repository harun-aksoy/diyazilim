import {View, Text, Color, Animation, Gesture, Physic, Image} from "mukk";

const audioPop = new Audio('./sounds/pop-ui.wav');
audioPop.preload = 'auto';

const audioUp = new Audio('./sounds/up-ui.wav');
audioUp.preload = 'auto';

const audioRocket = new Audio('./sounds/rocket-oldu.wav');
audioRocket.preload = 'auto';
const audioLand = new Audio('./sounds/point1.ogg');
audioRocket.preload = 'auto';

const audioPoint = new Audio('./sounds/point1.ogg');
audioRocket.preload = 'auto';

// === ANA ALAN ===
const lessonArea = View()
  .on("resize",(self,w,h)=>{
    self.frame(self.full,400).position(self.center,self.top).padding(20);
  })
  .radius(20)
  .shadow("rgba(0,0,0,0.15)",8,0,4)
  .background(Color("linear-gradient(160deg, #59c1f194 0%, #40b0fab4 100%)"));

// === ZEMİN ve DUVARLAR ===
["bottom","left","right"].forEach(side=>{
  View().components(Physic).parent(lessonArea)
    .on("resize",(self,w,h)=>{
      if (side==="bottom") self.frame(w,50).position(self.center,self.bottom).collider("box",{width:w,height:50});
      if (side==="left")   self.frame(10,h).position(self.leading,self.center).collider("box",{width:10,height:h});
      if (side==="right")  self.frame(10,h).position(self.trailing,self.center).collider("box",{width:10,height:h});
    })
    .background(Color("transparent"))
    .mass(0);
});

// === DERSLER ===
const lessons = [
  {
    title: "Önce Rokete Kütle Ver",
    desc: "Aşağıya   rocket.mass(1)   yaz ve Enter'e bas..."
  },
  {
    title: "Butonla Rokete Hız Ver",
    desc: "button.onPress( e => rocket.velocity(0,-3) )"
  },
];

let currentLesson = 0;



// === ORTAK BUTON ===
const button = View().components(Gesture,Physic)
  .radius(10)
  .background(Color("#ff6b81"))
  .shadow("rgba(0,0,0,0.2)",4,0,3)
  .mass(0)
  .on("resize",(self,w,h)=>{
    self.frame(120,40).position(self.center,self.bottom).offset(0,-10)
    self.style.cursor = "pointer";
    self.style.textAlign = "center";
    self.style.lineHeight = "40px";
    self.collider("box",{width:120,height:40})
  });

button.onPress = function (fn) {
  button.on("press", (self, check) => fn(self))
  return button; // chain için
}

button.on('tap',(self,end)=>{
  if(end)  {
    self.shadow("rgba(0,0,0,0.4)",4,0,3)
    audioUp.currentTime = 0;
    audioUp.play()
    flame.background(Image('./assets/flame-iyi.gif').fit('contain'))
      .position(50)
      .frame(60)
    audioRocket.pause()
  }
  if(!end) {
    self.shadow("rgba(0,0,0,0.4)",0,0,0)
    audioPop.currentTime = 0;
    audioPop.play()
      flame.background(Image('./assets/flame-genis.gif').fit('contain'))
      .position(20)
      .frame(120)
    audioRocket.play()
  }
})
button.parent(lessonArea);
button.on('hit',(self,hitend)=>{
    audioLand.currentTime = 0;
    audioLand.play()
    loadLesson(1)
    button.off('hit')
})


View().components(Physic).parent(lessonArea)
    .on("resize",(self,w,h)=>{
      self.frame(self.full,50).position(self.center,self.top).offset(0,-65).collider("box",{width:w,height:50});
    })
    .background(Color("transparent"))
    .mass(0)
    .on('hit',(self,hitend)=>{
      audioPoint.currentTime = 0;
      audioPoint.play()

      rocket.dispatchEvent(new MouseEvent("click", {
        clientX: rocket.position()[0],
        clientY: rocket.position()[1]
      }));

      title.textContent = "🎉 Tebrikler!";
      desc.textContent  = "Tüm dersleri bitirdin 🚀";
      nextBtn.destroy();
    })



// === ROKET & KUTU ===
const rocket = View().components(Physic)
  .parent(lessonArea).name('rocketId')
  .background(Image('./assets/rocket-1.png').fit('contain'))
  .frame(60,70)
  .on('resize',self=>{
    self.position(self.center,130).collider("box",{width:60,height:70})
  })
  .mass(0);

const flame = View()
      .parent(rocket)
      .background(Image('./assets/flame-iyi.gif').fit('contain'))
      .position(50)
      .frame(60)
      .angle(-90)
      flame.style.pointerEvents = 'none'

let confetti = new Confetti('rocketId');
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(true);



// === DERS BAŞLIKLARI ===
const title = Text("").family("system-ui").size(18).weight("600").foreground("#222");
const desc  = Text("").family("system-ui").size(14).foreground("#444");
const infoView = View().parent(lessonArea).child(title, desc)
  .on("resize",(self,w,h)=>{
    self.frame(self.full,100).padding(20,0).position(self.center,70);
    title.style.display = "block";
    //title.style.fontFamily = 'Tiny5'
    //desc.style.fontFamily = 'Tiny5'
    desc.style.display = "block";
    desc.style.marginTop = "-60px";
    title.style.textAlign = "center";
    desc.style.textAlign = "center";
  });

// === KOD ALANI ===
const codeInput = document.createElement("textarea");
codeInput.placeholder = "Buraya kodunu yaz... Ardından Enter'le";
Object.assign(codeInput.style,{
  position: "absolute",
  left: "0px",
  top: "100%",
  width: "90%",
  height: "60px",
  fontFamily: "monospace",
  fontSize: "14px",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  background: "#1e1e1e",
  color: "#dcdcdc",
  resize: "none",
  outline: "2px solid dodgerblue",
  margin: "10px auto",
  display: "block",
});
lessonArea.appendChild(codeInput);

// === ENTER İLE KODU ÇALIŞTIR ===
codeInput.addEventListener("keydown", (e)=>{
  if (e.key === "Enter") {
    e.preventDefault();
    runCode();
  }
});

function runCode(){
  try {
    const code = codeInput.value.trim();
    if (code) eval(code);
  } catch(err) {
    console.error("Kod hatası:", err);
  }
  codeInput.value = "";
}

// === DERS YÜKLEYİCİ ===
function loadLesson(index){
  const l = lessons[index];
  if (!l) return;
  title.textContent = l.title;
  desc.textContent  = l.desc;
}
loadLesson(currentLesson);




// === İLERLEME BUTONU ===
const nextBtn1 = View().components(Gesture)
  .background(Image('./btns/btn-arrow-right.png').fit('contain'))
  .on("resize",(self,w,h)=>{
    self.frame(40,40).position(self.trailing,self.top).offset(-10,10)
    self.style.cursor = "pointer";
    self.style.textAlign = "center";
    self.style.lineHeight = "40px";
  });

nextBtn1.style.cursor = "pointer";
nextBtn1.style.textAlign = "center";
nextBtn1.parent(lessonArea);


nextBtn1.on("tap", (self,check)=>{
  if(!check) {
    self.background(Image('./btns/btn-arrow-right-tap.png').fit('contain'))
    audioUp.currentTime = 0;
    audioUp.play()
  }
  if (check) {
    self.background(Image('./btns/btn-arrow-right.png').fit('contain'))
    audioPop.currentTime = 0;
    audioPop.play()
    currentLesson++;
    if (currentLesson >= lessons.length) {
      title.textContent = "🎉 Tebrikler!";
      desc.textContent  = "Tüm dersleri bitirdin 🚀";
      nextBtn.hide();
    } else {
      loadLesson(currentLesson);
    }
  }
});




// === GERİLEME BUTONU ===
const backBtn1 = View().components(Gesture)
  .background(Image('./btns/btn-arrow-left.png').fit('contain'))
  .on("resize",(self,w,h)=>{
    self.frame(40,40).position(self.leading,self.top).offset(10,10)
    self.style.cursor = "pointer";
    self.style.textAlign = "center";
    self.style.lineHeight = "40px";
  });

backBtn1.style.cursor = "pointer";
backBtn1.style.textAlign = "center";
backBtn1.parent(lessonArea);


backBtn1.on("tap", (self,check)=>{
  if(!check) {
    self.background(Image('./btns/btn-arrow-left-tap.png').fit('contain'))
    audioPop.currentTime = 0;
    audioPop.play()
  }
  if (check) {
    self.background(Image('./btns/btn-arrow-left.png').fit('contain'))
    audioUp.currentTime = 0;
    audioUp.play()
    currentLesson--;
    if (currentLesson >= lessons.length) {
      title.textContent = "🎉 Tebrikler!";
      desc.textContent  = "Tüm dersleri bitirdin 🚀";
      nextBtn.hide();
    } else {
      loadLesson(currentLesson);
    }
  }
});





