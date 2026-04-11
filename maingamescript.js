const FPS = 60;
const canvas = document.getElementById('gamecanvas');
const draw = canvas.getContext("2d");

//----関数内で使う変数
let draw_background_toggle = true;

//----ループ処理
function init(){
  draw_background();

  
window.requestAnimationFrame(init);
}
init();
//----以下通常の処理
function draw_background()
{
  if(draw_background_toggle == true)
  {
    draw.fillstyle = "white";
  }else if(draw_background_toggle == false)
  {
    draw.fillstyle = "black";
  }

  fillRect(0,0,1920,1080);
}
  
    

