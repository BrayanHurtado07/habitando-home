// Compone escenas combinadas: sofá + cojines, con materiales separados
// (sofa_fabric + cushionN_*) para tintar/texturizar por separado en runtime.
// Genera los 3 arreglos predefinidos. Uso: node tools/compose.mjs
import { NodeIO, getBounds } from '@gltf-transform/core';
import { mergeDocuments } from '@gltf-transform/functions';

const SOFA = 'assets/3d/sillon2.orig.glb';
const CUSHION = 'assets/3d/cojin3.orig.glb';

// Sofá: X[-0.50..0.50] ancho, Y[-0.19..0.20] alto, Z[-0.22..0.22] (frente +Z, espaldar -Z)
// size = ancho objetivo (m); pos = centro [x,y,z]; tiltX = inclina hacia atrás; yaw = giro vertical
const ARRANGEMENTS = {
  // tiltX NEGATIVO = recuesta el cojín hacia atrás (contra el respaldo)
  'escena_1cojin': [
    { size: 0.28, pos: [-0.17, 0.105, 0.03], tiltX: -18, yaw: 0 },
  ],
  'escena_2cojines': [
    { size: 0.27, pos: [-0.23, 0.105, -0.02], tiltX: -18, yaw: -10 },
    { size: 0.25, pos: [0.20, 0.10, -0.03], tiltX: -18, yaw: 12 },
  ],
  'escena_3cojines': [
    { size: 0.29, pos: [-0.26, 0.105, -0.03], tiltX: -19, yaw: -12 },
    { size: 0.26, pos: [0.22, 0.10, -0.03], tiltX: -18, yaw: 12 },
    { size: 0.21, pos: [-0.02, 0.075, 0.04], tiltX: -12, yaw: -3 },
  ],
};

const io = new NodeIO();

function quatFromEuler(xDeg, yDeg) {
  const rx = (xDeg * Math.PI) / 180, ry = (yDeg * Math.PI) / 180;
  const cx = Math.cos(rx / 2), sx = Math.sin(rx / 2);
  const cy = Math.cos(ry / 2), sy = Math.sin(ry / 2);
  return [sx * cy, cx * sy, -sx * sy, cx * cy]; // qy * qx
}

async function build(placements, out) {
  const sofa = await io.read(SOFA);
  const sofaScene = sofa.getRoot().getDefaultScene() || sofa.getRoot().listScenes()[0];
  sofa.getRoot().listMaterials().forEach((m, i) => m.setName(i === 0 ? 'sofa_fabric' : 'sofa_' + i));

  for (let idx = 0; idx < placements.length; idx++) {
    const p = placements[idx];
    const cushDoc = await io.read(CUSHION);
    const cScene = cushDoc.getRoot().getDefaultScene() || cushDoc.getRoot().listScenes()[0];
    const cb = getBounds(cScene);
    const scale = p.size / (cb.max[0] - cb.min[0]);
    cushDoc.getRoot().listMaterials().forEach((m, i) => m.setName('cushion' + idx + '_' + i));

    const beforeScenes = new Set(sofa.getRoot().listScenes());
    mergeDocuments(sofa, cushDoc);
    const newScene = sofa.getRoot().listScenes().find((s) => !beforeScenes.has(s));

    const wrapper = sofa.createNode('cushion' + idx)
      .setTranslation(p.pos)
      .setScale([scale, scale, scale])
      .setRotation(quatFromEuler(p.tiltX || 0, p.yaw || 0));
    newScene.listChildren().forEach((child) => { newScene.removeChild(child); wrapper.addChild(child); });
    sofaScene.addChild(wrapper);
    newScene.dispose();
  }

  sofa.getRoot().listScenes().forEach((s) => { if (s !== sofaScene) s.dispose(); });
  sofa.getRoot().setDefaultScene(sofaScene);
  const mainBuffer = sofa.getRoot().listBuffers()[0];
  sofa.getRoot().listAccessors().forEach((a) => a.setBuffer(mainBuffer));
  sofa.getRoot().listBuffers().forEach((b) => { if (b !== mainBuffer) b.dispose(); });

  await io.write(out, sofa);
  console.log('escrito →', out, '| materiales:', sofa.getRoot().listMaterials().map((m) => m.getName()).join(', '));
}

for (const [name, placements] of Object.entries(ARRANGEMENTS)) {
  await build(placements, `assets/3d/${name}.glb`);
}
