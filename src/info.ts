// lors de collision
// il soustré les vecteur Dist
// calculer la mag de la soustraction de vecteur nDist
// il regarde si la distance  nDist <= 2 fois rayon

// Si collision
// On normalise le vecteur Dist
// on sub le vecteur (Dist * 0.1) on change la position du vecteur
// nouveau vecteur

// this représente la ball et _b représente le player
// soustraction de vecteur
//let dist = p5.Vector.sub(_b.pos, this.pos);
//let nDist = dist.mag();
// ça on connais
//if (nDist <= _b.rad + this.rad) {
// Normalisation dun vecteur pour multiplier par 0.1
//dist = dist.normalize();
// Ici on réduit pour éviter les collisions visuelle.
//this.pos.sub(dist.mult(0.1));
// On sousoustrait le vecteur avec l'autre
//let _dist = p5.Vector.sub(this.pos, _b.pos);
// normaliser pour ne pas etre satélisé
//_dist = _dist.normalize();
// on créer un nouveau vecteur -y,x vecteur perpendiculaire
//let nV = createVector(-_dist.y, _dist.x);
// on renormalise le vecteur ???
//nV.normalize();
// on cherche la nouvelle vélocité
//let vStore = _b.vel.mag();
// on met a jour toutes les vélocité on le freine ici
//this.vel.mult(0.9);
//_b.vel.mult(0.75);
// acc accélération du player
//
//this.acc.add(_dist.mult(0.5 * vStore));
// _b.acc.add(-nV.mult(0.5 * vStore));
