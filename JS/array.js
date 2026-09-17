const floorsData = {
  floor1: {
    initialSky: '#locRA1',
    initialRotation: '0 90 0',
    nodes: [
      {
        groupId: 'RA1',
        visible: true,
        groupPosition: '0 0 0',
        arrows: [
          {
            id: 'to_RA2',
            position: '4 0 0',
            rotation: '-90 -90 0',
            textureSrc: '#arrow', // Path to your PNG image
            gogo: { hide: '#RA1', show: '#RA2', imageSrc: '#locRA2', moveDirection: '-15 0 0', moveDur: 500 }
          },
          {
            id: 'to_RA-1',
            position: '-4 0 0',
            rotation: '-90 90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#RA1', show: '#RA-1', imageSrc: '#locRA-1', moveDirection: '15 0 0', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'RA2',
        visible: true,
        groupPosition: '15 0 0',
        arrows: [
          {
            id: 'to_R1A2',
            position: '0 0 -4',
            rotation: '-90 0 0',
            textureSrc: '#arrow',
            gogo: { hide: '#RA2', show: '#R1A2', imageSrc: '#locR1A2', moveDirection: '-15 0 15', moveDur: 500 }
          },
          {
            id: 'to_RA1',
            position: '-4 0 0',
            rotation: '-90 90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#RA2', show: '#RA1', imageSrc: '#locRA1', moveDirection: '0 0 0', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'RA-1',
        visible: true,
        groupPosition: '-15 0 0',
        arrows: [
          {
            id: 'to_RA1',
            position: '4 0 0',
            rotation: '-90 -90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#RA-1', show: '#RA1', imageSrc: '#locRA1', moveDirection: '0 0 0', moveDur: 500 }
          },
          {
            id: 'to_R1A-1',
            position: '0 0 -4',
            rotation: '-90 0 0',
            textureSrc: '#arrow',
            gogo: { hide: '#RA-1', show: '#R1A-1', imageSrc: '#locR1A-1', moveDirection: '15 0 15', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'R1A-1',
        visible: true,
        groupPosition: '-15 0 -15',
        arrows: [
          {
            id: 'to_RA-1',
            position: '0 0 4',
            rotation: '-90 180 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R1A-1', show: '#RA-1', imageSrc: '#locRA-1', moveDirection: '15 0 0', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'R1A2',
        visible: true,
        groupPosition: '15 0 -15',
        arrows: [
          {
            id: 'to_RA2',
            position: '0 0 4',
            rotation: '-90 180 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R1A2', show: '#RA2', imageSrc: '#locRA2', moveDirection: '-15 0 0', moveDur: 500 }
          },
          {
            id: 'to_R2A2',
            position: '0 0 -4',
            rotation: '-90 0 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R1A2', show: '#R2A2', imageSrc: '#locR2A2', moveDirection: '-15 0 30', moveDur: 500 }
          },
          {
            id: 'to_R4A2',
            position: '-4 0 0',
            rotation: '-90 90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R1A2', show: '#R4A2', imageSrc: '#locR4A2', moveDirection: '0 0 15', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'R2A2',
        visible: true,
        groupPosition: '15 0 -30',
        arrows: [
          {
            id: 'to_R1A2',
            position: '0 0 4',
            rotation: '-90 180 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R2A2', show: '#R1A2', imageSrc: '#locR1A2', moveDirection: '-15 0 15', moveDur: 500 }
          },
          {
            id: 'to_R3A2',
            position: '-4 0 0',
            rotation: '-90 90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R2A2', show: '#R3A2', imageSrc: '#locR3A2', moveDirection: '0 0 30', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'R3A2',
        visible: true,
        groupPosition: '0 0 -30',
        arrows: [
          {
            id: 'to_R2A2',
            position: '4 0 0',
            rotation: '-90 -90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R3A2', show: '#R2A2', imageSrc: '#locR2A2', moveDirection: '-15 0 30', moveDur: 500 }
          },
          {
            id: 'to_R4A2',
            position: '0 0 4',
            rotation: '-90 180 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R3A2', show: '#R4A2', imageSrc: '#locR4A2', moveDirection: '0 0 15', moveDur: 500 }
          }
        ]
      },
      {
        groupId: 'R4A2',
        visible: true,
        groupPosition: '0 0 -15',
        arrows: [
          {
            id: 'to_R3A2',
            position: '0 0 -4',
            rotation: '-90 0 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R4A2', show: '#R3A2', imageSrc: '#locR3A2', moveDirection: '0 0 30', moveDur: 500 }
          },
          {
            id: 'to_R1A2',
            position: '4 0 0',
            rotation: '-90 -90 0',
            textureSrc: '#arrow',
            gogo: { hide: '#R4A2', show: '#R1A2', imageSrc: '#locR1A2', moveDirection: '-15 0 15', moveDur: 500 }
          }
        ]
      }
    ]
  }
};