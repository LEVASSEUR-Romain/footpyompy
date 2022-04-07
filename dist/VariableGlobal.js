const VariableGlobal = {
    player: {
        RAYONPLAYER: 15,
        masse: 1,
        maxSpeed: 15 * 3,
    },
    terrain: {
        width: 800,
        height: 600,
        border: 50,
        POURCENTAGEGLOBALGOAL: 20,
    },
    ballon: {
        RAYONBALLON: 15,
    },
    positionStart: {
        // espace de 4 joueur entre les joueurs
        ecartEntrejoueur: 4,
    },
    mouvement: {
        frottement: 0.9,
        ecartX: 3,
        ecartY: 3,
    },
};
export default VariableGlobal;
