/**
 * 作品データ管理ファイル
 * 
 * 新しい作品を追加する場合：
 * 1. 下の配列に新しいオブジェクトを追加
 * 2. 必要な情報を入力
 * 3. サムネイル画像はUnsplashのURLを使用
 * 4. 動画URLは実際の動画ファイルまたはYouTube/Vimeo等のURL
 */

export interface Work {
  id: string                    // 一意のID（例：'1', '2', '3'...）
  title: string                 // 作品タイトル
  category: 'MV' | 'Commercial' | 'Short Film' | 'Documentary'  // カテゴリー
  year: number                  // 制作年
  client?: string               // クライアント名（商業作品の場合）
  artist?: string               // アーティスト名（MVの場合）
  duration: string              // 動画の長さ（例：'3:45'）
  thumbnail: string             // サムネイル画像URL
  videoUrl: string              // 動画ファイルURL
  description: string           // 作品の説明文
  credits: {                    // クレジット情報
    director: string
    editor: string
    cinematographer?: string
    producer?: string
  }
}

export const works: Work[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    category: 'MV',
    year: 2024,
    artist: 'Luna Sky',
    duration: '3:45',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video1',
    description: 'A mesmerizing music video that explores the boundary between dreams and reality through innovative visual storytelling and seamless transitions.',
    credits: {
      director: 'nagi',
      editor: 'nagi',
      cinematographer: 'Yuki Tanaka',
      producer: 'Studio Vision'
    }
  },
  {
    id: '2',
    title: 'Urban Pulse',
    category: 'Commercial',
    year: 2024,
    client: 'Nike',
    duration: '1:30',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video2',
    description: 'A dynamic commercial capturing the energy of urban life and the spirit of athletic excellence.',
    credits: {
      director: 'nagi',
      editor: 'nagi',
      producer: 'Creative Labs'
    }
  },
  {
    id: '3',
    title: 'Silent Echoes',
    category: 'Short Film',
    year: 2023,
    duration: '12:20',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video3',
    description: 'An introspective short film about memory and loss, told through minimal dialogue and powerful visual metaphors.',
    credits: {
      director: 'nagi',
      editor: 'nagi',
      cinematographer: 'Akira Sato'
    }
  },
  {
    id: '4',
    title: 'Neon Nights',
    category: 'MV',
    year: 2023,
    artist: 'Electric Dreams',
    duration: '4:12',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video4',
    description: 'A vibrant music video set in Tokyo\'s neon-lit streets, blending cyberpunk aesthetics with emotional storytelling.',
    credits: {
      director: 'nagi',
      editor: 'nagi',
      cinematographer: 'Rei Matsumoto'
    }
  },
  {
    id: '5',
    title: 'Heritage',
    category: 'Documentary',
    year: 2023,
    duration: '25:30',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video5',
    description: 'A documentary exploring traditional Japanese craftsmanship in the modern world.',
    credits: {
      director: 'nagi',
      editor: 'nagi',
      producer: 'Documentary Films Japan'
    }
  },
  {
    id: '6',
    title: 'Digital Horizon',
    category: 'Commercial',
    year: 2022,
    client: 'Tech Solutions',
    duration: '2:00',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    videoUrl: 'https://example.com/video6',
    description: 'A sleek commercial showcasing cutting-edge technology through clean, minimalist visuals.',
    credits: {
      director: 'nagi',
      editor: 'nagi'
    }
  }

  /*
  // 新しい作品を追加する場合は、以下のテンプレートをコピーして使用してください：
  
  {
    id: '7',                     // 次の番号に変更
    title: '作品タイトル',        // 作品名
    category: 'MV',              // 'MV', 'Commercial', 'Short Film', 'Documentary'から選択
    year: 2024,                  // 制作年
    artist: 'アーティスト名',     // MVの場合のみ
    client: 'クライアント名',     // Commercialの場合のみ
    duration: '3:30',            // 動画の長さ
    thumbnail: 'https://images.unsplash.com/photo-xxxxxxxxx',  // Unsplash画像URL
    videoUrl: 'https://youtube.com/watch?v=xxxxxxx',           // 動画URL
    description: '作品の説明文をここに記載します。',
    credits: {
      director: 'nagi',
      editor: 'nagi',
      cinematographer: '撮影監督名（オプション）',
      producer: '制作会社名（オプション）'
    }
  }
  */
]

/**
 * 作品を年度順（新しい順）でソートして返す関数
 */
export const getWorksSortedByYear = () => {
  return [...works].sort((a, b) => b.year - a.year)
}

/**
 * カテゴリー別に作品を取得する関数
 */
export const getWorksByCategory = (category: Work['category']) => {
  return works.filter(work => work.category === category)
}