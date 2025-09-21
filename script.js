// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击菜单项时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 返回顶部按钮
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #FF69B4;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 182, 193, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#FFB6C1';
        navbar.style.backdropFilter = 'none';
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 视频播放控制
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
});

// 音频播放控制
document.addEventListener('DOMContentLoaded', () => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.addEventListener('play', () => {
            // 暂停其他音频
            audios.forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
        });
    });
});

// 点击波纹效果
document.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    e.target.style.position = 'relative';
    e.target.style.overflow = 'hidden';
    e.target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // 关闭移动端菜单
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// 图片懒加载
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

// 触摸滑动支持
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // 向左滑动
                if (typeof changeSlide === 'function') {
                    changeSlide(1);
                }
            } else {
                // 向右滑动
                if (typeof changeSlide === 'function') {
                    changeSlide(-1);
                }
            }
        }
    }
    
    startX = 0;
    startY = 0;
});

// 轮播功能
let currentSlideIndex = 0;
let slides = [];
let indicators = [];

function showSlide(index) {
    if (slides.length === 0) return;
    
    // 隐藏所有幻灯片
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 显示当前幻灯片
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    if (slides.length === 0) return;
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    if (slides.length === 0) return;
    
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

function autoSlide() {
    changeSlide(1);
}

// 将函数设为全局，供HTML调用
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;

// 确保DOM加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播元素
    slides = document.querySelectorAll('.hero-slide');
    indicators = document.querySelectorAll('.indicator');
    
    if (slides.length > 0) {
        // 确保第一张图片显示
        showSlide(0);
        
        // 启动自动轮播
        let slideInterval = setInterval(autoSlide, 5000);
        
        // 鼠标悬停时暂停自动轮播
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroCarousel.addEventListener('mouseleave', () => {
                slideInterval = setInterval(autoSlide, 5000);
            });
        }
        
        // 观察需要动画的元素
        const animatedElements = document.querySelectorAll('.content-block, .activity-card, .member-card, .video-container, .music-player');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // 懒加载图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// 成员轮播功能
let currentMembersSlideIndex = 0;
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
