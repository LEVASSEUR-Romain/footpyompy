const VariableGlobal = {
  player: {
    RAYONPLAYER: 20,
    masse: 1,
    maxSpeed: 3,
    maxPxAvancement: 8,
    NonCollisionFrame: 0,
    rayonPlayerDessinerFaux: 0,
  },
  terrain: {
    width: 800,
    height: 600,
    border: 50,
    POURCENTAGEGLOBALGOAL: 20,
  },
  ballon: {
    RAYONBALLON: 20,
  },
  positionStart: {
    // espace de 4 joueur entre les joueurs
    ecartEntrejoueur: 4,
  },
  mouvement: {
    // Alert bug
    distanceMinimum: 31,
    nombreAnimationJouer: 1000,
    // 17 optimisé
    delaiAnimation: 17,
    // stop la speed de la balle
    velociteMin: 0.1,
    // ecart pour collision centrale
    ecartX: 5,
    ecartY: 5,
    // ecart angle accepter pour collision frontale
    accepteAngleColinaire: 2,
    // angle choc frontale coliaire
    angleColinaire: Math.PI / 4,
  },
};

export default VariableGlobal;
