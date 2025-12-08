import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { commentApi } from "@/entities/comment"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"

export const EditCommentDialog = () => {
  const { showEditCommentDialog, closeEditCommentDialog, selectedComment } = useUIStore()
  const queryClient = useQueryClient()

  const handleUpdateComment = async () => {
    if (!selectedComment) return

    try {
      await commentApi.update(selectedComment.id, { body: selectedComment.body })
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(selectedComment.postId) })
      closeEditCommentDialog()
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  const updateSelectedComment = (body: string) => {
    if (!selectedComment) return
    useUIStore.setState({
      selectedComment: { ...selectedComment, body },
    })
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={closeEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => updateSelectedComment(e.target.value)}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
