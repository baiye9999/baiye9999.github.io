// 成员轮播功能 - 简化版本
let membersSlides = [];
let membersIndicators = [];
let currentMembersSlideIndex = 0;

function showMembersSlide(index) {
    if (membersSlides.length === 0) return;
    
    // 隐藏所有幻灯片
    membersSlides.forEach(slide => slide.classList.remove('active'));
    membersIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 显示当前幻灯片
    if (membersSlides[index]) {
        membersSlides[index].classList.add('active');
    }
    if (membersIndicators[index]) {
        membersIndicators[index].classList.add('active');
    }
    
    currentMembersSlideIndex = index;
}

function changeMembersSlide(direction) {
    if (membersSlides.length === 0) return;
    
    let newIndex = currentMembersSlideIndex + direction;
    
    if (newIndex >= membersSlides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = membersSlides.length - 1;
    }
    
    showMembersSlide(newIndex);
}

function autoMembersSlide() {
    changeMembersSlide(1);
}

// 将函数设为全局，供HTML调用
window.changeMembersSlide = changeMembersSlide;
window.showMembersSlide = showMembersSlide;

// 确保DOM加载完成后初始化成员轮播
document.addEventListener('DOMContentLoaded', function() {
    // 获取成员轮播元素
    membersSlides = document.querySelectorAll('.members-slide');
    membersIndicators = document.querySelectorAll('.members-indicator');
    
    if (membersSlides.length > 0) {
        // 确保第一张图片显示
        showMembersSlide(0);
        
        // 启动自动轮播
        let membersSlideInterval = setInterval(autoMembersSlide, 8000);
        
        // 鼠标悬停时暂停自动轮播
        const membersCarousel = document.querySelector('.members-carousel');
        if (membersCarousel) {
            membersCarousel.addEventListener('mouseenter', () => {
                clearInterval(membersSlideInterval);
            });
            
            membersCarousel.addEventListener('mouseleave', () => {
                membersSlideInterval = setInterval(autoMembersSlide, 8000);
            });
        }
    }
});
