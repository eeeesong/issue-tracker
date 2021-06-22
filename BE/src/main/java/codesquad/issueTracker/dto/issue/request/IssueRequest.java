package codesquad.issueTracker.dto.issue.request;

import codesquad.issueTracker.domain.Comment;
import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.User;
import lombok.Getter;

import java.util.List;

@Getter
public class IssueRequest {
    private String title;
    private String description;
    private String comment;
    private List<Long> labelIds;
    private Long milestoneId;
    private List<Long> assigneeIds;

    public Issue toIssue(User writer) {
        return new Issue(title, writer, true);
    }

    public Comment toComment(User writer) {
        return new Comment(comment, writer);
    }
}
