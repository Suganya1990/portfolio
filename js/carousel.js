const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton  = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);


const slideWidth  = slides[0].getBoundingClientRect().width;


//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);


//function to move slide

const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';

    //removes 'current-slide' 
    currentSlide.classList.remove('current-slide')
    //add 'current-slide'
    targetSlide.classList.add('current-slide');
}


//function to update dots
const updateDots = (currentDot, targetDot) =>{
    currentDot.classList.remove('current-slide');
    //change css property background opacity from 0.3 to 0.75 on target Slide
    targetDot.classList.add('current-slide');
}


const hideShowArrows = (slides, prevButton, nextButton, targetIndex )=>{

    if(targetIndex===0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if (targetIndex === slides.length-1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//click left -> move slides to the left
prevButton.addEventListener('click', e=>{
    const currentSlide  = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide ===prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex );

   
});



//click right -> move slides to the right
nextButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide  = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide ===nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot)
    hideShowArrows(slides, prevButton, nextButton, nextIndex );
   
})


//nav indicators move to that slide


dotsNav.addEventListener('click', e =>{
    const targetDot = e.target.closest('button'); 
    if(!targetDot) return; 
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex =  dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex );

})


