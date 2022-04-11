const collisionPyompy = (Player1, Player2) => {
    if (Player1.Position.x === Player2.Position.x &&
        Player1.Position.y === Player2.Position.y) {
        Player1.Position.x += 0.1;
    }
    const dist_x = Player2.Position.x - Player1.Position.x;
    const dist_y = Player2.Position.y - Player1.Position.y;
    const dist_sq = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
    const dist_trigger = Player2.rayon + Player1.rayon;
    const dist_trigger_sq = Math.pow(dist_trigger, 2);
    if (dist_sq < dist_trigger_sq) {
        const dist = Math.pow(dist_sq, 0.5);
        //const angle = Math.atan2(dist_y, dist_x)
        // normal
        const c = dist_x / dist;
        const s = dist_y / dist;
        const spread = dist_trigger - dist;
        const ax = spread * c;
        const ay = spread * s;
        // reposition of circles
        Player1.Position.x -= ax;
        Player1.Position.y -= ay;
        const velo_x_tt = Player2.getVectorSpeed().x - Player1.getVectorSpeed().x;
        const velo_y_tt = Player2.getVectorSpeed().y - Player1.getVectorSpeed().y;
        const velo_tt_l = Math.pow((Math.pow(velo_x_tt, 2) + Math.pow(velo_y_tt, 2)), 0.5);
        if (velo_tt_l === 0)
            return;
        // angle difference between velo_tt and dist
        // let angle_to = Math.acos(velo_x_tt / velo_tt_l * c + velo_y_tt / velo_tt_l * s)
        // handle all cadran
        // if (angle_to > PI05) angle_to = -angle_to + PI
        // else if (angle_to < -PI05) angle_to = +angle_to - PI
        // const ratio = Math.abs( Math.cos(angle_to))// / PI
        const ratio = Math.abs((velo_x_tt / velo_tt_l) * c + (velo_y_tt / velo_tt_l) * s);
        const c1_strenght = ratio * velo_tt_l;
        const c2_strenght = ratio * velo_tt_l;
        const P1VeloX = c1_strenght * c - Player1.getVectorSpeed().x;
        const P1VeloY = c1_strenght * s - Player1.getVectorSpeed().y;
        Player1.setVectorSpeed({ x: P1VeloX, y: P1VeloY });
        const P2VeloX = c2_strenght * c + Player2.getVectorSpeed().x;
        const P2VeloY = c2_strenght * s + Player2.getVectorSpeed().y;
        Player2.setVectorSpeed({ x: P2VeloX, y: P2VeloY });
        const velo_x_tt2 = Player2.getVectorSpeed().x - Player1.getVectorSpeed().x;
        const velo_y_tt2 = Player2.getVectorSpeed().y - Player1.getVectorSpeed().y;
        const velo_tt_l2 = Math.pow((Math.pow(velo_x_tt2, 2) + Math.pow(velo_y_tt2, 2)), 0.5);
        const dist2 = velo_tt_l2 - velo_tt_l;
        if (dist2 > 1e-10) {
            console.log(velo_tt_l2);
        }
    }
};
export default collisionPyompy;
