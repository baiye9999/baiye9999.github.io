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

// 成员数据相关变量
let membersData = [];
let currentMemberIndex = 0;

// 动态分页相关变量
let membersPerPage = 3; // 默认值，会根据屏幕宽度动态调整
let currentPage = 1;
let totalPages = 0;

// 计算每页显示的成员数量
function calculateMembersPerPage() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1200) {
        // 大屏幕：显示6个成员
        return 6;
    } else if (screenWidth >= 992) {
        // 中等屏幕：显示5个成员
        return 5;
    } else if (screenWidth >= 768) {
        // 平板：显示4个成员
        return 4;
    } else if (screenWidth >= 576) {
        // 小平板：显示3个成员
        return 3;
    } else {
        // 手机：显示2个成员
        return 2;
    }
}

// 更新分页设置
function updatePaginationSettings() {
    const newMembersPerPage = calculateMembersPerPage();
    
    if (newMembersPerPage !== membersPerPage) {
        membersPerPage = newMembersPerPage;
        totalPages = Math.ceil(membersData.length / membersPerPage);
        
        // 确保当前页不超出范围
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        
        // 重新生成分页和缩略图
        generatePagination();
        updateThumbnailsForPage();
        updatePaginationDisplay();
    }
}

// 从JSON文件加载成员数据
// 从JSON文件加载成员数据（带重试机制）
async function loadMembersData(maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`尝试第 ${attempt} 次加载成员数据...`);
            
            const response = await fetch("members.json");
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            membersData = data.members || [];
            
            // 计算初始分页设置
            membersPerPage = calculateMembersPerPage();
            totalPages = Math.ceil(membersData.length / membersPerPage);
            
            console.log(`成功加载 ${membersData.length} 个成员数据`);
            return true;
            
        } catch (error) {
            console.warn(`第 ${attempt} 次尝试失败:`, error.message);
            
            if (attempt === maxRetries) {
                console.error("所有重试失败，使用默认数据");
                // 如果加载失败，使用默认数据
                membersData = [
                    {
                        name: "松仁糖",
                        role: "社长",
                        avatar: "images/members/member-songrentang.svg",
                        tags: ["虹虹玩家", "紫色韵味", "开服玩家"],
                        description: "为人仁厚，重情重义。"
                    }
                ];
                membersPerPage = calculateMembersPerPage();
                totalPages = Math.ceil(membersData.length / membersPerPage);
                return false;
            }
            
            // 等待后重试
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
// 动态生成成员缩略图
function generateMemberThumbnails() {
    const gallery = document.getElementById('members-gallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    membersData.forEach((member, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'member-thumbnail';
        thumbnail.setAttribute('data-member', index);
        
        thumbnail.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}">
            <span class="member-name">${member.name}</span>
        `;
        
        gallery.appendChild(thumbnail);
    });
}

// 动态生成分页 - 修复版本
function generatePagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    // 如果总页数少于等于7页，直接显示所有页码
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            const pageDot = document.createElement('span');
            pageDot.className = 'page-dot';
            if (i === currentPage) pageDot.classList.add('active');
            pageDot.textContent = i;
            pageDot.onclick = () => goToPage(i);
            pagination.appendChild(pageDot);
        }
        return;
    }
    
    // 总页数大于7页的情况
    let startPage, endPage;
    
    if (currentPage <= 4) {
        // 当前页在前4页，显示1-7...最后一页
        startPage = 1;
        endPage = 7;
    } else if (currentPage >= totalPages - 3) {
        // 当前页在后4页，显示第一页...最后7页
        startPage = totalPages - 6;
        endPage = totalPages;
    } else {
        // 当前页在中间，显示第一页...当前页前后各2页...最后一页
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }
    
    // 添加第一页
    const firstPage = document.createElement('span');
    firstPage.className = 'page-dot';
    if (1 === currentPage) firstPage.classList.add('active');
    firstPage.textContent = '1';
    firstPage.onclick = () => goToPage(1);
    pagination.appendChild(firstPage);
    
    // 添加第一个省略号
    if (startPage > 2) {
        const ellipsis1 = document.createElement('span');
        ellipsis1.className = 'page-ellipsis';
        ellipsis1.textContent = '...';
        pagination.appendChild(ellipsis1);
    }
    
    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
        if (i === 1 || i === totalPages) continue; // 跳过第一页和最后一页，因为已经单独处理
        
        const pageDot = document.createElement('span');
        pageDot.className = 'page-dot';
        if (i === currentPage) pageDot.classList.add('active');
        pageDot.textContent = i;
        pageDot.onclick = () => goToPage(i);
        pagination.appendChild(pageDot);
    }
    
    // 添加第二个省略号
    if (endPage < totalPages - 1) {
        const ellipsis2 = document.createElement('span');
        ellipsis2.className = 'page-ellipsis';
        ellipsis2.textContent = '...';
        pagination.appendChild(ellipsis2);
    }
    
    // 添加最后一页
    if (totalPages > 1) {
        const lastPage = document.createElement('span');
        lastPage.className = 'page-dot';
        if (totalPages === currentPage) lastPage.classList.add('active');
        lastPage.textContent = totalPages;
        lastPage.onclick = () => goToPage(totalPages);
        pagination.appendChild(lastPage);
    }
}

// 初始化成员展示
async function initMembersDisplay() {
    await loadMembersData();
    
    // 生成缩略图和分页
    generateMemberThumbnails();
    generatePagination();
    
    // 初始化分页
    currentPage = 1;
    updatePaginationDisplay();
    updateThumbnailsForPage();
    updateMainMember(0);
    updateThumbnails();
    
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(updatePaginationSettings, 250));
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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
    updateThumbnailsForPage();
    
    // 跳转到该页的第一个成员
    const firstMemberIndex = (pageNumber - 1) * membersPerPage;
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
    // 重新生成分页以更新显示
    generatePagination();
}

function getCurrentPageMembers() {
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = Math.min(startIndex + membersPerPage, membersData.length);
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
