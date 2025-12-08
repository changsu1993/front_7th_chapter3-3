import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi } from "@/entities/comment"
import { queryKeys } from "@/shared/api"

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, postId }: { commentId: number; postId: number }) =>
      commentApi.delete(commentId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(postId) })
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })
}
