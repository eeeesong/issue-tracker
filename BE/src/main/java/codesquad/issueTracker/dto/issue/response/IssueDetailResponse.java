package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.Milestone;
import codesquad.issueTracker.dto.response.CommentResponse;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class IssueDetailResponse extends DefaultIssueResponse {

    private final IssueDetailMilestoneResponse milestone;
    private final List<CommentResponse> comment;

    public IssueDetailResponse(Issue issue, Long totalIssueCount, Long openIssueCount) {
        super(issue);
        milestone = toMileStoneResponse(issue.getMilestone(), totalIssueCount, openIssueCount);
        comment = issue.getComments().stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
    }

    private IssueDetailMilestoneResponse toMileStoneResponse(Milestone milestone, Long totalIssueCount, Long openIssueCount) {
        if (milestone == null) {
            return null;
        }
        return new IssueDetailMilestoneResponse(milestone, totalIssueCount, openIssueCount);
    }

}
