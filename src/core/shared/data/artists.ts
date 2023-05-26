export type ArtistProps = {
  artistId: string;
  name: string;
  picture: string;
};

export const artistProps: ArtistProps[] = [
  {
    artistId: 'joao_gomes',
    name: 'João Gomes',
    picture: '/assets/artists/joao-gomes.jpg'
  },
  {
    artistId: 'cleane_sampaio',
    name: 'Cleane Sampaio',
    picture: '/assets/artists/cleane-sampaio.jpg'
  },
  {
    artistId: 'mari_fernandez',
    name: 'Mari Fernandez',
    picture: '/assets/artists/mari-fernandez.jpg'
  },
  {
    artistId: 'biu_do_piseiro',
    name: 'Biu do Piseiro',
    picture: '/assets/artists/biu-do-piseiro.jpg'
  },
  {
    artistId: 'iguinho_e_lulinha',
    name: 'Iguinho & Lulinha',
    picture: '/assets/artists/iguinho-e-lulinha.jpg'
  }
];
