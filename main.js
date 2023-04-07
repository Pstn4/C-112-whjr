//https://teachablemachine.withgoogle.com/models/BKWUgKQtz/
prediction="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function takeSnap() 
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='C_img' src='"+data_uri+"'/>";
    }); 
}
console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BKWUgKQtz/model.json",modelloaded);

function modelloaded()
{
    console.log("Model Loaded!");
}

function speak()
{
var synth=window.speechSynthesis;
var Utterthis=new SpeechSynthesisUtterance(toSpeak);
synth.speak(Utterthis);
}
function check()
{
    img=document.getElementById(C_img);
    classifier.classify(C_img,Gotresult);
}
function Gotresult(error,result)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        prediction=result[0].label;
        document.getElementById("Result_name1").innerHTML=prediction;
        toSpeak="";
        if (prediction == "Amazing")
        {
            toSpeak="This is looking amazing!";
            document.getElementById("Result_emoji1").innerHTML="&#128076;";
        }
        if (prediction == "Best")
        {
            toSpeak="All the best!";
            document.getElementById("Result_emoji1").innerHTML="&#128077;";
        }
        if (prediction == "Victory")
        {
            toSpeak="That was a marvelous victory!";
            document.getElementById("Result_emoji1").innerHTML="&#9996;";
        }
        speak();
    }
}