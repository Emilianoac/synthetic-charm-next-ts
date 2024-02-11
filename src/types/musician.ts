export interface Musician {
  age: string,
  color: string
  musical_genre: string
  instrument: string
  slug: string
  profileImage: ProfileImage
  name: string
  bio: string
  country: string
  date: number
  fun_fact: string
  albums: Album[]
  id: string
}

export interface ProfileImage {
  name: string
  url: string
}

export interface Album {
  songs: Song[]
  title: string
  year: string
  cover: Cover
}

export interface Song {
  title: string
  description: string
  audio: Audio
}

export interface Audio {
  url: string
  name: string
}

export interface Cover {
  name: string
  url: string
}