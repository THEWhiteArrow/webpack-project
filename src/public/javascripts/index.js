// <!-- <link rel="stylesheet" href="./public/stylesheets/bootstrap.min.css">
// <link rel="stylesheet" href="./public/stylesheets/scrollbar.css">
// <link rel="stylesheet" href="./public/stylesheets/colorPallete.css">
// <link rel="stylesheet" href="./public/stylesheets/app.css">
// <link rel="stylesheet" href="./public/stylesheets/quaries.css"> -->

// <!-- <script src="./public/javascripts/popper.min.js"></script>
// <script src="./public/javascripts/bootstrap.min.js"></script>
// <script src="./public/javascripts/smooth-scrollbar.min.js"></script>
// <script src="./public/javascripts/overscroll.min.js"></script>
// <script src="./public/javascripts/membersData.js"></script>
// <script src="./public/javascripts/validateForms.js"></script>
// <script src="./public/javascripts/app.js"></script> -->

// STYLESHEETS
import '../stylesheets/bootstrap.min.css';
import '../stylesheets/colorPallete.css';
import '../stylesheets/app.css';
import '../stylesheets/quaries.css';

// JAVASCRIPTS
import '../javascripts/popper.min';
import '../javascripts/bootstrap.min';
import Scrollbar from '../javascripts/smooth-scrollbar.min';
import OverscrollPlugin from '../javascripts/overscroll.min';
import data from '../javascripts/membersData';
import '../javascripts/validateForms';
// import '../javascripts/app.js';

import member1 from '../assets/team/1-min.jpg'
import member2 from '../assets/team/2-min.jpg'
import member3 from '../assets/team/3-min.jpg'
import member4 from '../assets/team/4-min.jpg'
import member5 from '../assets/team/5-min.jpg'
import member6 from '../assets/team/6-min.jpg'
import member7 from '../assets/team/7-min.jpg'
import member8 from '../assets/team/8-min.jpg'
import member9 from '../assets/team/9-min.jpg'
import member10 from '../assets/team/10-min.jpg'
import member11 from '../assets/team/11-min.jpg'
import member12 from '../assets/team/12-min.jpg'
import member13 from '../assets/team/13-min.jpg'
const assets = [member1, member2, member3, member4, member5, member6, member7, member8, member9, member10, member11, member12, member13];

const navbar = document.querySelector('#navbar');
const cursor = document.querySelector('#cursor');
const members = document.querySelectorAll('.member');
const shownMember = {
   name: document.querySelector('#shownMemberName'),
   info: document.querySelector('#shownMemberInfo'),
   pic: document.querySelector('#shownMemberPic'),
}


let scroll = 0;
cursor.y = 0;
let e;




const init = () => {
   restoreScroll();
   setUpMembersTiles();
   setUpShownMember();
   setUpSmoothScrollbars();
   setUpCursor();
}

const setUpShownMember = () => {
   // shownMember.pic.style.backgroundImage = members[8].style.backgroundImage;
   shownMember.pic.style.backgroundImage = `url("${member9}")`;
   shownMember.name.innerText = data[`member${9}`].name;
   shownMember.info.innerText = data[`member${9}`].info;
}

const setUpMembersTiles = () => {
   members.forEach((member, i) => {

      // member.style.backgroundImage = `url("./public/assets/team/${i + 1}-min.jpg")`;
      member.style.backgroundImage = `url("${assets[i]}")`;
      member.addEventListener('click', () => {

         shownMember.pic.style.backgroundImage = member.style.backgroundImage;
         shownMember.pic.style.backgroundPositionX = getComputedStyle(member).backgroundPositionX;
         shownMember.pic.style.backgroundPositionY = getComputedStyle(member).backgroundPositionY;

         shownMember.name.innerText = data[`member${i + 1}`].name;
         shownMember.info.innerText = data[`member${i + 1}`].info;

      })
   })
}

const setUpSmoothScrollbars = () => {
   const mainElem = document.getElementById("scroll-container");
   const membersContainer = document.getElementById("members");

   const options = {
      damping: 0.11,
      // renderByPixels: !('ontouchstart' in document),
      renderByPixels: true,
      syncCallbacks: true,
      alwaysShowTracks: true
   };

   Scrollbar.use(OverscrollPlugin);
   const overscrollOptions = {
      enable: true,
      effect: navigator.userAgent.match(/Android/) ? 'glow' : 'bounce',
      damping: 0,
      maxOverscroll: navigator.userAgent.match(/Android/) ? 150 : 100,
      glowColor: mainElem.dataset.glowColor,
   };



   const bodyScrollbar = Scrollbar.init(mainElem, {
      ...options,
      delegateTo: document,
      plugins: {
         overscroll: { ...overscrollOptions },
      },
   })

   overscrollOptions.damping = 0.11;
   const membersScrollbar = Scrollbar.init(membersContainer, {
      ...options,
      delegateTo: membersContainer
   })

   setUpScrollListener(bodyScrollbar);
   setUpLinks(bodyScrollbar);
}

const setUpLinks = (scrollbar) => {
   const links = document.querySelectorAll('a');
   for (let link of links) {
      if (!link.classList.contains('not-scroll')) {
         link.addEventListener('click', (e) => {
            e.preventDefault();
            let offsetTop = 0;
            link.getAttribute('href') === '#gabinet' ? offsetTop = 100 : null;
            scrollbar.scrollIntoView(document.querySelector(link.getAttribute('href')), {
               // offsetLeft: 34,
               offsetTop: offsetTop || 0,
               alignToTop: true,
               // onlyScrollIfNeeded: true,
            });
         })
      }
   }
}

const restoreScroll = () => {
   // This prevents the page from scrolling down to where it was previously.
   if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
   }
   // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
   window.scrollTo(0, 0);
}

const setUpScrollListener = (scrollbar) => {
   scrollbar.addListener(() => {
      scroll = scrollbar.offset.y;
      if (!cursor.removed) {
         cursor.y = scroll;
         cursor.style.setProperty('--mtop', e.clientY + cursor.y - 22.5 + 'px');
      }
      navbar.style.top = scroll + 'px';

      if ((scroll >= 700) && !navbar.classList.contains('solid-nav')) {
         navbar.classList.add('solid-nav');
         console.log('added solid-nav')
      } else if ((scroll < 700) && navbar.classList.contains('solid-nav')) {
         navbar.classList.remove('solid-nav');
         console.log('removed solid-nav')
      }
   });
}

const setUpCursor = () => {
   if (!isMobile()) {
      document.addEventListener('mousemove', () => {
         e = window.event;
         cursor.style.setProperty('--mtop', e.clientY + cursor.y - 22.5 + 'px');
         cursor.style.setProperty('--mleft', e.clientX - 22.5 + 'px');

      });

      document.addEventListener('mousedown', () => {
         cursor.classList.add('mouse-down');
      });

      document.addEventListener('mouseup', () => {
         cursor.classList.remove('mouse-down');
      });
   } else {
      cursor.removed = true;
      cursor.remove();
   }
}

const isMobile = () => {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}



init();
