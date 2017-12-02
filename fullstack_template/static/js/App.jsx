import React from "react";
import Form from "./Form";


class App extends React.Component {
  render () {
    return (
    <div>
        <h1>wheather wow</h1>
        <Form />
    </div>
    );
    }
}


export default App;

// Create the attack button listener
document.getElementById("attack").addEventListener("click", attackEffectA);

// We store potion on this end.
var potion;

// Load the monstet and player info, and determine
// which image to show
document.addEventListener('DOMContentLoaded', function(){
  console.log('fightingggg');
  $.getJSON($SCRIPT_ROOT + '/_getHp', {
      }, function(data) {
        $('#name').text(data.name);
        $('#playerHealth').text(data.playerHealth);
        $('#monsterName').text(data.monsterName);
        $('#monsterHealth').text(data.monsterHealth);
        $('#potions').text(data.potion);
        console.log(data.monsterName);
        if (data.monsterName === 'Wondering Child')
        {
          var img = document.getElementById('wonderingBoy');
          img.style.display = 'block';
          img.hidden = false;
        }
        else if (data.monsterName === 'Demon')
        {
          var img = document.getElementById('demon');
          img.style.display = 'block';
          img.hidden = false;
        }
        else if (data.monsterName === 'Shopkeeper')
        {
          var img = document.getElementById('shopkeeper');
          img.style.display = 'block';
          img.hidden = false;
        }
        else if (data.monsterName === 'Bandit')
        {
          var img = document.getElementById('bandit');
          img.style.display = 'block';
          img.hidden = false;
        }
        potion = data.potion
        var content = document.getElementById('fightingContent');
        content.style.display = 'block';
        var load = document.getElementById('loading');
        load.hidden = 'true';
        load.style.display = 'none';
      })
  }, false);

// Since we want this to be asynchronous,
// We use set Time Out to achieve this
function attackEffectA(e){
  // Turn the volume down and play the sound FX
  var bgMusic = document.getElementById("audio");
  bgMusic.volume = 0.5;
  var menu = document.getElementById('menu');
  menu.style.display = 'none';
  window.setTimeout(attackEffectB, 1200);
}

// Playing attacking audio once
function attackEffectB(e){
  var audio = document.getElementById('attackFX');
  audio.play();
  window.setTimeout(attackEffectC, 1200);
}

// Playing damaged audio once
function attackEffectC(e){
  var audio = document.getElementById('damageFX');
  audio.play();
  var bgMusic = document.getElementById("audio");
  bgMusic.volume = 1;
  window.setTimeout(attackEffectD, 1200);

}

// Attack and update strings
function attackEffectD(e){
  $.ajax({
    url: $SCRIPT_ROOT+'/_attack',
    type: 'GET',
  });
  $.getJSON($SCRIPT_ROOT + '/_getHp', {
      }, function(data) {
        $('#name').text(data.name);
        $('#playerHealth').text(data.playerHealth);
        $('#monsterName').text(data.monsterName);
        $('#monsterHealth').text(data.monsterHealth);
        $('#potions').text(data.potion);
      });
      window.setTimeout(endGame(e), 2000);
      menu.style.display = 'block';
}

document.getElementById("potion").addEventListener("click", potionEffect);
// Healing effect
function potionEffect(e){
  var menu = document.getElementById('menu');
  console.log('potion')
  if(potion > 0)
  {
    menu.style.display = 'none';
    $.ajax({
      url: $SCRIPT_ROOT+'/_potion',
      type: 'GET',
    });
    $.getJSON($SCRIPT_ROOT + '/_getHp', {
        }, function(data) {
          $('#name').text(data.name);
          $('#playerHealth').text(data.playerHealth);
          $('#monsterName').text(data.monsterName);
          $('#monsterHealth').text(data.monsterHealth);
          $('#potions').text(data.potion);
        });
    potion = potion - 1;
    window.setTimeout(endGame(e), 1000);
  }
  else {
    alert('You have no more potions!');
  }
}

// Called whenever damages are dealt to check if
// either party has died
function endGame(e){
  $.getJSON($SCRIPT_ROOT + '/_status', {
      }, function(data) {
        console.log('checking alive or dead?');
        var menu = document.getElementById('menu');

          menu.style.display = 'block';
        if(data.status === 'Win')
        {
          // Determine what loot
          var menu = document.getElementById('menu');
          menu.style.display = 'none';
          var bgMusic = document.getElementById("audio");
          bgMusic.volume = 0.1;
          var audio = document.getElementById('CheerFX');
          audio.play();
          var item = '';
          if (data.item === '' )
          {
            item = 'Nothing';
          }
          else {
            item = data.item;
          }
          var winstr1 = 'You won! \n You got '+ data.gold +' gold!\n';
          var winstr2 = 'You got '+ data.potion +' potions!\n';
          var winstr3 = 'You got '+ item +' !';
          window.setTimeout(donothing(winstr1+winstr2+winstr3), 4000);
        }
        else if(data.status === 'Lost')
        {
          var menu = document.getElementById('menu');
          menu.style.display = 'none';
          var bgMusic = document.getElementById("audio");
          bgMusic.volume = 0.1;
          var audio = document.getElementById('LostFX');
          audio.play();
          var msg = 'You blacked out!';
          window.setTimeout(donothing(msg), 2000);
        }
  });
}

// Redirect to index screen
function end()
{
    window.location = 'index.html';

}

function donothing(msg)
{
  alert(msg);
  window.setTimeout(end(), 5000);

}
