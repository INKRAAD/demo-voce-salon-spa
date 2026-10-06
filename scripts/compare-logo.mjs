import sharp from 'sharp'
await sharp('../brand/voce-logo-perfil.svg', { density: 72 }).resize(400, 400).png().toFile('/tmp/recon.png')
