//Video
const video = document.querySelector('.video');
const videoBtn = document.querySelector('.video__btn i');
const sectionFirst = document.querySelector('.first');
const firstInfo = document.querySelector('.first__info');
const bar = document.querySelector('.video__bar');
const currentTime = document.querySelector('.current-time');
const fullTime = document.querySelector('.full-time');

const pausedVideo = () => {
    videoBtn.className = 'far fa-play-circle';
    sectionFirst.style.backgroundImage = "url('../images/first-bg.jpg')";
    firstInfo.style.opacity = '1';
}

const videoPlayPause = () => {
    if(video.paused) {
        setTimeout(() => {
            sectionFirst.style.backgroundImage = "none";
            video.play();
        }, 200);
        videoBtn.className = 'far fa-pause-circle';
        firstInfo.style.opacity = '0'
    } else {
        video.pause();
        pausedVideo();
    };
};

videoBtn.addEventListener('click', () => {
    videoPlayPause();
});

video.addEventListener('timeupdate', () => {
    const barWidth = video.currentTime / video.duration;
    bar.style.width = `${barWidth * 100}%`;
    fullTime.textContent = `${video.duration}`;
    currentTime.textContent = `${video.currentTime.toFixed(2)} -`;
    if (video.ended) {
        pausedVideo() 
        bar.style.width = '0px';
    };
});

//Song list

const songList = document.querySelector('.tracks__list');
songList.innerHTML = "";

const songDB = {
    songs: [
        "3LAU, Bright Lights — How You Love Me",
        "Bright Lights, Kaleena Zanders, Kandy — War For Love",
        "3LAU, Bright Lights — How You Love Me",
        "3LAU, Bright Lights — How You Love Me",
        "3LAU, Bright Lights — How You Love Me",
        "3LAU, Bright Lights — How You Love Me",
    ]
};

songDB.songs.forEach((song, i) => {
    songList.innerHTML += `
    <li class="tracks__list-item">
        <span>${getZeroes(i)}</span>
        <p class="tracks__list-name">${song}</p>
    </li>
    `;
});

function getZeroes(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

//Audio
const audioImage = document.querySelectorAll('.tracks__images-img');
const songNames = document.querySelectorAll('.tracks__list-name');
const songNamesParent = document.querySelector('.tracks__list');
const audio = document.querySelector('.audio');
const audioBtn = document.querySelector('.audio__btn i');
const animatedBG = document.querySelector('.tracks__bg');
const audioBar = document.querySelector('.audio__bar');
const audioCurrentTime = document.querySelector('.audio__current-time');
const audioFullTime = document.querySelector('.audio__full-time');

function showContent(i = 0) {
    audioImage[i].classList.add('show', 'fade');
    audioImage[i].classList.remove('hide');
    songNames[i].classList.add('active');
    audio.src = `images/songs/${i+1}.mp3`;
};

function hideContent() {
    audioImage.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    songNames.forEach(item => {
        item.classList.remove('active');
    });
};

function playAudio() {
    audio.play();
    audioBtn.className = 'fa fa-pause-circle';
    animatedBG.style.animation = "pulsate .5s infinite";
    animatedBG.classList.add('change');
};

function stopAudio() {
    audio.pause();
    audioBtn.className = 'fa fa-play-circle';
    animatedBG.style.animation = "";
    animatedBG.classList.remove('change');
    audioBar.style.width = "0";
};

hideContent();
showContent();

songNamesParent.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains('tracks__list-name')) {
        songNames.forEach((item, i) => {
            if(target == item) {
                hideContent();
                showContent(i);
                stopAudio();
            };
        });
    };
});

audioBtn.addEventListener('click', () => {
    if(audio.paused) {
        playAudio();
    } else {
        stopAudio();
    };
});

audio.addEventListener('timeupdate', () => {
    const barWidth = audio.currentTime / audio.duration;
    audioBar.style.width = `${barWidth * 100}%`;
    audioCurrentTime.textContent = `${audio.currentTime.toFixed(2)} -`;
    audioFullTime.textContent = `${audio.duration.toFixed(2)}`;
    if (audio.ended) {
        stopAudio();
    };
});

//BURGER MENU

const openBtn = document.querySelector('.burger-menu__icon');
const menu = document.querySelector('.burger-menu');
const closeBtn = document.querySelector('.burger-menu__close');
const body = document.querySelector('body');

function openMenu() {
    menu.classList.add('burger-menu--visible');
    body.classList.add('body--lock');
};

function closeMenu() {
    menu.classList.remove('burger-menu--visible');
    body.classList.remove('body--lock');
};

openBtn.addEventListener('click', () => {
    openMenu();
});

closeBtn.addEventListener('click', () => {
    closeMenu();
});

//SLIDER

$('.track__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    infinite: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        }, 
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 375,
            settings: {
                arrows: false,
                slidesToShow: 1,
                dots: true
            }
        }
    ]
});