var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits= ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange',
'peach', 'watermelon', 'pineapple'];

$(function(){
    $("#startreset").click(function(){
        if(playing == true){
            
            location.reload();

        }else{
            playing = true; //game initiated

            score = 0; //set score into 0
            $("#scorevalue").html(score);

            $("#trialsleft").show();
            trialsleft = 3;

            addHearts();

            //hide gameover box
            $("#gameover").hide();

            //change button text to reset game
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
           
        }
    });

$("#fruit1").mouseover(function(){
    score ++;
    $("#scorevalue").html(score);

   // document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play sound

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit

    //send new fruit
    setTimeout(startAction, 500);
});

function addHearts(){
    $("#trialsleft").empty();
    for(i = 0; i < trialsleft; i++){
        $("#trialsleft").append(' <img src= "images/heart.png" class= "life"> ');
    }
}

function startAction(){

    //generate a fruit
    $("#fruit1").show();
    choosefruit();
    //random position
    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top': -50});

    //generate a random step
    step = 1 + Math.round(5*Math.random()); //change step

    //move fruit down by one step in every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step); //move fruit by one step

        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitscontainer").height()){

            //if we have trialsleft
            if(trialsleft > 1){

                $("#fruit1").show();
                choosefruit();
                $("#fruit1").css({'left':Math.round(550*Math.random()), 'top': -50}); 
                
                step = 1 + Math.round(5*Math.random());

                //reduce trails by one
                trialsleft --;

                //populate trialsleft box
                addHearts();

            }else{
                //gameover
                playing = false;  //we are not playing anymore

                $("#startreset").html("Start Game");

                $("#gameover").show();
                $("#gameover").html('<p>Game Over! </p><p> Your Score is ' + score + '.</p>');

                $("#trialsleft").hide();
                stopAction();
            }
        }
    }, 20);
}

function choosefruit(){
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())]+ '.png');
}

//stop droping fruits
function stopAction(){
    clearInterval (action);
    $("#fruit1").hide();
}

});