// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 关闭移动端菜单当点击链接
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// 视频轮播
let currentVideo = 0;
const videos = [
    {
        src: '#',
        poster: 'https://via.placeholder.com/800x450/1a1a2e/ffffff?text=视频1'
    },
    {
        src: '#',
        poster: 'https://via.placeholder.com/800x450/2c3e50/ffffff?text=视频2'
    },
    {
        src: '#',
        poster: 'https://via.placeholder.com/800x450/27ae60/ffffff?text=视频3'
    }
];

function changeVideo(direction) {
    currentVideo += direction;
    if (currentVideo >= videos.length) currentVideo = 0;
    if (currentVideo < 0) currentVideo = videos.length - 1;
    
    const video = document.querySelector('video');
    video.src = videos[currentVideo].src;
    video.poster = videos[currentVideo].poster;
}

// 活动轮播
let currentActivity = 0;
const activities = document.querySelectorAll('.activity-card');
const totalActivities = activities.length;

function changeActivity(direction) {
    currentActivity += direction;
    if (currentActivity >= totalActivities) currentActivity = 0;
    if (currentActivity < 0) currentActivity = totalActivities - 1;
    
    const carousel = document.querySelector('.activities-carousel');
    const cardWidth = activities[0].offsetWidth + 30; // 包括gap
    carousel.scrollTo({
        left: currentActivity * cardWidth,
        behavior: 'smooth'
    });
}

// 成员轮播
let currentMember = 0;
const members = document.querySelectorAll('.member-card');
const totalMembers = members.length;

function changeMember(direction) {
    currentMember += direction;
    if (currentMember >= totalMembers) currentMember = 0;
    if (currentMember < 0) currentMember = totalMembers - 1;
    
    const carousel = document.querySelector('.members-carousel');
    const cardWidth = members[0].offsetWidth + 30; // 包括gap
    carousel.scrollTo({
        left: currentMember * cardWidth,
        behavior: 'smooth'
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .activity-card, .member-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 自动轮播
setInterval(() => {
    if (totalActivities > 0) {
        changeActivity(1);
    }
}, 5000);

setInterval(() => {
    if (totalMembers > 0) {
        changeMember(1);
    }
}, 6000);

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeActivity(-1);
        changeMember(-1);
    } else if (e.key === 'ArrowRight') {
        changeActivity(1);
        changeMember(1);
    }
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
    
    // 确保是水平滑动
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) { // 最小滑动距离
            if (diffX > 0) {
                // 向左滑动，显示下一个
                changeActivity(1);
                changeMember(1);
            } else {
                // 向右滑动，显示上一个
                changeActivity(-1);
                changeMember(-1);
            }
        }
    }
    
    startX = 0;
    startY = 0;
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 预加载图片
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src) {
            const newImg = new Image();
            newImg.src = img.src;
        }
    });
});

// 返回顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// 页面加载完成后隐藏加载动画
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// 添加点击波纹效果
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 为所有按钮添加波纹效果
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn, .carousel-btn, .back-to-top');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// 添加波纹效果样式
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
