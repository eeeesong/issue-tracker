package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.dto.response.CommentResponse;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AllIssueDetailResponse extends IssueResponse {
    private final List<CommentResponse> comment;

    public AllIssueDetailResponse(Issue issue) {
        super(issue);
        comment = issue.getComments().stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
    }
}
