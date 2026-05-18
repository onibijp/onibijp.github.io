//----初期処理
const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext("2d");
const basewidth = 1920;
const baseheight = 1080;
canvas.style.width = `${Math.trunc(window.innerWidth * 0.5)}px`; 
canvas.style.height = `${Math.trunc(window.innerWidth * 0.5 / 16 * 9)}px`;

//----描画処理用関数配列
const animation = [];
animation[0] = infomation;
animation[1] = guide_line;
animation[2] = null;
animation[3] = null;
animation[4] = null;
animation[5] = null;
animation[6] = null;
animation[7] = null;
animation[8] = null;
animation[9] = null;
animation[10] = null;
animation[11] = title;
animation[12] = title_start_botton;
animation[13] = title_background;
animation[14] = null;
animation[15] = null;
animation[16] = null;
animation[17] = null;
animation[18] = null;
animation[19] = null;
animation[20] = select_botton_effect;
animation[21] = select_botton;
animation[22] = select;
animation[23] = select_background;


export const animation_functions_length = animation.length;//配列への代入はこれより上で！！！
//----アニメーション計算用関数群
function infomation(frame)
{
    draw_text(frame+".",10,40,"white",undefined,45);
    draw_text(frame/120,10,80,"white",undefined,45);
}

function guide_line(frame)
{
  draw_square(957,0,6,1080,"red");
  draw_square(0,537,1920,6,"red");
}

function title()
{
  draw_text("instant guns",650,300,"white",undefined,100);
}

function title_start_botton(frame)
{
  draw_square(735,700,450,200,"white");
  draw_text("START",960,825,"black",undefined,70,"center");
}

function title_background(frame)
{
  draw_square(0,0,basewidth,baseheight,`rgb(${Math.floor(frame % 255)}, ${Math.floor(frame & 5)}, 127)`); 
}

function select_botton_effect(frame)
{

}

function select_botton(frame)
{
  let width = 192;
  let height = 700;
  draw_square(width,300,2*width,height,"green");
  draw_square(4*width,300,2*width,height,"purple");
  draw_square(7*width,300,2*width,height,"black");
}

function select(frame)
{
  draw_square(725,30,490,150,"black");
  draw_text("SELECT",730,150,"white",undefined,120,"left");
}

function select_background(frame)
{
  
  draw_square(0,0,basewidth,baseheight,`rgb(${(((frame % 256) - 10) + (frame % 256))}, 50, ${(frame * frame) % 256}`);
  ctx.font = "bold "+100+"px serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.rotate((25 * Math.PI) / 180);
  
  
  for(let i = 0; i < 20; i++)
  {
    ctx.fillText("select select select select select select select select select select select select select select select select select select select select select select select select select select select select ", frame % 1920, (i * 100) - 800);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//----描画用関数群
export function clear()
{
  ctx.clearRect(0,0,basewidth,baseheight);
}

function draw_text(text,x,y,color,font,fontsize,align)//fontsizeは"整数"で指定!!!!!!
{
  ctx.font = "bold "+fontsize+"px serif";
  ctx.fillStyle = color;
  if(align != undefined)
  {
    ctx.textAlign = align;
  }
  else
  {
    ctx.textAlign = "start";
  }
  ctx.fillText(text,x,y);
}

function draw_square(x,y,width,height,color)
{
  ctx.fillStyle = color;
  ctx.fillRect(x,y,width,height);
}

//----呼び出し用関数
export function animation_request(scene,frame)
{
  if(typeof animation[scene] === 'function')
  {
    animation[scene](frame);
  }
  else
  {
    console.log("ERROR:アニメーション計算用関数未格納");
  }
}

////----描画処理----////