import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentApi } from "@/entities/comment"
import { queryKeys } from "@/shared/api"

interface LikeCommentParams {
  commentId: number
  postId: number
  currentLikes: number
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, currentLikes }: LikeCommentParams) =>
      commentApi.like(commentId, currentLikes + 1),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(postId) })
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })
}
