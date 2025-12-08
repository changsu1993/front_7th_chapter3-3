import { apiClient } from "@/shared/api"
import type { Post, PostsResponse, CreatePostRequest, UpdatePostRequest } from "../model/types"

export const postApi = {
  getPosts: (params: { limit: number; skip: number }) =>
    apiClient.get<PostsResponse>("/posts", { params }),

  getPostsByTag: (tag: string) => apiClient.get<PostsResponse>(`/posts/tag/${tag}`),

  searchPosts: (query: string) =>
    apiClient.get<PostsResponse>("/posts/search", { params: { q: query } }),

  createPost: (data: CreatePostRequest) => apiClient.post<Post>("/posts/add", data),

  updatePost: (id: number, data: UpdatePostRequest) => apiClient.put<Post>(`/posts/${id}`, data),

  deletePost: (id: number) => apiClient.delete<Post>(`/posts/${id}`),
}
