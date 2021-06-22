package codesquad.issueTracker.service;

import codesquad.issueTracker.domain.Comment;
import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.dto.issue.request.IssueRequest;
import codesquad.issueTracker.dto.request.CommentRequest;
import codesquad.issueTracker.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment makeComment(IssueRequest issueRequest, User writer, Issue issue) {
        Comment comment = issueRequest.toComment(writer);
        comment.addIssue(issue);
        return commentRepository.save(comment);
    }

    public Comment makeComment(CommentRequest commentRequest, User writer, Issue issue) {
        Comment comment = new Comment(commentRequest.getDescription(), writer);
        comment.addIssue(issue);
        return commentRepository.save(comment);
    }

    @Transactional
    public void updateComment(Long id, CommentRequest commentRequest) {
        Comment comment = commentRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("코멘트 존재하지 않음"));
        comment.updateDescription(commentRequest.getDescription());
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("코멘트 존재하지 않음"));
        commentRepository.delete(comment);
    }
}
