import { useState } from "react"
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
import { postApi, type CreatePostRequest } from "@/entities/post"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"

export const AddPostDialog = () => {
  const { showAddPostDialog, closeAddPostDialog } = useUIStore()
  const [newPost, setNewPost] = useState<CreatePostRequest>({
    title: "",
    body: "",
    userId: 1,
  })
  const queryClient = useQueryClient()

  const handleAddPost = async () => {
    try {
      await postApi.create(newPost)
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      closeAddPostDialog()
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddPostDialog} onOpenChange={closeAddPostDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
