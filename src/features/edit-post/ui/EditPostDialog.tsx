import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { postApi } from "@/entities/post"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"

export const EditPostDialog = () => {
  const { showEditPostDialog, closeEditPostDialog, selectedPost } = useUIStore()
  const queryClient = useQueryClient()

  const handleUpdatePost = async () => {
    if (!selectedPost) return

    try {
      await postApi.update(selectedPost.id, {
        title: selectedPost.title,
        body: selectedPost.body,
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      closeEditPostDialog()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  const updateSelectedPost = (updates: Partial<typeof selectedPost>) => {
    if (!selectedPost) return
    useUIStore.setState({
      selectedPost: { ...selectedPost, ...updates },
    })
  }

  return (
    <Dialog open={showEditPostDialog} onOpenChange={closeEditPostDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => updateSelectedPost({ title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => updateSelectedPost({ body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
