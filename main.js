status="";
objects=[];

function setup(){
    canvas=createCanvas(456,372);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(456,372);
    video.hide();
}

function start(){
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);

    document.getElementById("status").innerHTML="Status: Detecting Objects";

    input=document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status="true";
}

function draw(){
    image(video,0,0,456,372);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i=0 ; i<objects.length ; i++){
            percent=floor(objects[i].confidence*100);
            fill("black");
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            stroke("black");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(input==objects[i].label){
                document.getElementsById("objectfound").innerHTML="Object(s) Found";
            }
            else{
                document.getElementById("objectfound").innerHTML="object(s) not found";
            }

        }
    }
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}