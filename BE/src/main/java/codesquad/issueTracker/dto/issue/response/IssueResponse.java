package codesquad.issueTracker.dto.issue.response;

import codesquad.issueTracker.domain.Issue;
import codesquad.issueTracker.domain.Milestone;
import lombok.Getter;

@Getter
public class IssueResponse extends DefaultIssueResponse {
    private final IssueMilestoneResponse milestone;

    public IssueResponse(Issue issue) {
        super(issue);
        milestone = toMileStoneResponse(issue.getMilestone());
    }

    private IssueMilestoneResponse toMileStoneResponse(Milestone milestone) {
        if (milestone == null) {
            return null;
        }
        return new IssueMilestoneResponse(milestone);
    }
}
