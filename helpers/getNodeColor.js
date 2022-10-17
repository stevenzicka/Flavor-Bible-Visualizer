export default function getNodeColor(node, neighbors) {
    if (neighbors.indexOf(node.id)) {
      switch(node.group) {
        case 0:
          return 'rgb(0, 0, 0)';
        case 1:
          return 'rgb(245, 255, 108)';
        case 2:
          return 'rgb(252, 81, 81)';
        case 3:
          return 'rgb(112, 54, 0)';
        case 4:
          return 'rgb(255, 149, 130)';
        case 5:
          return 'rgb(180, 37, 12)';
        case 6:
          return 'rgb(255, 247, 177)';
        case 7:
          return'rgb(218, 178, 70)';
        case 8:
          return 'rgb(248, 227, 135)';
        case 9:
          return 'rgb(46, 187, 27)';
        case 10:
          return 'rgb(140, 233, 127)';
        case 11:
          return 'rgb(255, 193, 229)';
        case 12:
          return 'rgb(190, 163, 39)';
        case 13:
          return 'rgb(105, 87, 6)';
        case 14:
          return 'rgb(105, 98, 67)';
        case 15:
          return 'rgb(194, 178, 109)';
        case 16:
          return 'rgb(248, 248, 248)';
        case 17:
          return 'rgb(255, 182, 47)';
        case 18:
          return 'rgb(240, 240, 240)';
        case 19:
          return 'rgb(240, 240, 240)';
        case 20:
          return 'rgb(241, 144, 99)';
        default:
          return 'gray';
      }
    }
  }