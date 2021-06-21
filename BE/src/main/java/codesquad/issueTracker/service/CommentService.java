package codesquad.issueTracker.service;

import codesquad.issueTracker.domain.Comment;
import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.User;
import codesquad.issueTracker.dto.IssueRequest;
import codesquad.issueTracker.repository.CommentRepository;
import org.springframework.stereotype.Service;

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
}
