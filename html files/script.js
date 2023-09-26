console.log('hi')
let audioElement = new Audio('../templates/krishna.mp3');
let masterPlay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let songitems=Array.from(document.getElementsByClassName('song-item'));
let play=Array.from(document.getElementsByClassName('song-play'));
let next=document.getElementById('next');
let back=document.getElementById('back');
let songIndex=0;
let time

// console.log(parseInt((audioElement.currentTime/audioElement.duration)*100));

let songs=[
    {songName:"Shri Krishna Govind Hare Murari",filePath:'../templates/krishna.mp3',coverPath:"../templates/krishna.jpg" ,time:'2:34'},
    {songName:"Ekadantay ..",filePath:'../templates/Ekadantaya_Vakratundaya_Gauri_Tanaya_Dhimi___Full_Song_with_Lyrics___Shankar_Mahadevan(256k).mp3',coverPath:"../templates/ganpati.jpg",time:'7:02'},
    {songName:"o meri maa",filePath:'../templates/maa.m4a',coverPath:"../templates/maa.jpg" ,time:'4:03'},
    {songName:"khari Biscuit",filePath:'../templates/Khari__Khari_Biscuit__Vedashree_Khadilkar_&_Adarsh_Kadam__Kunal_Ganjawala(128k).m4a',coverPath:"../templates/khari.jpg",time:'3:23'},
    {songName:"Jo Tum Na Ho",filePath:'../templates/jo_tum_na_ho.m4a',coverPath:"../templates/jo_tum.jpg",time:'4:15'},
    
];

const get_pause = ()=>{
    e=document.getElementById(songIndex);
    makeAllPlace();
    e.classList.remove('fa-play-circle');
    e.classList.add('fa-pause-circle');

};


const time_set =()=>{
    Array.from(document.getElementsByClassName("time")).forEach((element,i)=>{
        element.innerText=songs[i].time;
})
}
time_set()
// console.log(songs.length)
songitems.forEach((element,i)=>{
    // console.log(element,i);
    // songIndex=i;
    
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
    
})

// handle play pause click 
masterPlay.addEventListener('click',()=>{
    // console.log("click");
    
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        get_pause();
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add("fa-play-circle");
        makeAllPlace();
        gif.style.opacity=0;
    }
});


//listen to events
audioElement.addEventListener('timeupdate' ,()=>{
    // console.log("timeupdate"); 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    time=document.getElementById('t'+songIndex);
    time_set();
    let m=parseInt(audioElement.currentTime/60);
    console.log(m);
    let s=parseInt(audioElement.currentTime%60);
    console.log(s);
    time.innerText=m+':'+s;
    console.log(time);
    // console.log(progress);
    // console.log(audioElement.duration)
    myprogressbar.value=progress;
});

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=(myprogressbar.value*audioElement.duration)/100;
    // getElementsByClassName('time').innerText=audioElement.currentTime;

});

const makeAllPlace= ()=>{
    
    Array.from(document.getElementsByClassName('song-play')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });

}

Array.from(document.getElementsByClassName('song-play')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
            console.log(e);
            makeAllPlace();
            index=parseInt(e.target.id);
            // songIndex=index;
            if (index==songIndex && (!(audioElement.paused || audioElement.currentTime<=0))) {
                
                    e.target.classList.remove('fa-pause-circle');
                    e.target.classList.add('fa-play-circle');
                    masterPlay.classList.remove('fa-pause-circle');
                    masterPlay.classList.add('fa-play-circle');
                    gif.style.opacity=0;
                    audioElement.pause();
                    
            }
            else{
                    songIndex=index;
                    e.target.classList.remove('fa-play-circle');
                    e.target.classList.add('fa-pause-circle');
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                    gif.style.opacity=1;
                    // console.log(index);
                    audioElement.src=songs[index].filePath;
                    audioElement.currentTime=0;
                    masterSongName=document.getElementById('master-song-name');
                    masterSongName.innerText=songs[songIndex].songName;
                    audioElement.play();
            }
            
    });

});
console.log("kunal")

next.addEventListener('click',()=>{
    
    if (songIndex>=(songs.length-1)) {
        songIndex=0;
    }
    else{
        songIndex=songIndex+1;
    }
    console.log(songs[songIndex].songName);
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    masterSongName=document.getElementById('master-song-name');
    masterSongName.innerText=songs[songIndex].songName;
    get_pause();
    audioElement.play();

})

back.addEventListener('click',()=>{
    if (songIndex<=0) {
        songIndex=songs.length-1;
    }
    else{
        songIndex=songIndex-1;
    }
    console.log(songs[songIndex].songName);
    
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    masterSongName=document.getElementById('master-song-name');
    masterSongName.innerText=songs[songIndex].songName;
    get_pause();
    audioElement.play();

})



console.log(songs[songIndex].songName);


