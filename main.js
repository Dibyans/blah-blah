song1 = "";
song2 = "";
scoreleftwrist = 0;
song1status = "";

leftWristX = 0;
leftWristY = 0;

function preload(){
    song1 = loadSound("Minions.mp3");
    song2 = loadSound("picachu.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = "+scoreleftwrist);
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);
    }
}

function modelLoaded(){
    console.log("posenet is Initialized got it?");
}

function draw(){
    image(video,0,0,600,500);
    song1status = song1.isPlaying();
    fill("#fc3003");
    stroke("#fc3003");

    if(scoreleftwrist > 0.2){
        innumberleftwristY = Number(leftWristY);
        remove_decimal = floor(innumberleftwristY);
        circle(leftWristX,leftWristY,20);
        song2.stop();
        
        if(song1status == false){
            song1.play();
            song1.setVolume(1);
            song1.rate(1);
            document.getElementById("songname").innerHTML = "songname = Minions";
        }
    } 
}

function play(){
    song2.play()
    song2.setVolume(1);
    song2.rate(1);
    document.getElementById("songname").innerHTML = "songname = picachu";
}