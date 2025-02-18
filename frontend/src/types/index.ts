export interface User {
    id: number;
    username: string;
    email: string;
    is_premium: boolean;
    career?: string;
}

export interface Career {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Tool {
    id: number;
    title: string;
    description: string;
    career: number;
    file: File | null;
    file_url: string;
    is_premium: boolean;
    created_at: string;
    updated_at: string;
}

export interface Tutorial {
    id: number;
    title: string;
    content: string;
    career: number;
    tool?: number;
    video_url?: string;
    is_premium: boolean;
    created_at: string;
    updated_at: string;
}

export interface Subscription {
    id: number;
    user: number;
    is_active: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}
