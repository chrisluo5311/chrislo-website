import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * 为post cards添加进入动画
 * @param {HTMLElement|NodeList|Array} cards - 卡片元素或元素数组
 * @param {Object} options - 动画选项
 */
export function animatePostCards(cards, options = {}) {
  const {
    stagger = 0.1,
    duration = 0.6,
    delay = 0,
    y = 50,
    ease = 'power3.out'
  } = options;

  // 确保cards是数组
  const cardsArray = Array.isArray(cards) 
    ? cards 
    : cards instanceof NodeList 
    ? Array.from(cards)
    : [cards];

  // 设置初始状态
  gsap.set(cardsArray, {
    opacity: 0,
    y: y,
    scale: 0.95
  });

  // 创建动画时间线
  const tl = gsap.timeline({
    delay: delay,
    scrollTrigger: {
      trigger: cardsArray[0]?.parentElement || cardsArray[0],
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // 为每个卡片添加动画
  tl.to(cardsArray, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: duration,
    stagger: stagger,
    ease: ease
  });

  return tl;
}

/**
 * 为单个卡片添加hover动画
 * @param {HTMLElement} card - 卡片元素
 */
export function setupCardHover(card) {
  if (!card) return;

  const cardImage = card.querySelector('.card-img-top');
  const cardButton = card.querySelector('.btn-read-more');
  
  // 确保卡片有overflow hidden以便图片缩放
  if (cardImage && !card.style.overflow) {
    const computedStyle = window.getComputedStyle(card);
    if (computedStyle.overflow === 'visible') {
      card.style.overflow = 'hidden';
    }
  }

  // 鼠标进入动画
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: function() {
        // 使用CSS变量或直接设置box-shadow
        card.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
      }
    });

    // 立即设置box-shadow
    card.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';

    if (cardImage) {
      gsap.to(cardImage, {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    if (cardButton) {
      gsap.to(cardButton, {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });

  // 鼠标离开动画
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: function() {
        card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
      }
    });

    if (cardImage) {
      gsap.to(cardImage, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    if (cardButton) {
      gsap.to(cardButton, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
}

/**
 * 为所有post cards设置hover效果
 * @param {string} selector - 卡片选择器，默认为 '.card'
 */
export function setupAllCardHovers(selector = '.card') {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => setupCardHover(card));
}

/**
 * 创建卡片点击动画
 * @param {HTMLElement} card - 卡片元素
 */
export function animateCardClick(card) {
  if (!card) return;

  gsap.to(card, {
    scale: 0.98,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
}

/**
 * 清理所有ScrollTrigger实例
 */
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

/**
 * Hero Section 动画 - 头像、标题、社交图标、按钮依次出现
 * @param {HTMLElement} heroSection - Hero section容器
 * @param {boolean} shouldAnimate - 是否应该运行动画（默认true）
 */
export function animateHeroSection(heroSection, shouldAnimate = true) {
  if (!heroSection) return;

  const avatar = heroSection.querySelector('.hero-avatar');
  const title = heroSection.querySelector('.hero-title');
  const subtitle = heroSection.querySelector('.hero-subtitle');
  const socialIcons = heroSection.querySelectorAll('.social-icons a');
  const button = heroSection.querySelector('.btn-book-meeting');

  // 如果不应该动画，直接显示所有元素
  if (!shouldAnimate) {
    gsap.set([avatar, title, subtitle, socialIcons, button], {
      opacity: 1,
      y: 0,
      scale: 1
    });
    return null;
  }

  // 设置初始状态
  gsap.set([avatar, title, subtitle, socialIcons, button], {
    opacity: 0,
    y: 30
  });

  // 创建时间线
  const tl = gsap.timeline({ delay: 0.3 });

  // 依次动画
  tl.to(avatar, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  })
  .to(title, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
  .to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3')
  .to(socialIcons, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.2)'
  }, '-=0.2')
  .to(button, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3');

  return tl;
}

/**
 * Section标题动画
 * @param {HTMLElement|NodeList} titles - Section标题元素
 */
export function animateSectionTitles(titles) {
  const titlesArray = Array.isArray(titles) 
    ? titles 
    : titles instanceof NodeList 
    ? Array.from(titles)
    : [titles];

  titlesArray.forEach(title => {
    if (!title) return;
    
    gsap.fromTo(title, 
      {
        opacity: 0,
        y: -20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Timeline项目动画（Education/Experience）
 * @param {HTMLElement|NodeList} items - Timeline项目元素
 */
export function animateTimelineItems(items) {
  const itemsArray = Array.isArray(items) 
    ? items 
    : items instanceof NodeList 
    ? Array.from(items)
    : [items];

  itemsArray.forEach((item, index) => {
    if (!item) return;

    gsap.fromTo(item,
      {
        opacity: 0,
        x: -50,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Skills badges动画
 * @param {HTMLElement|NodeList} badges - Skill badge元素
 */
export function animateSkillBadges(badges) {
  const badgesArray = Array.isArray(badges) 
    ? badges 
    : badges instanceof NodeList 
    ? Array.from(badges)
    : [badges];

  if (badgesArray.length === 0) return;

  // 找到共同的容器（skills section）
  const container = badgesArray[0].closest('.section') || badgesArray[0].closest('.skills-container-gsap')?.parentElement;
  if (!container) return;

  // 预先设置初始状态，避免闪烁
  gsap.set(badgesArray, {
    opacity: 0,
    scale: 0.8,
    y: 20,
    rotation: 0, // 移除旋转，使用更流畅的动画
    force3D: false // 禁用 force3D，避免文字模糊
  });

  // 使用单个 ScrollTrigger 和 timeline，性能更好
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true // 只播放一次，提升性能
    }
  });

  // 使用 stagger 创建流畅的连续动画
  tl.to(badgesArray, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.5,
    stagger: {
      amount: 0.6, // 总 stagger 时间
      from: 'start' // 从第一个开始
    },
    ease: 'power2.out', // 更流畅的缓动函数
    force3D: false, // 禁用 force3D，避免文字模糊
    onComplete: () => {
      // 动画完成后，清除所有 transform 相关的内联样式
      // 让 CSS hover 的 transform 可以正常工作
      badgesArray.forEach(badge => {
        if (badge) {
          // 清除所有 transform 相关的内联样式，避免与 CSS hover 冲突
          gsap.set(badge, { 
            clearProps: 'y,opacity,scale,transform'
          });
        }
      });
    }
  });

  return tl;
}

/**
 * Project cards动画（与post cards类似但针对project cards）
 * @param {HTMLElement|NodeList|Array} cards - Project卡片元素
 * @param {Object} options - 动画选项
 */
export function animateProjectCards(cards, options = {}) {
  const {
    stagger = 0.12,
    duration = 0.7,
    y = 60,
    ease = 'power3.out'
  } = options;

  const cardsArray = Array.isArray(cards) 
    ? cards 
    : cards instanceof NodeList 
    ? Array.from(cards)
    : [cards];

  gsap.set(cardsArray, {
    opacity: 0,
    y: y,
    scale: 0.95
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardsArray[0]?.parentElement || cardsArray[0],
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  tl.to(cardsArray, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: duration,
    stagger: stagger,
    ease: ease,
    force3D: true, // 启用硬件加速
    onComplete: () => {
      // 动画完成后，清除 y 和 opacity 的内联样式，保留 scale
      // 这样 hover 动画可以正常工作
      cardsArray.forEach(card => {
        if (card) {
          gsap.set(card, { 
            clearProps: 'y,opacity',
            transform: 'scale(1) translateZ(0)' // 确保最终状态正确
          });
        }
      });
    }
  });

  return tl;
}

/**
 * Project cards 展开动画（不使用ScrollTrigger，用于collapse展开）
 * @param {HTMLElement|NodeList|Array} cards - Project卡片元素
 * @param {Object} options - 动画选项
 */
export function animateProjectCardsExpand(cards, options = {}) {
  const {
    stagger = 0.12,
    duration = 0.7,
    y = 60,
    ease = 'power3.out',
    delay = 0
  } = options;

  const cardsArray = Array.isArray(cards) 
    ? cards 
    : cards instanceof NodeList 
    ? Array.from(cards)
    : [cards];

  // 设置初始状态
  gsap.set(cardsArray, {
    opacity: 0,
    y: y,
    scale: 0.95
  });

  // 创建时间线（不使用ScrollTrigger）
  const tl = gsap.timeline({ delay: delay });

  tl.to(cardsArray, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: duration,
    stagger: stagger,
    ease: ease
  });

  return tl;
}

/**
 * Project card hover动画
 * @param {HTMLElement} card - Project卡片元素
 */
export function setupProjectCardHover(card) {
  if (!card) return;

  const cardIcon = card.querySelector('.project-lang-icon');
  const cardBadges = card.querySelectorAll('.badge.bg-info.text-dark');

  // 使用 timeline 确保所有动画同步
  let hoverTimeline = null;

  card.addEventListener('mouseenter', () => {
    // 如果之前的动画还在运行，先杀死它
    if (hoverTimeline) {
      hoverTimeline.kill();
    }

    // 创建新的 timeline 确保所有动画同步
    hoverTimeline = gsap.timeline();

    // 主卡片动画：使用统一的 duration 和 ease
    // 设置 transform-origin 为底部中心，避免文字向上移位
    gsap.set(card, { transformOrigin: 'center bottom' });
    hoverTimeline.to(card, {
      y: -10,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true, // 启用硬件加速
      immediateRender: false
    }, 0);

    // 使用 CSS transition 来动画 box-shadow（通过添加类或直接设置）
    // 设置 box-shadow，CSS transition 会自动处理动画
    card.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';

    // Icon 动画：与卡片同步
    if (cardIcon) {
      hoverTimeline.to(cardIcon, {
        scale: 1.2,
        rotation: 5,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true
      }, 0);
    }

    // Badges 动画：使用 CSS transition 处理，避免 GSAP transform 导致文字模糊
    // CSS 会通过 :hover 状态自动处理 transform，这里不需要 GSAP 动画
    // 如果需要 stagger 效果，可以通过 CSS 的 transition-delay 实现
    if (cardBadges.length > 0) {
      // 为每个 badge 设置不同的 transition-delay，创建 stagger 效果
      cardBadges.forEach((badge, index) => {
        if (badge) {
          badge.style.transitionDelay = `${0.05 + index * 0.03}s`;
        }
      });
    }
  });

  card.addEventListener('mouseleave', () => {
    // 如果之前的动画还在运行，先杀死它
    if (hoverTimeline) {
      hoverTimeline.kill();
    }

    // 创建新的 timeline 确保所有动画同步
    hoverTimeline = gsap.timeline();

    // 主卡片动画：恢复初始状态
    // 确保 transform-origin 保持为底部中心
    gsap.set(card, { transformOrigin: 'center bottom' });
    hoverTimeline.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true,
      immediateRender: false
    }, 0);

    // 恢复 box-shadow，CSS transition 会自动处理动画
    card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';

    // Icon 动画：与卡片同步恢复
    if (cardIcon) {
      hoverTimeline.to(cardIcon, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true
      }, 0);
    }

    // Badges 动画：恢复 transition-delay，让 CSS transition 处理恢复动画
    if (cardBadges.length > 0) {
      cardBadges.forEach((badge, index) => {
        if (badge) {
          badge.style.transitionDelay = `${index * 0.02}s`;
        }
      });
    }
  });
}

/**
 * 为所有project cards设置hover效果
 * @param {string} selector - 卡片选择器
 */
export function setupAllProjectCardHovers(selector = '.card-link-override') {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => setupProjectCardHover(card));
}

/**
 * Modal打开/关闭动画
 * @param {HTMLElement} modal - Modal元素
 * @param {boolean} isOpening - 是否正在打开
 */
export function animateModal(modal, isOpening) {
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content');
  if (!modalContent) return;

  if (isOpening) {
    gsap.fromTo(modalContent,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.2)'
      }
    );
  } else {
    gsap.to(modalContent, {
      opacity: 0,
      scale: 0.8,
      y: -30,
      duration: 0.3,
      ease: 'power2.in'
    });
  }
}

/**
 * Navbar滚动显示/隐藏动画
 * @param {HTMLElement} navbar - Navbar元素
 */
export function setupNavbarScrollAnimation(navbar) {
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 100) {
          if (currentScroll > lastScroll && currentScroll > 200) {
            // 向下滚动 - 隐藏navbar
            gsap.to(navbar, {
              y: -100,
              duration: 0.3,
              ease: 'power2.inOut'
            });
          } else {
            // 向上滚动 - 显示navbar
            gsap.to(navbar, {
              y: 0,
              duration: 0.3,
              ease: 'power2.inOut'
            });
          }
        } else {
          gsap.to(navbar, {
            y: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          });
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * 平滑滚动到指定section
 * @param {string|HTMLElement} target - 目标元素或ID
 * @param {Object} options - 滚动选项
 */
export function smoothScrollTo(target, options = {}) {
  const {
    offset = 0,
    duration = 1,
    ease = 'power2.inOut'
  } = options;

  const element = typeof target === 'string' 
    ? document.getElementById(target) 
    : target;

  if (!element) return;

  const navbarHeight = document.getElementById('navbar-main')?.offsetHeight || 0;
  const targetPosition = element.offsetTop - navbarHeight - offset;

  gsap.to(window, {
    scrollTo: {
      y: targetPosition,
      autoKill: false
    },
    duration: duration,
    ease: ease
  });
}

/**
 * 按钮hover动画增强
 * @param {HTMLElement|NodeList} buttons - 按钮元素
 */
export function setupButtonHover(buttons) {
  const buttonsArray = Array.isArray(buttons) 
    ? buttons 
    : buttons instanceof NodeList 
    ? Array.from(buttons)
    : [buttons];

  buttonsArray.forEach(button => {
    if (!button) return;

    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
}

