//----初期処理
import { clear } from './drawing.js';
import { animation_request } from './drawing.js';
import { animation_functions_length } from './drawing.js';

const calculation_worker = new Worker("calculation.js");//calculation.jsだけ並列処理で常時待機させる

const basewidth = 1920;
const baseheight = 1080;

const mouse =
{
  clicking: undefined,
  x: undefined,
  y: undefined,
  movementX: undefined,
  movementY: undefined
};
const canvas = document.getElementById('gamecanvas');
const rect = canvas.getBoundingClientRect();
canvas.addEventListener("mouseup",() => mouse.clicking = false);
canvas.addEventListener("mousedown", () => mouse.clicking =  true);
canvas.addEventListener("mousemove", (event) =>
{
  mouse.x = (((canvas.width)/(rect.width)) * (event.clientX - rect.x));
  mouse.y = (((canvas.height)/(rect.height)) * (event.clientY - rect.y));
})
document.addEventListener("mousemove", (event) => {
  mouse.movementX = event.movementX;
  mouse.movementY = event.movementY;
})

class Animation_hinagata{
  constructor(scene,frame){
    this.scene = scene;
    this.frame = frame;
    this.toggle = false;
    this.toggle_onebeforeframe = false;
  }
  
  switch_on()
  {
    this.toggle = true;
  }

  switch_off()
  {
    this.toggle = false;
  }
}
const animation = new Array();
function animation_setup()
{
  let i;

  for(i = 0; i < 256; i++)
  {
    animation[i] = new Animation_hinagata(i,0);
  }
}

let playdate = {
  mode: 0,
  scene: 0
};

////----メイン処理----////
function init(){
  clear();

  switch(playdate.mode)
  {
    case 0://タイトル画面
    {
      animation[0].switch_on();
      animation[1].switch_on();
      animation[11].switch_on();
      animation[12].switch_on();
      animation[13].switch_on();

      if(mouse.clicking === true)
      {
        if(((mouse.x >= 735) && (mouse.x <= 1185)) && ((mouse.y >=700) && (mouse.y <= 900)))
        {
          playdate.mode = 1;
        }
      }
    }
    
    case 1:
    {
      animation[0].switch_on();
      animation[1].switch_on();
      animation[20].switch_on();
      animation[21].switch_on();
      animation[22].switch_on();
      animation[23].switch_on();
    }
    default:
    {
    }
  }
  console.log(mouse);
  animation_draw();
  requestAnimationFrame(init);
}
animation_setup();
init();

//----主要な関数
function animation_draw()
{
  let i;

  for(i = animation_functions_length;i >= 0; i--)
  {
    if(animation[i].toggle === true)
    {
      if(animation[i].toggle_onebeforeframe === true)
      {
        animation[i].frame = animation[i].frame + 1;
      }else if(animation[i].toggle_onebeforeframe === false)
      {
        animation[i].frame = 0;
      }

      animation_request(i,animation[i].frame);
    }

    animation[i].toggle_onebeforeframe = animation[i].toggle;
    animation[i].switch_off();
  }
}