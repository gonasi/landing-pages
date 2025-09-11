export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          query?: string
          variables?: Json
          operationName?: string
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ad_creatives: {
        Row: {
          ad_set_name: string
          ad_sets_id: string
          body_text: string | null
          call_to_action: string | null
          campaign_id: string
          created_at: string
          created_by: string | null
          file_size: number | null
          file_type: string | null
          file_url: string
          headline: string | null
          id: string
          meta_ad_id: string | null
          meta_creative_id: string | null
          published_at: string | null
          status: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          ad_set_name: string
          ad_sets_id: string
          body_text?: string | null
          call_to_action?: string | null
          campaign_id: string
          created_at?: string
          created_by?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          headline?: string | null
          id?: string
          meta_ad_id?: string | null
          meta_creative_id?: string | null
          published_at?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          ad_set_name?: string
          ad_sets_id?: string
          body_text?: string | null
          call_to_action?: string | null
          campaign_id?: string
          created_at?: string
          created_by?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          headline?: string | null
          id?: string
          meta_ad_id?: string | null
          meta_creative_id?: string | null
          published_at?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_creatives_ad_sets_id_fkey"
            columns: ["ad_sets_id"]
            isOneToOne: false
            referencedRelation: "ad_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_creatives_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_publish_queue: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          creative_id: string
          error_details: Json | null
          id: string
          last_error: string | null
          max_attempts: number | null
          priority: number | null
          scheduled_for: string | null
          started_at: string | null
          status: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          creative_id: string
          error_details?: Json | null
          id?: string
          last_error?: string | null
          max_attempts?: number | null
          priority?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          creative_id?: string
          error_details?: Json | null
          id?: string
          last_error?: string | null
          max_attempts?: number | null
          priority?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ad_publish_queue_creative_id"
            columns: ["creative_id"]
            isOneToOne: false
            referencedRelation: "ad_creatives"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_sets: {
        Row: {
          ad_set_id: string
          ad_set_name: string
          budget: Json | null
          campaign_id: string
          created_at: string
          created_by: string | null
          default_body_text: string | null
          default_call_to_action: string | null
          default_headline: string | null
          folder_path: string
          id: string
          schedule: Json | null
          status: string | null
          targeting: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          ad_set_id: string
          ad_set_name: string
          budget?: Json | null
          campaign_id: string
          created_at?: string
          created_by?: string | null
          default_body_text?: string | null
          default_call_to_action?: string | null
          default_headline?: string | null
          folder_path: string
          id?: string
          schedule?: Json | null
          status?: string | null
          targeting?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          ad_set_id?: string
          ad_set_name?: string
          budget?: Json | null
          campaign_id?: string
          created_at?: string
          created_by?: string | null
          default_body_text?: string | null
          default_call_to_action?: string | null
          default_headline?: string | null
          folder_path?: string
          id?: string
          schedule?: Json | null
          status?: string | null
          targeting?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_sets_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          campaign_id: string
          created_at: string
          created_by: string | null
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bulk_create_draft_creatives: {
        Args: {
          p_ad_set_id: string
          p_ad_set_name: string
          p_files: Json
          p_default_headline?: string
          p_default_body?: string
          p_default_cta?: string
          p_campaign_id: string
        }
        Returns: number
      }
      complete_queue_item: {
        Args: {
          ad_meta_id?: string
          creative_meta_id?: string
          queue_id: string
        }
        Returns: boolean
      }
      fail_queue_item: {
        Args: {
          error_details_json?: Json
          queue_id: string
          error_message: string
          retry_delay_minutes?: number
        }
        Returns: boolean
      }
      get_next_queue_items: {
        Args: { batch_size?: number }
        Returns: {
          attempts: number | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          creative_id: string
          error_details: Json | null
          id: string
          last_error: string | null
          max_attempts: number | null
          priority: number | null
          scheduled_for: string | null
          started_at: string | null
          status: string | null
          updated_at: string
          updated_by: string | null
        }[]
      }
      start_processing_queue_item: {
        Args: { queue_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

