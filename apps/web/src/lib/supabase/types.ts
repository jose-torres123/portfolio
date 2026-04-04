/**
 * Esta es una versión placeholder de los tipos de Supabase.
 * 
 * Para regenerar con tipos reales:
 * 1. Instala Supabase CLI: https://supabase.com/docs/guides/cli/getting-started
 * 2. Ejecuta: supabase gen types typescript --local > src/lib/supabase/types.ts
 * 
 * Alternativamente:
 * - Usa Scoop en Windows: scoop install supabase
 * - O Docker: docker run --rm supabase/cli gen types typescript --local
 */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          content: string | null
          image_url: string
          technologies: string[]
          github_url: string | null
          live_url: string | null
          featured: boolean
          archived: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          content?: string | null
          image_url: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          featured?: boolean
          archived?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          content?: string | null
          image_url?: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          featured?: boolean
          archived?: boolean
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          published: boolean
          published_at: string | null
          featured_image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          published?: boolean
          published_at?: string | null
          featured_image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          published?: boolean
          published_at?: string | null
          featured_image_url?: string | null
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          color: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          color?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          color?: string
        }
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
