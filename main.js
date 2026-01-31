import {View, Text, Color, Animation, Physic, Image, Gesture} from "mukk";

// === ROOT ===
const root = View()
  .on("resize", (self,w,h)=>{
    self.frame(w,h).position(w/2,h/2);
  })
  .background(
    View()
      .background(Color("linear-gradient(135deg,#f0f4f8 0%,#ffffff 100%)"))
  );

// === BLUR TOPÇUKLAR ===
function BlurTopcuk(color, size, startX, startY) {
  const b = View()
    .parent(root)
    .radius("50%")
    .background(Color(color))
    .opacity(0.4)
    .on("resize",(self,w,h)=>{
      self.frame(size,size).position(startX,startY);
    });

  Animation(b).ease("inout", 6, true, {loop:Infinity}, (self,p)=>{
    const x = startX + Math.sin(p*2*Math.PI) * 100;
    const y = startY + Math.cos(p*2*Math.PI) * 80;
    self.position(x,y);
  });
  return b;
}
BlurTopcuk("#ff6b81", 200, 300, 400);
BlurTopcuk("#70a1ff", 250, 500, 150);
BlurTopcuk("#7bed9f", 180, -100, 100);

// === APPBAR ===
const appbar = View()
  .parent(root)
  .radius(12)
  .shadow("rgba(0,0,0,0.1)",6,0,2)
  .backdrop("blur(8px)")
  .border("rgba(200,200,200,0.3)",1)
  .on("resize",(self,w,h)=>{
    self.frame(w,60).position(w/2,30).padding(20,0).offset(0,20)
  });
    appbar.style.zIndex = '2'

View()
  .parent(appbar)
  .child(
    Text("Di",
      Text("Yazılım").family("system-ui").size(28).foreground("#007aff")
    )
    .family("system-ui").size(28).weight(600).foreground("#222"),
  )
  .on("resize",(self,w,h)=>{
    self.frame(200,30).position(100,30).offset(20,0)
  });

// === SCROLL ALAN ===
const scrollArea = View()
  .parent(root)
  .on("resize",(self,w,h)=>{
    self.frame(w,h-80).position(w/2,h/2-10);
    self.style.overflowY = "auto";
    self.style.paddingTop = "40px";
    self.style.boxSizing = "border-box";
  });


// === HERO SECTION ===
const hero = View()
  .parent(scrollArea)
  .on("resize",(self,w,h)=>{
    self.frame(w,400).position(w/2,200);
  });

// Başlık
const baslik = Text("Oyun ve Uygulama Yeni Çağı")
  .family("system-ui").size(36).foreground("#111");
baslik.style.whiteSpace = "normal";
baslik.style.wordBreak = "break-word";
baslik.style.fontWeight = "600";
baslik.style.textAlign = "center";



// Açıklama
const aciklama = Text("Yazılımı insanların hayatına dokunacak şekilde tasarlıyoruz. Daha hızlı, daha esnek, daha özgür bir geliştirme deneyimi.")
  .family("system-ui").size(18).foreground("#444");
aciklama.style.whiteSpace = "normal";
aciklama.style.wordBreak = "break-word";
aciklama.style.lineHeight = "1.5";
aciklama.style.textAlign = "center";

View().parent(hero).child(aciklama)
  .on("resize",(self,w,h)=>{
    self.frame(w*0.7,100).position(w/2,h/2.1);
  });

// CTA
const ctas = View().parent(hero)
  .on("resize",(self,w,h)=>{
    self.frame(300,50).position(w/2,h/1.6);
  });

View().parent(hero).child(baslik)
  .on("resize",(self,w,h)=>{
    self.frame(w*0.8,60).position(w/2,h/4);
  });
  
const baslaText = Text("Başla").family("system-ui").size(18).foreground("#fff");
baslaText.style.cursor = "pointer";
View().parent(ctas)
  .radius(8).shadow("rgba(0,0,0,0.1)",4,0,2)
  .background(Color("#007aff"))
  .child(baslaText)
  .on("resize",(self,w,h)=>{
    self.frame(120,40).position(80,25);
    self.style.textAlign = "center";
    self.style.lineHeight = "40px";
  });

const githubText = Text("GitHub").family("system-ui").size(18).foreground("#333");
githubText.style.cursor = "pointer";
View().parent(ctas)
  .radius(8).border("#ccc",1)
  .child(githubText)
  .on("resize",(self,w,h)=>{
    self.frame(120,40).position(220,25);
    self.style.textAlign = "center";
    self.style.lineHeight = "40px";
  });

// === EK METİNLER (Scroll için) ===
function Section(title, desc, offsetY) {
  const section = View().parent(scrollArea)
    .on("resize",(self,w,h)=>{
      self.frame(w,200).position(w/2,offsetY);
    });

  const t = Text(title).family("system-ui").size(24).foreground("#111");
  t.style.fontWeight = "600";
  t.style.textAlign = "center";
  View().parent(section).child(t)
    .on("resize",(self,w,h)=>{
      self.frame(w*0.8,40).position(w/2,30);
    });

  const d = Text(desc).family("system-ui").size(16).foreground("#555");
  d.style.whiteSpace = "normal";
  d.style.wordBreak = "break-word";
  d.style.lineHeight = "1.5";
  d.style.textAlign = "center";
  View().parent(section).child(d)
    .on("resize",(self,w,h)=>{
      self.frame(w*0.7,100).position(w/2,100);
    });

  return section;
}

Section("Hızlı Prototipleme",
  "Geliştirdiğimiz framework ile fikirlerinizi saatler içinde hayata geçirin. Minimal kod, maksimum hız.", 650);

Section("Çapraz Platform",
  "Tek kod tabanı ile hem oyunlarınızı hem uygulamalarınızı tüm platformlarda yayınlayın.", 1020);

Section("Topluluk Odaklı",
"Geliştirici topluluğuyla birlikte büyüyen açık kaynak bir framework.", 1900);



Section("Gerçek Fizikler","Yeni Fizik Modülü sayesinde Tam Zamanlı DOM fizikleri ile nesnelerinize fizik eklemek çok kolay.", 1300);
Section("Fizik Modülü","kutu.addImpulse(0,-300)", 1500)

const area = View()
  .parent(scrollArea)
  .on("resize",(self,w,h)=>{
    self
    .frame(w*0.8,200)
    .position(w/2,1500);
  })
  .border()
  .radius(20)
  .background(Color("linear-gradient(135deg, #f9f9f973 0%, #007bff4c 100%)"))

View().components(Physic)
  .parent(area)
  .on("resize",(self,w,h)=>{
    self
    .frame(w,10)
    .position(self.center,self.bottom)
    .collider('box',{width:self.frame()[0],height:self.frame()[1]})
  })
  .background(Color('transparent'))
  .mass(0)
View().components(Physic)
  .parent(area)
  .on("resize",(self,w,h)=>{
    self
    .frame(10,200)
    .position(self.leading,self.bottom)
    .collider('box',{width:20,height:200})
  })
  .background(Color('transparent'))
  .mass(0)
View().components(Physic)
  .parent(area)
  .on("resize",(self,w,h)=>{
    self
    .frame(10,200)
    .position(self.trailing,self.bottom)
    .collider('box',{width:20,height:200})
  })
  .background(Color('transparent'))
  .mass(0)


// === FİZİKLİ KUTULAR ===
function createFallingBox() {
  const size = 30 + Math.random()*30; //30-50 px
  const x = 50 + Math.random() * (area.frame()[0] - 100);
  const color = `hsl(${Math.random()*360},70%,60%)`;

  const box = View().components(Physic)
    .parent(area)
    .frame(size,size)
    .position(x, -50) // yukarıdan başlasın
    .background(Color(color))
    .radius(6)
    .collider("box",{width:size,height:size})
    .mass(1)

  // Ufak bir yana doğru impulse verelim (çok az)
  const impulseX = (Math.random() * 40) - 20; // -20 ↔ 20
  box.addImpulse(impulseX, -30); // yavaş, hafifçe düşüş

  return box;
}
let boxCount = 0
const kutular = []
// Kutular belli aralıklarla yağsın
setInterval(()=>{
  if(boxCount<7) {
    boxCount++;
    kutular.push(createFallingBox())
  }
}, 3000); // 1.5 saniyede bir kutu

setInterval(self=>kutular.forEach(e=>{
  const impulseX = (Math.random() * 40) - 20; // -20 ↔ 20
  e.addImpulse(impulseX, -impulseX*20);
}),1500)



// === FOOTER ===
const footerYazi = Text("© 2025 DiYazılım — Herkes için oyun ve uygulama geliştirme framework’ü")
  .family("system-ui").size(14).foreground("#777");
footerYazi.style.whiteSpace = "normal";
footerYazi.style.wordBreak = "break-word";
footerYazi.style.textAlign = "center";

View().parent(scrollArea).child(footerYazi)
  .on("resize",(self,w,h)=>{
    self.frame(w,30).position(w/2,4500);
  });





  // === KOD ANİMASYONU SECTİON ===
const codeSection = View().parent(scrollArea)
  .on("resize",(self,w,h)=>{
    self.frame(w,70).position(w/2,680); // 1800 px altına koydum, sen ayarlayabilirsin
  });

// Kod kutusu arka planı
const codeBox = View().parent(codeSection)
  .radius(8)
  .background(Color("#1e1e1e"))
  .shadow("rgba(0,0,0,0.3)",8,0,4)
  .on("resize",(self,w,h)=>{
    self.frame(w*0.7,60).position(w/2,80);
  });

// === Typing Animation ===
const codeText = Text("").family("monospace").size(16).foreground("#dcdcdc");
codeText.style.whiteSpace = "pre"; // kod formatı bozulmasın
View().parent(codeBox).child(codeText)
  .on("resize",(self,w,h)=>{
    self.frame(w-40,h-40).position(w/2,h/2);
  });

const snippets = [
  {text: "kutu.frame(20,50)", color: "#4ec9b0"},
  {text: "kutu.frame(self.full,50)", color: "#569cd6"},
  {text: "kutu.frame(self.half,50)", color: "#c586c0"}
];

let snippetIndex = 0;
function typeSnippet() {
  const {text, color} = snippets[snippetIndex];
  let i = 0;
  codeText.foreground(color);

  const typer = setInterval(()=>{
    codeText.innerText = text.slice(0,i++);
    if (i > text.length) {
      clearInterval(typer);
      setTimeout(()=>{
        snippetIndex = (snippetIndex+1) % snippets.length;
        typeSnippet();
      },1000);
    }
  },80);
}
typeSnippet();

scrollArea.style.overflowX = 'hidden'

VanillaTilt.init(baslaText, {
    max: 25,
    speed: 400
  });





const section1 = Section("Okunabilir ve Minimalist",
  "Yapay zekanın verdiği kod çorbasını düzenlemek yerine fikrini kendin kolaylıkla hayata geçir.", 2200);

const section1a = View().parent(section1)
.background(Image('./assets/codeSection1.png').fit('contain'))
.radius(16)
.position(0,100)
.on('resize',self=>{
  self.frame(self.full,350)
})
const section1b = View().parent(section1a).components(Animation)
.background(Color('#ff6b81')).opacity(0.9)
.on('resize',self=>{
  self.position(self.center,300)
})
.ease('inout', 5, true, {loop:Infinity}, (self,p)=>{
  self.frame(p*70,70);
})

section1a.style.transformStyle = 'preserve-3d';
section1a.style.transform += 'perspective(1000px)';

section1b.style.transform += 'translateZ(20px)';

VanillaTilt.init(section1a, {
    max: 25,
    speed: 400,
    glare:                  true,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
  });




Section("Zamanın Sana Kalsın",
"Şu anda gezdiğiniz uygulamayı bu framework ile hazırladık. Geliştirme sürecini günlere indirdik.", 2850);

const sectionCoin = Section("Hafife Alma",
"Oyun ya da Uygulama. Kolayca geliştirirken modüler yapısı sayesinde dinamikliğinin gücünü hep yanına al.", 3150);
const img = Image('./assets/coin-120.gif');
function restartGif() {
  const src = img.src;
  img.src = "";
  img.src = src;
}
// örnek: her 2 saniyede bir baştan oynat
setInterval(restartGif, 1000);
const coinn = View().parent(sectionCoin)
.background(img)
.frame(100,100)
.on('resize',self=>{
  self.position(self.center,200)
})

Section("JS Basitçe Dinamik",
"Hazır şablon kullanan web sitelerin aksine tamamen dinamik ve programlanabilir. Saf JavaScript.", 3550);




const sectionGames = Section("Mini Oyunlar",
"Denemen için bir şans.", 3850);
const game = View().parent(sectionGames)
.frame(100,150)
.background(Color('#70a1ff')).radius(16)
.on('resize',self=>{
  self.position(self.leading,100).offset(20,0)
})
.child(View().frame(0,0).child(Text('    GumBird')))
const game2 = View().parent(sectionGames)
.frame(100,150)
.background(Color('#ff6b81')).radius(16)
.on('resize',self=>{
  self.position(self.leading,100).offset(140,0)
})
.child(View().frame(0,0).child(Text('    BlockPuz')))

const sectionApps = Section("Mini Uygulamalar",
"Aynı framework ile geliştirdik.", 4200);
const app = View().parent(sectionApps)
.frame(100,150)
.background(Color('#7bed9f')).radius(16)
.on('resize',self=>{
  self.position(self.leading,100).offset(20,0)
})
.child(View().frame(0,0).child(Text('      PhysiX')))

const imageBird = Image('./assets/bird.gif').fit('contain')
game.child(imageBird)
game.style.transformStyle = 'preserve-3d';
game.style.transform += 'perspective(1000px)';
VanillaTilt.init(game, {
    max: 30,
    speed: 2000,
    glare:                  true,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
  });
imageBird.style.transform += 'translateZ(20px) scale(0.8)';

const imageBlock = View() //Image('./assets/bird.gif').fit('contain')
imageBlock.style.width = '100%';
imageBlock.style.left = '50%';
imageBlock.style.top = '43%';
imageBlock.child(
  View()
    .background(Color('purple'))
    .frame(30,30).radius(9).border('white')
    .on('resize',self=>{
      self.position(self.center,self.center)
      self.offset(-30,0)
    }),
  View()
    .background(Color('purple'))
    .frame(30,30).radius(9).border('white')
    .on('resize',self=>{
      self.position(self.center,self.center)
      self.offset(0,0)
    }),
  View()
    .background(Color('purple'))
    .frame(30,30).radius(9).border('white')
    .on('resize',self=>{
      self.position(self.center,self.center)
      self.offset(30,0)
    }),
  View()
    .background(Color('purple'))
    .frame(30,30).radius(9).border('white')
    .on('resize',self=>{
      self.position(self.center,self.center)
      self.offset(0,30)
    }),
)
game2.child(imageBlock)
game2.style.transformStyle = 'preserve-3d';
game2.style.transform += 'perspective(1000px)';
VanillaTilt.init(game2, {
    max: 30,
    speed: 2000,
    glare:                  true,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
  });
imageBlock.style.transform += 'translateZ(20px) scale(0.8)';



const imageRocket = Image('./assets/rocket-1.png').fit('contain')
app.child(imageRocket)
app.style.transformStyle = 'preserve-3d';
app.style.transform += 'perspective(1000px)';
VanillaTilt.init(app, {
    max: 30,
    speed: 2000,
    glare:                  true,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
  });
imageRocket.style.transform += 'translateZ(20px) scale(0.6)';


game.components(Gesture)
.on('tap',(self,check)=>{
  if(check) location.href = './bird.html';
})
game2.components(Gesture)
.on('tap',(self,check)=>{
  if(check) location.href = './block.html';
})

app.components(Gesture)
.on('tap',(self,check)=>{
  if(check) location.href = './rocket.html';
})



// Başla Btn
ctas.child(View().components(Gesture)
.frame(120,40)//.border()
.on('resize',self=>{
  self.position(self.center,20).offset(-70,5)
})
.on('tap',(self,check)=>{
  if(check) location.href = './bird.html';
}))

// Github Btn
ctas.child(View().components(Gesture)
.frame(120,40)//.border('red')
.on('resize',self=>{
  self.position(self.center,20).offset(70,5)
})
.on('tap',(self,check)=>{
  if(check) window.location.href = 'https://github.com/harun-aksoy/lite-view';
}))
