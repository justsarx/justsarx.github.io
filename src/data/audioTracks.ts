export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  src: string;
  genre: string;
  bpm: number;
}

export const ZZZ_TRACKS: Track[] = [
  {
    id: 'zzz-01',
    title: 'Sixth Street Lounge',
    artist: 'Zenless Zone Zero OST',
    album: 'New Eridu Urban Beats',
    duration: '2:45',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    genre: 'Urban Electro-Chill',
    bpm: 86,
  },
  {
    id: 'zzz-02',
    title: 'Random Play Cassette',
    artist: 'Zenless Zone Zero OST',
    album: 'Video Store Vibes',
    duration: '2:24',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
    genre: 'Lo-Fi Tape Beats',
    bpm: 92,
  },
  {
    id: 'zzz-03',
    title: 'Hollow Zero Deep Dive',
    artist: 'Zenless Zone Zero OST',
    album: 'Hollow Resonance',
    duration: '3:10',
    src: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_03d9876f2d.mp3?filename=electronic-future-beats-117997.mp3',
    genre: 'Cyberpunk Synthwave',
    bpm: 110,
  },
  {
    id: 'zzz-04',
    title: 'Ballet Twins Skyline',
    artist: 'Zenless Zone Zero OST',
    album: 'Neon District Odyssey',
    duration: '2:50',
    src: 'https://cdn.pixabay.com/download/audio/2023/04/10/audio_51cb0cb6aa.mp3?filename=urban-lounge-chillout-146376.mp3',
    genre: 'Electro-Funk Fusion',
    bpm: 104,
  },
];
