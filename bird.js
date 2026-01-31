import {View,Image,Color,Physic,Gesture} from "mukk";


// 🎨 Görseller
let birdGif = './assets/bird.gif'
let pipeBottomPng = './assets/pipe-bottom.png'
let pipeTopPng = './assets/pipe-top.png'

let gumbirdLogo = './assets/gumbird-logo.png'
let skyBlue = './assets/sky-blue.png'
let groundPng = './grass/Path v2.png' 
let buttonPng = './btns/btn-play.png'

let sesPop = './sounds/up-ui.wav'
let sesPoint = './sounds/point2.ogg'
let sesSwosh = './sounds/swo2.ogg'


const audio = new Audio(sesPop);
audio.preload = 'auto';

let gameStart = false;

const gumbird = View()
    .background(Image(gumbirdLogo).fit('contain'))////.border()
    .frame(500,window.innerHeight/3)
    .position(window.innerWidth/2,window.innerHeight/3-50)
    .on('update',(self,dt)=>{
        self.offset(0,Math.sin(Date.now()/500))
    })
    
gumbird.style.zIndex = '3'


const bird = View().components(Physic,Gesture)
    .background(Image(birdGif))//.border()
    .position(window.innerWidth/2,window.innerHeight/2)
    .on('resize',self=>{
        self.position(self.center,self.center)
        self.frame(70,56)
        self.collider('box', { width: self.frame()[0], height: self.frame()[1] })
    })
    .mass(0)
    .on('hit',(self,other)=>{
        gameStart = false;
        btnn.off('tap')
        btnn.destroy()
        audio.src = './sounds/die1.ogg'
        audio.currentTime = 0;
        audio.play()
        bird.destroy()
        point.position(undefined,window.innerHeight/2)
        gumbird.position(window.innerWidth/2,window.innerHeight/3-50)
        View()
            .frame(window.innerWidth,window.innerHeight)
            .position(window.innerWidth/2,window.innerHeight/2)
            .background(Color("linear-gradient(to bottom, deepskyblue, hotpink)"))
        View().components(Gesture)
            .frame(150,100)
            .position(window.innerWidth/2,window.innerHeight/2+100)
            .background(Image(buttonPng).fit('contain'))//.border()
            .on('tap',(self,check)=>{
                if(!check) {
                    audio.src = './sounds/up-ui.wav'
                    audio.currentTime = 0;
                    audio.play()
                    self.offset(0,10)
                }
                if(check) {
                    audio.src = './sounds/pop-ui.wav'
                    audio.currentTime = 0;
                    audio.play()
                    self.offset(0,-10);
                    //window.location.reload();
                    //location.href = location.href;
                    history.go(0)
                }
            })
    })



const btnn = View().components(Gesture)//.border('red',3)
    .on('resize',self=>{
        self.frame(self.full,self.full).padding(0,40)
        self.position(self.center,self.bottom)
    })
    //.background(Image(skyBlue))
    .on('tap',(self,check)=>{
        if(!check) {
            if(!gameStart) {gameStart = true; gumbird.position(-300,-300)}
            if(gameStart) {
                bird.mass(1)
                bird.velocity(0,-4.4)
                audio.src = './sounds/swo2.ogg'
                audio.currentTime = 0;
                audio.play()
            } 
            
        }
    })
    btnn.style.zIndex = '12'



const ground = View().components(Physic)
    .background(Image(groundPng).fit('cover'))//.border()
    .on('resize',self=>{
        self.frame(self.full,70)
        self.position(self.center,self.bottom)
        self.collider('box', { width: self.frame()[0], height: self.frame()[1] })
    })
    .mass(0)
    .style.zIndex = '2'


const background = View()
    .background(Image(skyBlue))
    .on('resize',self=>{
        self.position(self.center,self.center)
        self.frame(self.full,self.full)
    })
    .style.zIndex = '-5'


// const pipeBottom = View().components(Physic)
//     .background(Image(pipeBottomPng))//.border()
//     .on('resize',self=>{
//         self.frame(70,320)
//         self.position(self.center,self.bottom)
//         self.offset(0,80)
//         self.collider('box', { width: self.frame()[0], height: self.frame()[1] })
//     })
//     .mass(0)
//     .on('update',(self,dt)=>{
//         
//     })
// 
// 
// const pipeTop = View().components(Physic)
//     .background(Image(pipeTopPng))//.border()
//     .on('resize',self=>{
//         self.frame(70,320)
//         self.position(self.center,self.top)
//         self.offset(0,-80)
//         self.collider('box', { width: self.frame()[0], height: self.frame()[1] })
//     })
//     .mass(0)


let score = 0;
const pointAudio = new Audio('./sounds/point2.ogg');
pointAudio.preload = 'auto';

const point = View()
    .position(window.innerWidth/2, window.innerHeight/8)
    .frame(120, 60)

//point.innerText = score.toString();
point.style.color = 'white';
point.style.fontFamily = 'system-ui'
point.style.fontSize = '42px';
point.style.fontWeight = '600';
point.style.textAlign = 'center';
point.style.lineHeight = '60px'; // dikey ortalama için
point.style.zIndex = '10'

const pipeSpeed = -3
const pipeGap = 520

const pipeBottom = View().components(Physic)
    .background(Image(pipeBottomPng))//.border()
    .on('resize',self=>{
        self.frame(70,360)
        self.position(window.innerWidth + 200, window.innerHeight/2 + pipeGap/2)
        self.collider('box', { width: self.frame()[0], height: self.frame()[1] })
    })
    .mass(0)
    .on('update',(self,dt)=>{
        if (!gameStart) return;
        
        let [x,y] = self.position();
        self.position(x + pipeSpeed, y);
        self.collider('box', { width: self.frame()[0], height: self.frame()[1] });

        // Bird borunun ortasından geçtiyse puan ekle
        if (x + self.frame()[0]/2 < bird.position()[0] && !self.passed) {
            score++;
            self.passed = true; // aynı borudan birden fazla puan almasın
            point.innerText = score.toString();

            pointAudio.currentTime = 0;
            pointAudio.play();
        }

        // ekran dışına çıktıysa resetle
        if (x < -50) {
            let randomY = Math.random() * 200 - 100;
            pipeBottom.position(window.innerWidth + 70, window.innerHeight/2 + pipeGap/2 + randomY);
            pipeTop.position(window.innerWidth + 70, window.innerHeight/2 - pipeGap/2 + randomY);

            // collider sync
            pipeBottom.collider('box', { width: pipeBottom.frame()[0], height: pipeBottom.frame()[1] });
            pipeTop.collider('box', { width: pipeTop.frame()[0], height: pipeTop.frame()[1] });

            self.passed = false; // yeni boru için tekrar puan alabilsin
        }
    });




const pipeTop = View().components(Physic)
    .background(Image(pipeTopPng))//.border()
    .on('resize',self=>{
        self.frame(70,360)
        self.position(window.innerWidth + 200, window.innerHeight/2 - pipeGap/2)
        self.collider('box', { width: self.frame()[0], height: self.frame()[1] })
    })
    .mass(0)
    .on('update',(self,dt)=>{   
        if(gameStart) {
            let [x,y] = self.position()
            self.position(x + pipeSpeed, y)
            self.collider('box', { 
                width: self.frame()[0], 
                height: self.frame()[1] 
            }) // konum değiştikçe collider'i sync et
        }
    })



pipeTop.style.zIndex = '1'
pipeBottom.style.zIndex = '1'
ground.style.zIndex = '2'
bird.style.zIndex = '3'
