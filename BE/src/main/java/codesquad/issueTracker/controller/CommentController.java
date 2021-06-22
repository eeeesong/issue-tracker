package codesquad.issueTracker.controller;

import codesquad.issueTracker.ApiResult;
import codesquad.issueTracker.dto.request.CommentRequest;
import codesquad.issueTracker.service.CommentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PutMapping("/{commentId}")
    public ApiResult<String> updateComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        commentService.updateComment(commentId, commentRequest);
        return ApiResult.ok();
    }

    @DeleteMapping("/{commentId}")
    public ApiResult<String> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ApiResult.ok();
    }
}
