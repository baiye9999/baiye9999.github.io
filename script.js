// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 关闭移动端菜单当点击链接
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

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
    if (video) {
        video.src = videos[currentVideo].src;
        video.poster = videos[currentVideo].poster;
    }
}

// 音乐播放器控制
const audio = document.querySelector('audio');
const playerInfo = document.querySelector('.player-info p');

const musicList = [
    {
        title: '深夜陪伴音乐',
        src: '#'
    },
    {
        title: '温暖夜曲',
        src: '#'
    },
    {
        title: '宁静时光',
        src: '#'
    }
];

let currentMusic = 0;

function changeMusic(direction) {
    currentMusic += direction;
    if (currentMusic >= musicList.length) currentMusic = 0;
    if (currentMusic < 0) currentMusic = musicList.length - 1;
    
    if (audio && playerInfo) {
        audio.src = musicList[currentMusic].src;
        playerInfo.textContent = `正在播放：${musicList[currentMusic].title}`;
    }
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#2c3e50';
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

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.content-block, .activity-card, .member-card, .video-container, .music-player');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 图片懒加载
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// 按钮点击效果
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // 创建波纹效果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
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

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 预加载关键图片
    const criticalImages = document.querySelectorAll('.hero-banner img, .welcome-image img');
    criticalImages.forEach(img => {
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

// 创建返回顶部按钮
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.className = 'back-to-top';
backToTop.onclick = scrollToTop;
document.body.appendChild(backToTop);

// 返回顶部按钮样式
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: #2980b9;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
    }
`;
document.head.appendChild(backToTopStyle);

// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// 自动轮播
setInterval(() => {
    changeVideo(1);
}, 8000);

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeVideo(-1);
    } else if (e.key === 'ArrowRight') {
        changeVideo(1);
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
                changeVideo(1);
            } else {
                // 向右滑动，显示上一个
                changeVideo(-1);
            }
        }
    }
    
    startX = 0;
    startY = 0;
});
