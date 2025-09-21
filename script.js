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
document.addEventListener('DOMContentLoaded', function() {
    initMembersDisplay();
    
    // 为所有缩略图添加点击事件
    document.addEventListener('click', function(e) {
        if (e.target.closest('.member-thumbnail')) {
            const thumbnail = e.target.closest('.member-thumbnail');
            const memberIndex = parseInt(thumbnail.getAttribute('data-member'));
            if (!isNaN(memberIndex)) {
                selectMember(memberIndex);
            }
        }
    });
});

// 更新成员数据 - 参考风华无缺网站
const membersData = [
    {
        name: "松仁糖",
        role: "社长",
        avatar: "images/members/member-songrentang.svg",
        tags: ["虹虹玩家", "紫色韵味", "开服玩家"],
        description: "为人仁厚，重情重义。"
    },
    {
        name: "成员2",
        role: "副社长",
        avatar: "images/members/member-2.svg",
        tags: ["技术专家", "团队核心"],
        description: "技术精湛，乐于助人。"
    },
    {
        name: "成员3",
        role: "活动策划",
        avatar: "images/members/member-3.svg",
        tags: ["创意无限", "组织能力强"],
        description: "富有创意，善于组织活动。"
    },
    {
        name: "成员4",
        role: "技术总监",
        avatar: "images/members/member-4.svg",
        tags: ["编程高手", "系统架构"],
        description: "技术全面，架构能力强。"
    },
    {
        name: "成员5",
        role: "运营专员",
        avatar: "images/members/member-5.svg",
        tags: ["用户运营", "数据分析"],
        description: "擅长用户运营和数据分析。"
    },
    {
        name: "成员6",
        role: "设计师",
        avatar: "images/members/member-6.svg",
        tags: ["UI设计", "视觉创意"],
        description: "设计感强，创意无限。"
    },
    {
        name: "成员7",
        role: "测试工程师",
        avatar: "images/members/member-7.svg",
        tags: ["质量保证", "自动化测试"],
        description: "注重质量，测试经验丰富。"
    },
    {
        name: "成员8",
        role: "产品经理",
        avatar: "images/members/member-8.svg",
        tags: ["产品规划", "需求分析"],
        description: "产品思维强，善于分析需求。"
    },
    {
        name: "成员9",
        role: "市场专员",
        avatar: "images/members/member-9.svg",
        tags: ["市场推广", "品牌建设"],
        description: "市场敏感度高，推广能力强。"
    },
    {
        name: "成员10",
        role: "客服主管",
        avatar: "images/members/member-10.svg",
        tags: ["客户服务", "沟通协调"],
        description: "服务意识强，沟通能力佳。"
    },
    {
        name: "成员11",
        role: "财务专员",
        avatar: "images/members/member-11.svg",
        tags: ["财务管理", "成本控制"],
        description: "财务专业，成本意识强。"
    },
    {
        name: "成员1",
        role: "人事专员",
        avatar: "images/members/member-1.svg",
        tags: ["人力资源", "团队建设"],
        description: "人事管理经验丰富，团队建设能力强。"
    }
];

let currentMemberIndex = 0;

// 分页相关变量
const MEMBERS_PER_PAGE = 3; // 每页显示3个成员
let currentPage = 1;
let totalPages = Math.ceil(membersData.length / MEMBERS_PER_PAGE);

// 初始化成员展示
function initMembersDisplay() {
    // 初始化分页
    currentPage = 1;
    totalPages = Math.ceil(membersData.length / MEMBERS_PER_PAGE);
    updatePaginationDisplay();
    updateThumbnailsForPage();
    updateThumbnailsForPage();    updateMainMember(0);
    updateThumbnails();
}

// 更新主展示区域
function updateMainMember(index) {
    const member = membersData[index];
    if (!member) return;
    
    document.getElementById('main-member-avatar').src = member.avatar;
    document.getElementById('main-member-avatar').alt = member.name;
    document.getElementById('main-member-name').textContent = member.name;
    document.getElementById('main-member-role').textContent = member.role;
    
    // 更新标签
    const tagsContainer = document.getElementById('main-member-tags');
    tagsContainer.innerHTML = '';
    member.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    document.getElementById('main-member-description').textContent = member.description;
}

// 更新缩略图
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.member-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.remove('active');
        if (index === currentMemberIndex) {
            thumb.classList.add('active');
        }
    });
}

// 切换成员
function changeMember(direction) {
    currentMemberIndex += direction;
    
    if (currentMemberIndex >= membersData.length) {
        currentMemberIndex = 0;
    } else if (currentMemberIndex < 0) {
        currentMemberIndex = membersData.length - 1;
    }
    
    updateMainMember(currentMemberIndex);
    updateThumbnails();
}

// 选择成员
function selectMember(index) {
    currentMemberIndex = index;
    updateMainMember(index);
    updateThumbnails();
}

// 将函数设为全局，供HTML调用
window.changeMember = changeMember;
window.selectMember = selectMember;

// 为缩略图添加点击事件
document.addEventListener('DOMContentLoaded', function() {
    initMembersDisplay();
    
    // 为所有缩略图添加点击事件
    document.addEventListener('click', function(e) {
        if (e.target.closest('.member-thumbnail')) {
            const thumbnail = e.target.closest('.member-thumbnail');
            const memberIndex = parseInt(thumbnail.getAttribute('data-member'));
            if (!isNaN(memberIndex)) {
                selectMember(memberIndex);
            }
        }
    });
});

// 分页相关函数
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    currentPage = pageNumber;
    updatePaginationDisplay();
    // updateThumbnailsForPage();
    updateThumbnailsForPage();
    
    // 跳转到该页的第一个成员
    const firstMemberIndex = (pageNumber - 1) * MEMBERS_PER_PAGE;
    selectMember(firstMemberIndex);
}

function updateThumbnailsForPage() {
    const thumbnails = document.querySelectorAll(".member-thumbnail");
    const { startIndex, endIndex } = getCurrentPageMembers();
    
    thumbnails.forEach((thumb, index) => {
        if (index >= startIndex && index < endIndex) {
            thumb.style.display = "block";
        } else {
            thumb.style.display = "none";
        }
    });
}
function changeMemberPage(direction) {
    let newPage = currentPage + direction;

    // 实现循环功能
    if (newPage > totalPages) {
        newPage = 1; // 超过最后一页时回到第一页
    } else if (newPage < 1) {
        newPage = totalPages; // 小于第一页时跳转到最后一页
    }

        goToPage(newPage);
}

function updatePaginationDisplay() {
    // 更新分页数字的显示状态
    const pageDots = document.querySelectorAll('.page-dot');
    pageDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index + 1 === currentPage) {
            dot.classList.add('active');
        }
    });
}

function getCurrentPageMembers() {
    const startIndex = (currentPage - 1) * MEMBERS_PER_PAGE;
    const endIndex = Math.min(startIndex + MEMBERS_PER_PAGE, membersData.length);
    return { startIndex, endIndex };
}

// 修改原有的changeMember函数以支持分页
function changeMemberWithinPage(direction) {
    const { startIndex, endIndex } = getCurrentPageMembers();
    
    let newIndex = currentMemberIndex + direction;
    
    // 如果超出当前页范围，则切换页面
    if (newIndex >= endIndex) {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        } else {
            // 如果是最后一页，回到第一页
            goToPage(1);
        }
    } else if (newIndex < startIndex) {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
            // 跳转到上一页的最后一个成员
            const { startIndex: prevStartIndex, endIndex: prevEndIndex } = getCurrentPageMembers();
            selectMember(prevEndIndex - 1);
        } else {
            // 如果是第一页，跳转到最后一页的最后一个成员
            goToPage(totalPages);
            const { startIndex: lastStartIndex, endIndex: lastEndIndex } = getCurrentPageMembers();
            selectMember(lastEndIndex - 1);
        }
    } else {
        selectMember(newIndex);
    }
}

// 全局函数，供HTML调用
window.goToPage = goToPage;
window.changeMemberPage = changeMemberPage;

// 修改原有的changeMember函数
window.changeMember = changeMemberWithinPage;


// 视频轮播控制
let currentVideoIndex = 0;
const videoSources = [
    'videos/main-video.mp4',
    'videos/video-2.mp4',
    'videos/video-3.mp4'
];

function changeVideo(direction) {
    const videoElement = document.querySelector('.video-container video source');
    const video = document.querySelector('.video-container video');
    
    if (!videoElement || !video) return;
    
    currentVideoIndex += direction;
    
    if (currentVideoIndex >= videoSources.length) {
        currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
        currentVideoIndex = videoSources.length - 1;
    }
    
    // 更新视频源
    videoElement.src = videoSources[currentVideoIndex];
    video.load(); // 重新加载视频
}

// 全局函数，供HTML调用
window.changeVideo = changeVideo;

// 按钮导航功能
function navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 全局函数，供HTML调用
window.navigateToSection = navigateToSection;
