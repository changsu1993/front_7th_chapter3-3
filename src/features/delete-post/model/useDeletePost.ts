import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi } from "@/entities/post"
import { queryKeys } from "@/shared/api"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => postApi.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
