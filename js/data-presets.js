// js/data-presets.js

const allPresets = [
  {
    id: 1,
    title: "Preset de Voz 'Mc Pedrinho'",
    highlightedSubtitle: "Transforme suas tracks com um vocal profissional.",
    price: 79.90,
    image: "imgs/capa5bandidas2.jpg", // Capa principal do preset
    audio: "audios/preset5bandidas.mp3",
    description: "Eleve a qualidade da sua voz com o preset do 'Mc Pedrinho'. Projetado para dar brilho, presença e o punch necessário para suas tracks de Trap e Funk. Compatível com plugins nativos do FL Studio.",
    packageItems: {
      totalValue: 800.00,
      items: [
        { name: "tools_moments", price: 150.00 },
        { name: "tools_oneshots", price: 150.00 },
        { name: "tools_drumloops", price: 50.00 },
        { name: "tools_drums", price: 150.00 },
        { name: "tools_samples", price: 50.00 },
        { name: "tools_starters", price: 50.00 },
        { name: "analog lab bank", price: 150.00 },
        { name: "effect rack bank", price: 50.00 }
      ]
    },
    backgroundVideo: "videos/clipe5bandidas - Trim.mp4", // VÍDEO DE BACKGROUND ESPECÍFICO PARA ESTE PRESET
    tutorialCover: "imgs/tutorial_cover_pedrinho.jpg", // IMAGEM DE CAPA DO VÍDEO TUTORIAL
    tutorialVideo: "videos/tutorial_pedrinho.mp4" // VÍDEO TUTORIAL LOCAL
  },
  {
    id: 2,
    title: "Preset de Voz 'Mc Magal'",
    highlightedSubtitle: "O timbre perfeito para suas produções de funk.",
    price: 79.90,
    image: "imgs/capamcmagal.jpg",
    audio: "audios/presetmcmagal.mp3",
    description: "Encontre o som autêntico do funk com o preset do 'Mc Magal'. Ideal para dar peso e clareza aos seus vocais, mantendo a fidelidade ao estilo. Compatível com plugins nativos do FL Studio.",
    packageItems: {
      totalValue: 800.00,
      items: [
        { name: "tools_moments", price: 150.00 },
        { name: "tools_oneshots", price: 150.00 },
        { name: "tools_drumloops", price: 50.00 },
        { name: "tools_drums", price: 150.00 },
        { name: "tools_samples", price: 50.00 },
        { name: "tools_starters", price: 50.00 },
        { name: "analog lab bank", price: 150.00 },
        { name: "effect rack bank", price: 50.00 }
      ]
    },
    backgroundVideo: "videos/presetmcmagal.mp4", // VÍDEO DE BACKGROUND ESPECÍFICO PARA ESTE PRESET
    tutorialCover: "imgs/tutorial_cover_magal.jpg", // IMAGEM DE CAPA DO VÍDEO TUTORIAL
    tutorialVideo: "videos/tutorial_magal.mp4" // VÍDEO TUTORIAL LOCAL
  },
  // Adicione outros presets aqui e seus respectivos vídeos/imagens
];