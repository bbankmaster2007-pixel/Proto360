// Dynamic Floor Builder
function loadFloorData(floorKey) {
  const data = floorsData[floorKey];
  if (!data) {
    console.warn(`No data configured for ${floorKey}`);
    return;
  }

  const tpContainer = document.querySelector('#TP');
  const sky = document.querySelector('#sky');

  tpContainer.innerHTML = '';
  sky.setAttribute('src', data.initialSky);
  sky.setAttribute('rotation', data.initialRotation);

  const rig = document.querySelector('#rig');
  if (rig) {
    rig.removeAttribute('animation__move');
    rig.setAttribute('position', '0 1.6 0');
  }

  data.nodes.forEach(group => {
    const groupEl = document.createElement('a-entity');
    groupEl.setAttribute('id', group.groupId);
    groupEl.setAttribute('visible', group.visible);
    groupEl.setAttribute('position', group.groupPosition);

    group.arrows.forEach(arrow => {
      // Create plane element instead of circle
      const arrowEl = document.createElement('a-plane');
      arrowEl.setAttribute('id', arrow.id);
      arrowEl.setAttribute('position', arrow.position);
      arrowEl.setAttribute('rotation', arrow.rotation);
      arrowEl.setAttribute('width', arrow.width || 3);
      arrowEl.setAttribute('height', arrow.height || 3);
      
      // Connect PNG picture with transparent material
      arrowEl.setAttribute('material', `src: ${arrow.textureSrc}; transparent: true; alphaTest: 0.5`);
      arrowEl.setAttribute('class', 'clickable');

      arrowEl.setAttribute('gogo', `
        hide: ${arrow.gogo.hide};
        show: ${arrow.gogo.show};
        imageSrc: ${arrow.gogo.imageSrc};
        moveDirection: ${arrow.gogo.moveDirection};
        moveDur: ${arrow.gogo.moveDur}
      `);

      if (arrow.openUrl) {
        arrowEl.setAttribute('open-url', `url: ${arrow.openUrl}`);
      }

      groupEl.appendChild(arrowEl);
    });

    tpContainer.appendChild(groupEl);
  });
}

// Custom A-Frame Components
AFRAME.registerComponent('gogo', {
  schema: {
    imageSrc: { type: 'selector' },
    hide: { type: 'selector' },
    show: { type: 'selector' },
    locationName: { type: 'string', default: 'Unknown Location' },
    moveDirection: { type: 'string', default: '-5 1.6 0' },
    moveDur: { type: 'number', default: 600 },
    fadeDur: { type: 'number', default: 400 }
  },
  init: function () {
    const el = this.el;
    const data = this.data;
    const TP = document.querySelector('#TP');
    const sky = document.querySelector('#sky');
    const overlay = document.querySelector('#fade-overlay');

    if (overlay) {
      overlay.setAttribute('animation__fadeout', 'dur', data.moveDur);
      overlay.setAttribute('animation__fadein', 'dur', data.moveDur);
    }

    el.addEventListener('mouseenter', () => { el.setAttribute('scale', '1.15 1.15 1.15'); });
    el.addEventListener('mouseleave', () => { el.setAttribute('scale', '1 1 1'); });

    el.addEventListener('click', () => {
      TP.setAttribute('animation__move', {
        property: 'position',
        to: data.moveDirection,
        dur: data.moveDur,
        easing: 'easeInQuad'
      });
      if (overlay) overlay.emit('fade-out');

      setTimeout(() => {
        if (data.imageSrc) sky.setAttribute('src', data.imageSrc.getAttribute('src'));
        if (data.hide) data.hide.setAttribute('visible', false);
        if (data.show) data.show.setAttribute('visible', true);
        if (overlay) overlay.emit('fade-in');
      }, data.moveDur);
    });
  }
});

AFRAME.registerComponent('open-url', {
  schema: { url: { type: 'string' } },
  init: function () {
    this.el.addEventListener('click', () => {
      window.open(this.data.url, '_blank');
    });
  }
});

// UI & Menu Logic
document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.querySelector('#floor-menu');
  const menuBtn = document.querySelector('#menu-btn');
  
  let isOpen = false;
  let currentScrollY = 0;
  const totalFloors = 10;
  const boxSpacing = 0.45;
  const viewportTop = 0.8;
  const viewportBottom = -0.8;
  const fadeZone = 0.3;
  const boxes = [];

  loadFloorData('floor1');

  for (let i = 1; i <= totalFloors; i++) {
    const floorBox = document.createElement('a-box');
    const floorDataName = `floor${i}`;
    
    floorBox.setAttribute('width', '1.0');
    floorBox.setAttribute('height', '0.25');
    floorBox.setAttribute('depth', '1.0');
    floorBox.setAttribute('color', '#1a1a1a');
    floorBox.setAttribute('material', 'transparent: true; opacity: 1');
    floorBox.setAttribute('class', 'clickable');
    
    const label = document.createElement('a-text');
    label.setAttribute('value', `${i}`);
    label.setAttribute('align', 'center');
    label.setAttribute('position', '-0.7 0 0');
    label.setAttribute('scale', '1.2 1.2 1.2');
    label.setAttribute('color', '#ffffff');
    floorBox.appendChild(label);

    floorBox.addEventListener('click', (e) => {
      e.stopPropagation();
      loadFloorData(floorDataName);
      toggleMenu(false);
    });

    menuContainer.appendChild(floorBox);
    boxes.push({ element: floorBox, baseIndex: i - 1 });
  }

  const upArrow = document.createElement('a-triangle');
  upArrow.setAttribute('position', '0 1.2 0');
  upArrow.setAttribute('scale', '0.3 0.3 0.3');
  upArrow.setAttribute('color', '#00e676');
  upArrow.setAttribute('class', 'clickable');
  upArrow.setAttribute('vertex-a', '0 0.5 0');
  upArrow.setAttribute('vertex-b', '-0.5 -0.5 0');
  upArrow.setAttribute('vertex-c', '0.5 -0.5 0');
  upArrow.addEventListener('click', () => scrollStack(-boxSpacing));
  menuContainer.appendChild(upArrow);

  const downArrow = document.createElement('a-triangle');
  downArrow.setAttribute('position', '0 -1.2 0');
  downArrow.setAttribute('scale', '0.3 0.3 0.3');
  downArrow.setAttribute('rotation', '0 0 180');
  downArrow.setAttribute('color', '#00e676');
  downArrow.setAttribute('class', 'clickable');
  downArrow.setAttribute('vertex-a', '0 0.5 0');
  downArrow.setAttribute('vertex-b', '-0.5 -0.5 0');
  downArrow.setAttribute('vertex-c', '0.5 -0.5 0');
  downArrow.addEventListener('click', () => scrollStack(boxSpacing));
  menuContainer.appendChild(downArrow);

  function updateBoxes() {
    boxes.forEach(box => {
      const targetY = (box.baseIndex * boxSpacing) + currentScrollY - 0.4;
      box.element.setAttribute('position', `0 ${targetY} 0`);

      let opacity = 1;
      if (targetY > viewportTop) {
        opacity = 1 - (targetY - viewportTop) / fadeZone;
      } else if (targetY < viewportBottom) {
        opacity = 1 - (viewportBottom - targetY) / fadeZone;
      }
      opacity = Math.max(0, Math.min(1, opacity));

      box.element.setAttribute('material', `transparent: true; opacity: ${opacity}`);
      if (opacity <= 0.1) {
        box.element.classList.remove('clickable');
        box.element.setAttribute('visible', 'false');
      } else {
        box.element.classList.add('clickable');
        box.element.setAttribute('visible', 'true');
      }
    });
  }

  function scrollStack(deltaY) {
    const maxScroll = 0;
    const minScroll = -((totalFloors - 3) * boxSpacing);
    currentScrollY = Math.max(minScroll, Math.min(maxScroll, currentScrollY + deltaY));
    updateBoxes();
  }

  function toggleMenu(forceState) {
    isOpen = forceState !== undefined ? forceState : !isOpen;
    menuContainer.setAttribute('visible', isOpen);
    if (isOpen) updateBoxes();
  }

  window.addEventListener('wheel', (e) => {
    if (!isOpen) return;
    scrollStack(e.deltaY > 0 ? -0.2 : 0.2);
  });

  menuBtn.addEventListener('click', () => toggleMenu());
  window.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
      toggleMenu();
    }
  });
});