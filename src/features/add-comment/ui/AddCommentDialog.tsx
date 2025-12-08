import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { commentApi, type CreateCommentRequest } from "@/entities/comment"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"

interface AddCommentDialogProps {
  postId: number | null
}

export const AddCommentDialog = ({ postId }: AddCommentDialogProps) => {
  const { showAddCommentDialog, closeAddCommentDialog } = useUIStore()
  const [newComment, setNewComment] = useState<Omit<CreateCommentRequest, "postId">>({
    body: "",
    userId: 1,
  })
  const queryClient = useQueryClient()

  const handleAddComment = async () => {
    if (!postId) return

    try {
      await commentApi.create({ ...newComment, postId })
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(postId) })
      closeAddCommentDialog()
      setNewComment({ body: "", userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={closeAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
